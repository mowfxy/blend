"""Validate Kern: skill metadata, plugin manifests, local links, and that no other suite's names remain."""
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
errors = []

skills = sorted((ROOT / 'skills').glob('*/SKILL.md'))
names = set()
for path in skills:
    text = path.read_text(encoding='utf-8')
    match = re.match(r'^---\r?\nname: ([a-z0-9-]+)\r?\ndescription: (.+?)\r?\n---\r?\n', text)
    if not match:
        errors.append(f'{path.relative_to(ROOT)}: invalid frontmatter')
        continue
    name, description = match.groups()
    if name != path.parent.name or name in names or len(name) > 64:
        errors.append(f'{path.relative_to(ROOT)}: inconsistent skill name')
    if not (name == 'kern' or name.startswith('kern-')):
        errors.append(f'{name}: skill names must be kern or kern-*')
    names.add(name)
    if len(description) > 1024:
        errors.append(f'{name}: description longer than 1024 characters')
    if not (path.parent / 'agents' / 'openai.yaml').is_file():
        errors.append(f'{name}: missing agents/openai.yaml')
if not skills:
    errors.append('No skills found')

for manifest in ('plugin.json', 'marketplace.json'):
    try:
        data = json.loads((ROOT / '.claude-plugin' / manifest).read_text(encoding='utf-8'))
        if manifest == 'plugin.json' and data.get('name') != 'kern':
            errors.append('plugin.json: name must be kern')
    except (OSError, ValueError) as error:
        errors.append(f'.claude-plugin/{manifest}: {error}')

docs = list((ROOT / 'skills').rglob('*.md')) + list((ROOT / 'docs').rglob('*.md')) + list((ROOT / 'evals').rglob('*.md')) + list((ROOT / 'examples').rglob('*.md')) + list(ROOT.glob('*.md'))
for path in docs:
    text = path.read_text(encoding='utf-8')
    for target in re.findall(r'\]\(([^)\s]+)\)', text):
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', target) or target.startswith('#'):
            continue
        local = unquote(target.split('#')[0].split('?')[0])
        if local and not (path.parent / local).exists():
            errors.append(f'{path.relative_to(ROOT)}: missing link {target}')

# The shipped skills must not carry another suite's names or working folders.
# docs/ (the audit) and the installer's legacy list are allowed to name what Kern replaced.
residue = re.compile(r'\bblend(-[a-z-]+)?\b|taste[- ]skill|\.taste-skill|anti-slop', re.IGNORECASE)
for path in (ROOT / 'skills').rglob('*'):
    if path.is_file() and path.suffix in {'.md', '.mjs', '.yaml', '.json', '.py'}:
        for number, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
            if residue.search(line):
                errors.append(f'{path.relative_to(ROOT)}:{number}: legacy name in shipped skill')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'Validated {len(skills)} skills, plugin manifests, and local links in {len(docs)} Markdown files.')
