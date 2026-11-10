# -*- coding: utf-8 -*-
"""Funny Bunny rebrand: Roei mechanics, our colors + funnel copy."""
from pathlib import Path
import re

p = Path(__file__).with_name("index.html")
html = p.read_text(encoding="utf-8")

# --- fonts: drop Google, use local (subset from yosef-animation) ---
font_block = """@font-face{font-family:'Heebo';font-weight:400;font-display:swap;src:url(/f/heebo-hebrew-400.woff2) format('woff2');unicode-range:U+0590-05FF,U+FB1D-FB4F}
@font-face{font-family:'Heebo';font-weight:400;font-display:swap;src:url(/f/heebo-latin-400.woff2) format('woff2');unicode-range:U+0000-00FF}
@font-face{font-family:'Heebo';font-weight:700;font-display:swap;src:url(/f/heebo-hebrew-700.woff2) format('woff2');unicode-range:U+0590-05FF,U+FB1D-FB4F}
@font-face{font-family:'Heebo';font-weight:700;font-display:swap;src:url(/f/heebo-latin-700.woff2) format('woff2');unicode-range:U+0000-00FF}
@font-face{font-family:'Heebo';font-weight:800;font-display:swap;src:url(/f/heebo-hebrew-900.woff2) format('woff2');unicode-range:U+0590-05FF,U+FB1D-FB4F}
@font-face{font-family:'Heebo';font-weight:800;font-display:swap;src:url(/f/heebo-latin-900.woff2) format('woff2');unicode-range:U+0000-00FF}
"""

html = re.sub(r"<link rel=\"preconnect\"[^>]+>\n", "", html)
html = re.sub(r"<link href=\"https://fonts\.googleapis\.com[^>]+>\n", "", html)
html = html.replace("<style>", "<style>\n" + font_block, 1)

# --- design tokens (Funny Bunny / yosef-animation) ---
ROOT_OLD = re.search(r":root\{[^}]+\}", html).group(0)
ROOT_NEW = """:root{
  --cream:#FFF6EC;--coral:#FF5E3A;--sun:#FFC23C;--pink:#FF8FB1;--teal:#22B8A8;
  --primary:#FF5E3A;--primary-deep:#E84A22;--primary-press:#C93D18;--primary-tint:#FFF0E8;--lav:#FF8FB1;
  --dark:#25163A;--ink:#25163A;--ink-2:#4A3560;--mute:#6B5B7A;
  --soft:#FFF6EC;--hair:#EDE0D6;--magenta:#FF8FB1;--cyan:#22B8A8;--ruby:#E84A22;
  --r-md:8px;--r-lg:16px;--pill:999px;
  --shadow:0 30px 60px -12px rgba(37,22,58,.14),0 18px 36px -18px rgba(255,94,58,.12);
  --shadow-sm:0 13px 27px -5px rgba(37,22,58,.12),0 8px 16px -8px rgba(37,22,58,.1);
}"""
html = html.replace(ROOT_OLD, ROOT_NEW, 1)

html = html.replace(
    "/* Design system: VoltAgent/awesome-design-md · stripe/DESIGN.md, adapted to Hebrew RTL and Roei's white + purple.",
    "/* Funny Bunny course · Roei scroll mechanics + Achdut colors (cream/coral).",
    1,
)

# hardcoded purple → brand
pairs = [
    ("#533afd", "#FF5E3A"),
    ("#4434d4", "#E84A22"),
    ("#2e2b8c", "#C93D18"),
    ("#7a5cff", "#FF8FB1"),
    ("#a99bff", "#FFC23C"),
    ("#b9b9f9", "#FF8FB1"),
    ("#efedff", "#FFF0E8"),
    ("#f96bee", "#FF8FB1"),
    ("#80e9ff", "#22B8A8"),
    ("#1c1e54", "#25163A"),
    ("#0d253d", "#25163A"),
    ("#14103a", "#1A0F28"),
    ("#0b0818", "#1A0F28"),
    ("#3a2a9c", "#3D2040"),
    ("rgba(83,58,253", "rgba(255,94,58"),
    ("rgba(50,50,93", "rgba(37,22,58"),
    ('content="#533afd"', 'content="#FFF6EC"'),
    ("background:#fff", "background:var(--cream)", 1),  # body only first - risky
]
for item in pairs:
    if len(item) == 3:
        html = html.replace(item[0], item[1], item[2])
    else:
        html = html.replace(item[0], item[1])

