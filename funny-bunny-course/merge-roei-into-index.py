#!/usr/bin/env python3
"""Splice Roei sell sections into index.html (keep FB hero, ba, reels, proof)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
legacy = (ROOT / "index-roei-legacy.html").read_text(encoding="utf-8")
idx = (ROOT / "index.html").read_text(encoding="utf-8")

def slice_html(start_marker: str, end_marker: str) -> str:
    a = legacy.index(start_marker)
    b = legacy.index(end_marker, a)
    return legacy[a:b].strip()

scan = slice_html("<!-- scan pipeline", "<!-- 2. PAIN -->")
pain_calc = slice_html("<!-- 2. PAIN -->", "<!-- 6. PROOF")
lab = slice_html('<section id="lab"', "<!-- 6. PROOF")
lab = lab.replace(
    """      <article class="lab-card rv" id="labBA">
        <h3>גררו — מקור הסטנדאפ לעומת הריל שיצאנו</h3>
        <p class="lab-note" style="margin-bottom:12px">אבי נוסבאום · חניון תל אביב — אותו אודיו, ויזואל מחדש.</p>
        <div class="lab-ba" id="labBa">
          <video id="baRaw" src="/v/ba_raw.mp4" poster="/v/ba_raw.jpg" muted loop playsinline preload="none"></video>
          <video id="baEdit" class="top" src="/v/ba_edit.mp4" poster="/v/ba_edit.jpg" muted loop playsinline preload="none"></video>
          <span class="lab-tag l">אחרי אנימציה</span><span class="lab-tag r">מקור הסטנדאפ</span>
          <div class="lab-h" aria-hidden="true"><i>‹ ›</i></div>
        </div>
      </article>
""",
    "",
)
lab = lab.replace(
    '<div class="lab-grid">',
    '<div class="lab-grid lab-grid--solo">',
)
what_tracks = slice_html("<!-- 8. OUTCOME", "<!-- 8b. ROEI")
chat = slice_html("<!-- 9. OBJECTIONS", "<!-- 10. COST")
tail = slice_html("<!-- 10. COST", "<footer>")
tail = tail.replace('class="btn"', 'class="roei-btn"')
tracks_part = what_tracks.split("<!-- 8a. THE PRICE STAGE -->")
what, tracks = tracks_part[0], "<!-- 8a. THE PRICE STAGE -->\n" + tracks_part[1]
tracks = tracks.replace('class="btn"', 'class="roei-btn"')

roei_block_a = f"""<div class="sell-roei" id="roei-sell">
{scan}
{pain_calc}
{lab}
</div>
"""

roei_block_b = f"""<div class="sell-roei sell-roei--lower">
{what}
{tracks}
{chat}
{tail}
</div>
"""

dialog = slice_html("<dialog id=\"dlg\"", "</dialog>") + "\n</dialog>\n"

# Insert block A after beforeafter section
ba_end = idx.index("</section>", idx.index('id="beforeafter"')) + len("</section>")
idx = idx[:ba_end] + "\n\n" + roei_block_a + idx[ba_end:]

# Remove who, learn, how, price, faq (generic stubs)
import re

idx = re.sub(
    r'<section id="who">.*?</section>\s*',
    "",
    idx,
    count=1,
    flags=re.S,
)
idx = re.sub(
    r'<section class="packs" id="learn">.*?</section>\s*',
    "",
    idx,
    count=1,
    flags=re.S,
)
idx = re.sub(
    r'<section class="how" id="how">.*?</section>\s*',
    "",
    idx,
    count=1,
    flags=re.S,
)
idx = re.sub(
    r'<section class="packs" id="price">.*?</section>\s*',
    "",
    idx,
    count=1,
    flags=re.S,
)
idx = re.sub(
    r'<section id="faq">.*?</section>\s*',
    "",
    idx,
    count=1,
    flags=re.S,
)

# Insert block B before link-row
lr = idx.index('<section class="link-row">')
idx = idx[:lr] + roei_block_b + "\n" + idx[lr:]

# head + body extras
if "roei-sell.css" not in idx:
    idx = idx.replace(
        '<link rel="stylesheet" href="course-extra.css?v=1">',
        '<link rel="stylesheet" href="course-extra.css?v=1">\n<link rel="stylesheet" href="roei-sell.css?v=1">',
    )
if "roei-sell.js" not in idx:
    idx = idx.replace(
        '<script src="course.js?v=1" defer></script>',
        '<script src="course.js?v=1" defer></script>\n<script src="roei-sell.js?v=1" defer></script>',
    )
if 'id="prog"' not in idx:
    idx = idx.replace("<body>", '<body>\n<i id="prog" aria-hidden="true"></i>')
if 'id="dlg"' not in idx:
    idx = idx.replace("</body>", dialog + "\n</body>")

# nav anchor
idx = idx.replace('<a href="#price">מחיר</a>', '<a href="#tracks">מחיר</a>')

(ROOT / "index.html").write_text(idx, encoding="utf-8")
print("merged index.html")
