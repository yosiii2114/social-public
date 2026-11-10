#!/usr/bin/env python3
"""Assemble course index from funnybunny proof block."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FUNNY = ROOT.parent / "funnybunny" / "index.html"
proof = ""
if FUNNY.exists():
    html = FUNNY.read_text(encoding="utf-8")
    i = html.index('<section class="proof"')
    j = html.index("</section>", i) + len("</section>")
    proof = html[i:j]
    proof = proof.replace("media/clients/", "img/")
    proof = proof.replace("img/bunny.webp", "img/bunny.webp")  # same
    proof = proof.replace('src="media/', 'src="media/')  # dm, insights, profile
    proof = proof.replace(
        "יוצרים, קומיקאים ועסקים — אותם שותפים כמו בדף האנימציה של יוסף. למטה צילומי שיחות ואינסטגרם.",
        "אלה האנשים שעליהם בניתי את המותג — ובסדנה תלמדו את אותו pipeline. למטה צילומי אינסטגרם אמיתיים.",
    )

WA = (
    "https://wa.me/972515688377?text="
    "%D7%94%D7%99%D7%99%20%D7%99%D7%95%D7%A1%D7%A3%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%93%D7%A3%20%D7%94%D7%A1%D7%93%D7%A0%D7%94%20%D7%9C%D7%90%D7%A0%D7%99%D7%9E%D7%A6%D7%99%D7%94%20AI%20%D7%A4%D7%90%D7%A0%D7%99%20%D7%91%D7%90%D7%A0%D7%99.%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9E%D7%A7%D7%95%D7%9D%20%D7%91%D7%A7%D7%91%D7%95%D7%A6%D7%94."
)

head = f"""<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>סדנת אנימציה AI · פאני באני · יוסף אחדות</title>
<meta name="description" content="3 מפגשים × 2 שעות — pipeline פאני באני: מסטנדאפ לריל ב-1,500 ₪. 813K צפיות ב-30 יום.">
<meta property="og:title" content="סדנת אנימציה AI · פאני באני">
<meta property="og:description" content="למדו לייצר ולמכור רילים מונפשים כמו @funny_bunny.ai">
<meta property="og:image" content="/img/og2.jpg">
<meta name="theme-color" content="#140a26">
<link rel="stylesheet" href="ig-landing.css?v=1">
<link rel="stylesheet" href="collab-lanyard.css?v=1">
<link rel="stylesheet" href="course-extra.css?v=1">
</head>
<body>
<div class="aurora" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<header class="top">
  <a class="brand" href="https://instagram.com/funny_bunny.ai" target="_blank" rel="noopener">🐰 <span>Funny Bunny</span> <small>| סדנה</small></a>
  <nav class="top-nav" aria-label="ניווט">
    <a href="https://funnybunny-landing.vercel.app/" target="_blank" rel="noopener">המותג</a>
    <a href="https://yosef-animation-landing.vercel.app/" target="_blank" rel="noopener">אנימציה בהזמנה</a>
    <a href="#reels">דוגמאות</a>
    <a href="#price">מחיר</a>
  </nav>
  <a class="top-cta" href="{WA}" target="_blank" rel="noopener">שריון מקום</a>
</header>
<main>
<section class="hero">
  <div class="hero-art"><img src="media/hero-bunny.jpg" alt="פאני באני" width="800" height="800" fetchpriority="high"><div class="sparkles" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b></div></div>
  <p class="kicker">סדנת מונטיזציה · @funny_bunny.ai</p>
  <h1>תלמדו pipeline שלם — <mark>ולמכור ריל ב-1,500 ₪</mark></h1>
  <p class="sub"><strong>3 מפגשים × 2 שעות · עד 8 משתתפים.</strong><br>לא עוד קורס AI תיאורטי: מאותו שיטון שייצר <strong>813K צפיות ב-30 יום</strong> ו-13 לקוחות ששילמו על סרטונים.</p>
  <a class="btn wa" href="{WA}" target="_blank" rel="noopener"><span class="wa-ico" aria-hidden="true">💬</span> שריון מקום בוואטסאפ</a>
  <ul class="stats" aria-label="מספרים">
    <li><b>813K</b><span>צפיות ב-30 יום</span></li>
    <li><b>1,500 ₪</b><span>חבילת 3 סרטונים ללקוח</span></li>
    <li><b>~1.5ש׳</b><span>ממוצע לסרטון אצלי</span></li>
  </ul>
  <div class="marquee" aria-hidden="true"><div class="marquee-track"><span>מתן פרץ</span><span>אורי ברויר</span><span>אסף יצחקי</span><span>אבי נוסבאום</span><span>מני עוזרי</span><span>דור יתח</span><span>נועם סלע</span><span>מתן פרץ</span><span>אורי ברויר</span><span>אסף יצחקי</span><span>אבי נוסבאום</span></div></div>
</section>