# hero gradients
html = html.replace(
    ".hero::before{content:\"\";position:absolute;inset:-30% -20% 35% -20%;z-index:-1;background:radial-gradient(40% 50% at 20% 30%,#a99bff 0,transparent 70%),radial-gradient(35% 45% at 80% 20%,#f96bee 0,transparent 70%),radial-gradient(45% 55% at 60% 60%,#533afd 0,transparent 70%),radial-gradient(30% 40% at 10% 70%,#80e9ff 0,transparent 70%);opacity:.55;transform:skewY(-8deg);animation:drift 18s ease-in-out infinite alternate}",
    ".hero::before{content:\"\";position:absolute;inset:-30% -20% 35% -20%;z-index:-1;background:radial-gradient(40% 50% at 20% 30%,#FFC23C 0,transparent 70%),radial-gradient(35% 45% at 80% 20%,#FF8FB1 0,transparent 70%),radial-gradient(45% 55% at 60% 60%,#FF5E3A 0,transparent 70%),radial-gradient(30% 40% at 10% 70%,#22B8A8 0,transparent 40%);opacity:.45;transform:skewY(-8deg);animation:drift 18s ease-in-out infinite alternate}",
    1,
)
html = html.replace(
    ".hero::after{content:\"\";position:absolute;inset:auto 0 0 0;height:55%;z-index:-1;background:linear-gradient(to bottom,transparent,#fff 45%)}",
    ".hero::after{content:\"\";position:absolute;inset:auto 0 0 0;height:55%;z-index:-1;background:linear-gradient(to bottom,transparent,var(--cream) 50%)}",
    1,
)

# marquee
if "class=\"marq\"" not in html:
    mq_css = """
.marq{background:var(--dark);color:var(--cream);overflow:hidden;transform:rotate(-1.5deg);margin:-8px 0 0;padding:14px 0;font-weight:800;font-size:clamp(17px,4vw,22px);white-space:nowrap}
.marq div{display:inline-block;animation:mqscroll 24s linear infinite}
.marq span{margin:0 20px}.marq span:nth-child(3n){color:var(--sun)}.marq span:nth-child(3n+1){color:var(--pink)}
@keyframes mqscroll{to{transform:translate3d(-50%,0,0)}}
.top img.blogo{width:36px;height:36px;border-radius:50%;box-shadow:0 4px 14px rgba(37,22,58,.12)}
.top .brand{display:flex;align-items:center;gap:10px;font-weight:800}
"""
    html = html.replace("/* ===== MARQUEE: the main message ===== */", mq_css + "\n/* ===== MARQUEE ===== */", 1)
    marquee = """
<div class="marq" aria-hidden="true"><div>
<span>Claude ✦</span><span>Kie.ai ✦</span><span>ריל ללקוח ב-1,500 ₪ ✦</span><span>6 שעות לייב ✦</span><span>פאני באני ✦</span>
<span>Claude ✦</span><span>Kie.ai ✦</span><span>ריל ללקוח ב-1,500 ₪ ✦</span><span>6 שעות לייב ✦</span><span>פאני באני ✦</span>
</div></div>
"""
    html = html.replace("</header>\n\n<!-- the AI scan", "</header>\n" + marquee + "\n<!-- scan pipeline", 1)

# hero copy — funnel
hero_top = """    <div class="top"><span class="brand"><img class="blogo" src="/img/bunny.webp" width="36" height="36" alt="">פאני באני</span><span>סדנת מונטיזציה · יוסף אחדות</span></div>"""
html = re.sub(
    r"<div class=\"top\">.*?</div>\n    <div class=\"hero-grid\">",
    hero_top + "\n    <div class=\"hero-grid\">",
    html,
    count=1,
    flags=re.DOTALL,
)
html = html.replace(
    "<h1>רילים מונפשים לעסק <strong>בלי צוות הפקה.</strong></h1>",
    "<h1>תלמדו לייצר רילים <strong>ולמכור ב-1,500 ₪.</strong></h1>",
    1,
)
html = html.replace(
    "<p class=\"lead\">מסטוריבורד, קליפים ב-Kie.ai ועריכה עם AI — יוצאים עם כמה סרטונים ותבנית להמשיך לבד.</p>",
    "<p class=\"lead\">לא עוד טאקטיקות AI סתמיות — pipeline מלא כמו בפאני באני: רעיון → סטוריבורד → הנפשה → עריכה. אצלי: כ-<b>שעה וחצי לסרטון</b>, 13 לקוחות שילמו מחיר שירות.</p>",
    1,
)
html = html.replace(
    "<p class=\"closing\">נפתח מחזור כשנסגר <b>מינימום 3–4 נרשמים</b> · מקסימום 8</p>",
    "<p class=\"closing\">מתאים למי שכבר עובד עם <b>Claude / Cursor</b> ורוצה <b>הכנסה</b> מרילים — לא רק הובי.</p>",
    1,
)

# pain — monetization
pain_new = """    <p>אתה כבר ב-AI.</p>
    <p>אבל עדיין מוכר שעות — או לא מוכר בכלל.</p>
    <p>בלי pipeline, ריל אחד = יום עבודה.</p>
    <p>ובינתיים מישהו אחר גובה 900–1,500 ₪ על אותו סרטון.</p>"""
html = re.sub(
    r"<div class=\"wrap pain-lines\" id=\"pain\">.*?</div>\n</section>",
    f'<div class="wrap pain-lines" id="pain">\n{pain_new}\n  </div>\n</section>',
    html,
    count=1,
    flags=re.DOTALL,
)

# scan tag
html = html.replace("<span class=\"scan-tag\">הריל המונפש</span>", "<span class=\"scan-tag\">מסקיצה לריל</span>", 1)

