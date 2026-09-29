import re
import json

# List of 38 members in Team.tsx in order
with open('src/pages/Team.tsx') as f:
    text = f.read()

matches = list(re.finditer(r'<TeamCardFlip\b([^>]*)>([\s\S]*?)</TeamCardFlip>', text))
team_members = []
for i, m in enumerate(matches):
    attrs = m.group(1)
    body = m.group(2)
    svg_m = re.search(r'backSvg="([^"]*)"', attrs)
    svg = svg_m.group(1) if svg_m else 'None'
    node_m = re.search(r'dataNodeId="([^"]*)"', attrs)
    node_id = node_m.group(1) if node_m else ''
    
    # check for name
    alt_m = re.search(r'alt="([^"-]+)', body)
    if alt_m:
        name = alt_m.group(1).strip()
    else:
        name_ps = re.findall(r'<p[^>]*>([^<]+)</p>', body)
        name_ps = [p.strip() for p in name_ps if p.strip()]
        # role is typically the last <p> if there are multiple
        # name is the preceding ones
        if len(name_ps) >= 2:
            name = ' '.join(name_ps[:-1])
        elif len(name_ps) == 1:
            name = name_ps[0]
        else:
            name = "Unknown"
            
    team_members.append({
        'index': i,
        'name': name,
        'svg': svg,
        'node_id': node_id
    })

print(f"Total team members in Team.tsx: {len(team_members)}")
for tm in team_members:
    print(f"{tm['index']+1:2d}. {tm['name']:30} | {tm['svg']:25} | {tm['node_id']}")
