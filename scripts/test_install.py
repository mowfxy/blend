"""Tests for the Kern installer: fresh install, refusal, replace with backup, legacy removal, rollback."""
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import install


class InstallTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.dest = Path(self.tmp.name) / 'skills'
        self.backups = Path(self.tmp.name) / 'backups'
        self.expected = sorted(p.name for p in (install.ROOT / 'skills').iterdir() if p.is_dir())

    def tearDown(self):
        self.tmp.cleanup()

    def test_fresh_install_copies_every_skill_with_license(self):
        count, removed, backup = install.install(self.dest)
        self.assertEqual(count, len(self.expected))
        self.assertEqual(removed, [])
        self.assertIsNone(backup)
        for name in self.expected:
            self.assertTrue((self.dest / name / 'SKILL.md').is_file())
            self.assertTrue((self.dest / name / 'LICENSE').is_file())

    def test_refuses_existing_install_without_replace(self):
        install.install(self.dest)
        with self.assertRaises(ValueError):
            install.install(self.dest)

    def test_replace_backs_up_previous_folders(self):
        install.install(self.dest)
        (self.dest / 'kern' / 'marker.txt').write_text('old', encoding='utf-8')
        _, _, backup = install.install(self.dest, replace=True, backup_dir=self.backups)
        self.assertTrue((backup / 'kern' / 'marker.txt').is_file())
        self.assertFalse((self.dest / 'kern' / 'marker.txt').exists())

    def test_remove_legacy_backs_up_and_removes_old_suite_only(self):
        self.dest.mkdir(parents=True)
        for name in ('blend', 'anti-slop', 'unrelated-skill'):
            (self.dest / name).mkdir()
            (self.dest / name / 'SKILL.md').write_text(name, encoding='utf-8')
        _, removed, backup = install.install(self.dest, remove_legacy=True, backup_dir=self.backups)
        self.assertEqual(sorted(removed), ['anti-slop', 'blend'])
        self.assertFalse((self.dest / 'blend').exists())
        self.assertTrue((backup / 'blend' / 'SKILL.md').is_file())
        self.assertTrue((self.dest / 'unrelated-skill' / 'SKILL.md').is_file())

    def test_rollback_restores_previous_install_on_failure(self):
        install.install(self.dest)
        (self.dest / 'kern' / 'marker.txt').write_text('keep', encoding='utf-8')
        real_move = install.shutil.move
        calls = {'n': 0}

        def failing_move(src, dst):
            calls['n'] += 1
            if 'kern-stage' in str(src) and calls['n'] > len(self.expected) + 2:
                raise OSError('simulated failure')
            return real_move(src, dst)

        with mock.patch.object(install.shutil, 'move', side_effect=failing_move):
            with self.assertRaises(OSError):
                install.install(self.dest, replace=True, backup_dir=self.backups)
        self.assertEqual((self.dest / 'kern' / 'marker.txt').read_text(encoding='utf-8'), 'keep')
        for name in self.expected:
            self.assertTrue((self.dest / name / 'SKILL.md').is_file())


if __name__ == '__main__':
    unittest.main()