# CONFIG
config = """const CONFIG = {
  video: '/v/djs.mp4', poster: '/p/djs.jpg',
  scanMesh: false,
  grow: { workshop: '', coaching: '' },
  deadline: '2026-12-15T20:00:00+02:00',
  proof: [
    { value: 813000, prefix: '', text: 'צפיות ב-30 יום · @funny_bunny.ai', img: '/proof/djs.jpg', note: 'המותר שכבר רץ' },
    { value: 293000, prefix: '', text: 'צפיות לריל בודד (דוגמה)', img: '/proof/bedouin2.jpg', note: 'ריל מהפייפליין' },
    { value: 13, prefix: '', text: 'לקוחות ששילמו על סרטון', img: '/img/og2.jpg', note: 'ממוצע ~1,500 ₪ · ~שעה וחצי–שעתיים לסרטון' }
  ],
  testimonial: null,
  closing: null
};"""
html = re.sub(r"const CONFIG = \{[\s\S]*?\};", config, html, count=1)

# lab videos
html = html.replace('src="/v/ba_raw.mp4" poster="/v/ba_raw.jpg"', 'src="/v/bedouin2.mp4" poster="/p/bedouin2.jpg"')
html = html.replace('src="/v/ba_edit.mp4" poster="/v/ba_edit.jpg"', 'src="/v/djs.mp4" poster="/p/djs.jpg"')

# BIZ — creators not roei coaches
biz_old = "  const BIZ = ["
if biz_old in html:
    biz_new = """  const BIZ = [
    { n: 'פודקאסטר', scan: 'בודק מה עובד בפודקאסטים באינסטגרם', t: 'יש לך פרק מעולה שאף אחד לא שמע? תהפוך 60 שניות מצוירות לריל — עם הוק שנותן ללחוץ «שמע עכשיו».' },
    { n: 'בעל עסק קטן', scan: 'סורק מתחרים בענף שלך', t: 'הלקוחות שואלים אותך שוב ושוב אותה שאלה? ריל מצויר עונה עליה בלי שתעמוד מול מצלמה.' },
    { n: 'יוצר AI', scan: 'מחבר רעיון לסטוריבורד', t: 'כבר יודע פרומפטים — אבל אין לך תוצר שאפשר למכור? בונים ריל אחד שאפשר להציג ללקוח מחר.' },
    { n: 'פרילנסר תוכן', scan: 'משווה רילים שעבדו בנישה', t: 'במקום להסביר בטקסט למה לשכור אותך — מציגים דמו חי: מהתסריט לריל בפחות משעתיים.' },
    { n: 'מאמן / יועץ', scan: 'מזהה כאב לקוחות בפיד', t: 'הידע שלך שווה כסף. ריל אחד מצויר = שיעור קצר שמוכר את השיחה הבאה.' },
    { n: 'מסעדה / קייטרינג', scan: 'בודק טרנדים של אוכל מקומי', t: 'לא צריך צילום מטבח יקר. still אחד + תנועה קטנה = הזמנות מהסטורי.' },
    { n: 'ערוץ הומור', scan: 'כותב פאנץ׳ בסגנון שלך', t: 'הבדיחה שלך בטקסט לא מספיקה? תנפיש אותה — זה מה שמביא את ה-293K.' }
  ];"""
    html = re.sub(r"  const BIZ = \[[\s\S]*?\];", biz_new, html, count=1)

# scan: no roei face mesh
html = html.replace(
    "  fetch('/v/mesh.json').then(r => r.json()).then(d => { M = d; size(); last = -1; paint(); }).catch(() => {});",
    "  if (CONFIG.scanMesh) fetch('/v/mesh.json').then(r => r.json()).then(d => { M = d; size(); last = -1; paint(); }).catch(() => {});",
    1,
)

# machine typing demo
html = html.replace(
    "typeIt($('type'), 'למה לקוחות קונים מהמתחרה שלך, גם כשהוא יקר ממך?');",
    "typeIt($('type'), 'למה לשלם 1,500 ₪ על ריל — כשאפשר ללמוד לייצר לבד?');",
    1,
)
html = html.replace(
    "$('type').textContent = 'למה לקוחות קונים מהמתחרה שלך, גם כשהוא יקר ממך?';",
    "$('type').textContent = 'למה לשלם 1,500 ₪ על ריל — כשאפשר ללמוד לייצר לבד?';",
    1,
)

# side.av calc — sell angle
html = html.replace(
    "<p>מהמחשב שלך, בקצב שלך. <b>כ~150–400 ₪</b> בחודש על Claude + כלי וידאו.</p>",
    "<p><b>לקוח משלם 900–1,500 ₪</b> לריל. הכלים: כ~150–400 ₪ לחודש. שעתיים עבודה כשהפייפליין ישב.</p>",
    1,
)

# clone counter target stays 12 in JS

# og image
html = html.replace('content="/og.png"', 'content="/img/og2.jpg"', 1)

p.write_text(html, encoding="utf-8")
print("rebrand OK", len(html))