<section class="ba-sec" id="beforeafter">
  <h2>ככה <mark>מגיע החומר</mark> — וככה יוצא הריל</h2>
  <p class="hint">בהתחלה רואים <strong>רק את הסטנדאפיסט</strong> במקור. גרור ימינה — אותו רגע באנימציה. <strong>אותו אודיו</strong> — הקול לא משתנה.</p>
  <ol class="ba-flow">
    <li><b>1</b><span>הקומיקאא / הלקוח שולח קטע מהמופע או מהפודקאסט.</span></li>
    <li><b>2</b><span>אנחנו שוברים לסטוריבורד ומציירים מחדש כל מה שהוא מתאר.</span></li>
    <li><b>3</b><span>יוצא ריל 9:16 מוכן לפרסום — זה מה שלומדים בסדנה.</span></li>
  </ol>
  <p class="ba-prompt" id="baPrompt">👆 גרור את העיגול ימינה — תראה איך המקור הופך לאנימציה</p>
  <div class="lab-ba" id="labBa" aria-label="השוואת מקור סטנדאפ לאנימציה">
    <video id="baRaw" src="/v/ba_raw.mp4" poster="/v/ba_raw.jpg" muted loop playsinline preload="metadata" aria-label="מקור סטנדאפ"></video>
    <video id="baEdit" class="top" src="/v/ba_edit.mp4" poster="/v/ba_edit.jpg" muted loop playsinline preload="metadata" aria-label="אחרי אנימציה"></video>
    <span class="ba-knob" aria-hidden="true">›</span>
    <span class="lab-tag l">אחרי אנימציה</span>
    <span class="lab-tag r">מקור · סטנדאפ בלבד</span>
  </div>
  <p class="lab-credit">דוגמה: אבי נוסבאום · חניון תל אביב · פרויקט parking_tlv</p>
</section>

<section class="showcase" id="reels">
  <h2>מה <mark>מימשנו</mark> — תראו בעצמכם</h2>
  <p class="hint">הקישו על סרטון לשמוע 🔊 · אותם רילים שמוכרים את הסדנה</p>
  <div class="reels">
    <figure class="reel">
      <div class="vwrap">
        <video data-src="/v/bedouin2.mp4" poster="/p/bedouin2.jpg" muted loop playsinline preload="none" aria-label="בדואי גנב לחיילים את המים"></video>
        <span class="badge">🔥 293K</span>
        <span class="snd" aria-hidden="true">🔇</span>
      </div>
      <figcaption><b>בדואי גנב לחיילים את המים</b><span>מתן פרץ · אסף יצחקי</span></figcaption>
    </figure>
    <figure class="reel">
      <div class="vwrap">
        <video data-src="/v/djs.mp4" poster="/p/djs.jpg" muted loop playsinline preload="none" aria-label="מונית עם הדייג'ס"></video>
        <span class="badge">🔥 140K</span>
        <span class="snd" aria-hidden="true">🔇</span>
      </div>
      <figcaption><b>מונית עם הדייג'ס</b><span>אסף יצחקי</span></figcaption>
    </figure>
    <figure class="reel">
      <div class="vwrap">
        <video data-src="/v/ba_edit.mp4" poster="/v/ba_edit.jpg" muted loop playsinline preload="none" aria-label="חניון תל אביב"></video>
        <span class="badge">🎓 דוגמת סדנה</span>
        <span class="snd" aria-hidden="true">🔇</span>
      </div>
      <figcaption><b>חניון ת״א · אבי נוסבאום</b><span>סטנדאפ → אנימציה</span></figcaption>
    </figure>
  </div>
</section>

<section id="who">
  <h2>למי <mark>הסדנה מתאימה</mark></h2>
  <p class="hint">לא למתחילים ב-AI — למי שרוצה שורת הכנסה מרילים</p>
  <div class="audience">
    <article><b>פרילנסר AI / אוטומציה</b><span>כבר עובד עם Claude ו-Cursor — רוצה מוצר ויזואלי למכור, לא רק טקסטים.</span></article>
    <article><b>יוצר תוכן / סוכן סושיאל</b><span>מוכר שעות או פוסטים — רוצה חבילת רילים ב-1,500 ₪ עם שיטון חוזר.</span></article>
    <article><b>בעל עסק קטן</b><span>רוצה להפיק לעצמו, או לשכפל כשירות ללקוחות העסק.</span></article>
    <article><b>מי שכבר מוכר שירותי AI</b><span>מוסיף «אנימציה לריל» לסל — עם הוכחה מהפיד של פאני באני.</span></article>
  </div>
</section>

<section class="packs" id="learn">
  <h2>מה <mark>יוצאים איתו</mark></h2>
  <p class="hint">Pipeline מלא — כמו בפרויקטים אצל הלקוחות למעלה</p>
  <div class="cards">
    <article class="card"><span class="tag ico">🎙️</span><h3>מאודיו לסטוריבורד</h3><p>סטנדאפ / פודקאסט עם הקול המקורי — פירוק לשוטים ו-stills אחידים.</p></article>
    <article class="card"><span class="tag ico">✨</span><h3>הנפשה ב-Kie / Flow</h3><p>image-to-video, ניהול קליפים, עלויות מבוקרות.</p></article>
    <article class="card"><span class="tag ico">✂️</span><h3>עריכה וכתוביות</h3><p>הוק, מילה צהובה, יצוא 9:16 — ריל מוכן ללקוח.</p></article>
    <article class="card hot"><span class="tag">כסף</span><h3>מודל המחיר</h3><p>חבילת 3 סרטונים ~1,500 ₪ · שעה–שעתיים לסרטון — כמו שאני עושה היום.</p></article>
  </div>
