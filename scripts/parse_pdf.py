import re
import json
import pypdf

reader = pypdf.PdfReader('/Users/bhaskarshah05/Downloads/2ND/Website Links - Google Docs.pdf')
full_text = ''
for i, p in enumerate(reader.pages):
    full_text += f"\n--- PAGE {i+1} ---\n" + p.extract_text()

# Also extract all hyperlinks from annotations across all pages
all_uris = []
for p in reader.pages:
    if '/Annots' in p:
        for a in p['/Annots']:
            obj = a.get_object()
            if '/A' in obj and '/URI' in obj['/A']:
                all_uris.append(obj['/A']['/URI'])

print("Total extracted URIs from PDF annotations:", len(all_uris))
print("Sample URIs:", all_uris[:5])

with open('scratch_pdf_text.txt', 'w') as f:
    f.write(full_text)

print("Saved full text to scratch_pdf_text.txt")
