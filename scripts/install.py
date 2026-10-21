"""Install the Kern skills for Claude Code and/or Codex, backing up anything replaced.

    python scripts/install.py                  # Claude Code (~/.claude/skills)
    python scripts/install.py --target codex   # Codex ($CODEX_HOME/skills or ~/.codex/skills)
    python scripts/install.py --target both
    python scripts/install.py --replace        # update an existing Kern install
    python scripts/install.py --remove-legacy  # also back up and remove older design suites (see LEGACY)

For Claude Code you can instead add the repository as a plugin marketplace:
    /plugin marketplace add mowfxy/kern
    /plugin install kern@m4labs
"""
import argparse
import os
import shutil
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
# Folder names of the design suite Kern replaces. Removed only with --remove-legacy, always backed up first.
LEGACY = ('blend', 'blend-art-direction', 'blend-gallery', 'blend-interface', 'blend-landing', 'blend-mascots',
          'blend-micro-motion', 'blend-review', 'blend-scroll', 'blend-typography', 'blend-visual-assets', 'anti-slop')


def destinations(target):
    claude = Path(os.environ.get('CLAUDE_CONFIG_DIR', Path.home() / '.claude')) / 'skills'
    codex = Path(os.environ.get('CODEX_HOME', Path.home() / '.codex')) / 'skills'
    return {'claude': [claude], 'codex': [codex], 'both': [claude, codex]}[target]


def install(destination, replace=False, remove_legacy=False, backup_dir=None):
    destination = Path(destination).expanduser().resolve()
    sources = sorted(p for p in (ROOT / 'skills').iterdir() if p.is_dir())
    if not sources or any(not (p / 'SKILL.md').is_file() for p in sources):
        raise ValueError('Expected complete skill folders under skills/.')
    if destination == ROOT or ROOT in destination.parents or destination in ROOT.parents:
        raise ValueError('Destination overlaps the source repository.')
    destination.mkdir(parents=True, exist_ok=True)

    targets = [destination / p.name for p in sources]
    for target in targets:
        if target.is_symlink() or target.parent.resolve() != destination:
            raise ValueError(f'Unsafe install target: {target}')
        if target.exists() and not target.is_dir():
            raise ValueError(f'Install target is not a directory: {target}')
    existing = [t for t in targets if t.exists()]
    if existing and not replace:
        raise ValueError('Already installed: ' + ', '.join(t.name for t in existing) + '. Use --replace to update.')
    legacy = [destination / n for n in LEGACY if (destination / n).is_dir() and not (destination / n).is_symlink()] if remove_legacy else []

    backup = None
    if existing or legacy:
        base = Path(backup_dir or ROOT / '.maintainer' / 'install-backups').expanduser().resolve()
        base.mkdir(parents=True, exist_ok=True)
        backup = Path(tempfile.mkdtemp(prefix=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ-'), dir=base))

    staged = Path(tempfile.mkdtemp(prefix='.kern-stage-', dir=destination))
    moved, placed = [], []
    try:
        for source in sources:
            shutil.copytree(source, staged / source.name, ignore=shutil.ignore_patterns('__pycache__'))
            shutil.copy2(ROOT / 'LICENSE', staged / source.name / 'LICENSE')
        for old in existing + legacy:
            shutil.move(str(old), str(backup / old.name))
            moved.append(old)
        for target in targets:
            shutil.move(str(staged / target.name), str(target))
            placed.append(target)
    except Exception:
        for target in reversed(placed):
            if target.parent.resolve() == destination:
                shutil.rmtree(target)
        for old in reversed(moved):
            shutil.move(str(backup / old.name), str(old))
        raise
    finally:
        shutil.rmtree(staged, ignore_errors=True)
    return len(targets), [p.name for p in legacy], backup


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--target', choices=('claude', 'codex', 'both'), default='claude')
    parser.add_argument('--dest', type=Path, help='Install into this skills folder instead of --target')
    parser.add_argument('--replace', action='store_true', help='Replace an existing Kern install (backed up)')
    parser.add_argument('--remove-legacy', action='store_true', help='Back up and remove the older design suite Kern replaces')
    parser.add_argument('--backup-dir', type=Path)
    args = parser.parse_args()
    for dest in ([args.dest] if args.dest else destinations(args.target)):
        try:
            count, removed, backup = install(dest, args.replace, args.remove_legacy, args.backup_dir)
        except (ValueError, OSError) as error:
            parser.exit(1, f'{dest}: {error}\n')
        print(f'Installed {count} Kern skills in {Path(dest).expanduser().resolve()}')
        if removed:
            print(f'Removed legacy folders: {", ".join(removed)}')
        if backup:
            print(f'Previous folders kept in {backup}')
    print('Start a new session to load Kern.')


if __name__ == '__main__':
    main()