</section>

<section class="how" id="how">
  <h2>איך <mark>3 המפגשים</mark> נראים</h2>
  <ol class="steps">
    <li><span class="num">1</span><div><b>רעיון, סגנון, סטוריבורד</b><p>בוחרים שפה ויזואלית אחת · Claude לתסריט · 2–3 stills</p></div></li>
    <li><span class="num">2</span><div><b>הנפשה</b><p>Kie.ai + Flow · קליפים גולמיים לפחות לשוט שלם</p></div></li>
    <li><span class="num">3</span><div><b>עריכה + מסירה</b><p>2–3 רילים מוכנים · תיקייה וסקילים להמשך</p></div></li>
  </ol>
</section>
"""

proof_block = proof or '<section class="proof" id="proof"><h2>עם מי <mark>עבדנו</mark></h2><p class="lead">הוכחות בדרך</p></section>'

tail = f"""
<section class="packs" id="price">
  <h2>השקעה <mark>בסדנה</mark></h2>
  <motion></motion>
  <div class="workshop-card" id="price">
    <p class="tag">cohort קטן · עד 8 משתתפים</p>
    <h3>סדנת אנימציה AI · פאני באני</h3>
    <p class="price">1,770 ₪</p>
    <p class="hint">1,500 ₪ + מע״מ · 6 שעות לייב</p>
    <ul>
      <li>✓ 3 מפגשים × 2 שעות</li>
      <li>✓ הקלטות + תיקיית פרויקט</li>
      <li>✓ סקילים ו-prompts מהעבודה האמיתית</li>
      <li>✓ עובדים על הפרויקט שלכם, לא דמו גנרי</li>
    </ul>
    <a class="btn wa" href="{WA}" target="_blank" rel="noopener"><span class="wa-ico">💬</span> להירשם בוואטסאפ</a>
  </div>
</section>

<section id="faq">
  <h2>שאלות <mark>נפוצות</mark></h2>
  <div class="faq">
    <details><summary>צריך ניסיון באנימציה?</summary><p>לא. צריך כבר לעבוד עם AI (Claude/Cursor). את האנימציה והעריכה אנחנו בונים יחד מהאפס.</p></details>
    <details><summary>כמה אפשר להרוויח אחרי?</summary><p>המודל שלי: כ-1,500 ₪ לחבילת 3 סרטונים, בערך שעה וחצי–שעתיים לסרטון. זה מה שמלמדים — לא הבטחת הכנסה, אבל שיטון אמיתי.</p></details>
    <details><summary>מה צריך מהבית?</summary><p>מחשב, חשבון Claude, ולהביא אודיו/רעיון לריל (או לבחור יחד בסדנה).</p></details>
    <details><summary>זה אותו דבר כמו להזמין סרטון ממך?</summary><p>לא — כאן אתם לומדים לייצר לבד. להזמנת סרטון: <a href="https://yosef-animation-landing.vercel.app/" target="_blank" rel="noopener">דף האנימציה של יוסף</a>.</p></details>
  </div>
</section>

<section class="link-row">
  <p>רוצים רק סרטון מוכן? <a href="https://yosef-animation-landing.vercel.app/" target="_blank" rel="noopener">yosef-animation-landing.vercel.app</a> · המותג: <a href="https://funnybunny-landing.vercel.app/" target="_blank" rel="noopener">funnybunny-landing.vercel.app</a></p>
</section>

<section class="final">
  <h2>הריל הבא ב-1,500 ₪ <mark>יכול להיות שלכם</mark></h2>
  <a class="btn wa" href="{WA}" target="_blank" rel="noopener"><span class="wa-ico">💬</span> דברו איתי בוואטסאפ</a>
</section>
</main>

<footer class="foot">
  <a href="https://funnybunny-landing.vercel.app/" target="_blank" rel="noopener">🐰 פאני באני</a>
  <a href="https://yosef-animation-landing.vercel.app/" target="_blank" rel="noopener">🎬 אנימציה בהזמנה</a>
  <a href="https://instagram.com/funny_bunny.ai" target="_blank" rel="noopener">📸 @funny_bunny.ai</a>
  <a href="https://instagram.com/yosef_ahm19" target="_blank" rel="noopener">📸 @yosef_ahm19</a>
  <p>© יוסף אחדות · סדנת פאני באני</p>
</footer>

<a class="sticky" href="{WA}" target="_blank" rel="noopener" aria-label="וואטסאפ">💬 שריון מקום בסדנה</a>
<script src="collab-lanyard.js?v=1" defer></script>
<script src="course.js?v=1" defer></script>
</body>
</html>
"""

out = head + "\n" + proof_block + "\n" + tail.replace("<motion></motion>", "")
(ROOT / "index.html").write_text(out, encoding="utf-8")
print("wrote", ROOT / "index.html", len(out), "chars")
