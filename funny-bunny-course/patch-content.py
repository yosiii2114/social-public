# -*- coding: utf-8 -*-
"""One-shot content patch: Roei layout → Funny Bunny animation course."""
from pathlib import Path

p = Path(__file__).with_name("index.html")
html = p.read_text(encoding="utf-8")

WA = "972515688377"
WA_LINK = f"https://wa.me/{WA}"
REG_TEXT = (
    "היי יוסף, אשמח להירשם לסדנת אנימציה AI (פאני באני).\n"
    "1) שם:\n2) טלפון:\n3) מועד מועדף: שבוע הבא / ~שבועיים / +חודש\n"
    "4) שעות: בוקר / ערב\n5) תשלום: אחד / בתשלומים"
)

repls = [
    ("<title>סדנת אווטאר AI · רועי בן חמו</title>",
     "<title>סדנת אנימציה AI · פאני באני · יוסף אחדות</title>"),
    ('content="סרטונים בלי יום צילום. בסדנה בונים לך אווטאר עם הפנים והקול שלך, ומכונה שמייצרת לך תוכן."',
     'content="6 שעות לייב: מסטוריבורד לרילים מונפשים עם Claude, Kie.ai ועריכה. עד 8 משתתפים. 1,500 ₪ + מע״מ."'),
    ('content="סרטונים בלי יום צילום · סדנת אווטאר AI"',
     'content="רילים מונפשים לעסק · סדנת אנימציה AI"'),
    ('content="סדנת אווטאר עם רועי בן חמו. מתחיל ב-11.11, ההרשמה נסגרת ב-9.11 ב-20:00."',
     'content="סדנת אנימציה AI עם יוסף אחדות (פאני באני). 3 מפגשים × 2 שעות — תאריכים לפי קבוצה."'),
    ('<div class="top"><b>רועי בן חמו</b><span>סדנת אווטאר AI</span></div>',
     '<div class="top"><b>פאני באני</b><span>סדנת אנימציה AI · יוסף אחדות</span></div>'),
    ('<span class="eyebrow">סדנת אווטאר · מתחיל ב-11.11</span>',
     '<span class="eyebrow">3 מפגשים × 2 שעות · cohort קטן</span>'),
    ('<h1>סרטונים לעסק <strong>בלי יום צילום.</strong></h1>',
     '<h1>רילים מונפשים לעסק <strong>בלי צוות הפקה.</strong></h1>'),
    ('<p class="lead">בונים לך אווטאר עם הפנים והקול שלך, ומכונה שמייצרת לך תוכן לאינסטגרם ולמודעות.</p>',
     '<p class="lead">מסטוריבורד, קליפים ב-Kie.ai ועריכה עם AI — יוצאים עם כמה סרטונים ותבנית להמשיך לבד.</p>'),
    ('<p class="closing">ההרשמה נסגרת ביום שני, <b>9.11, ב-20:00</b></p>',
     '<p class="closing">נפתח מחזור כשנסגר <b>מינימום 3–4 נרשמים</b> · מקסימום 8</p>'),
    ('aria-label="מהצילום לאווטאר"',
     'aria-label="מסקיצה לריל מונפש"'),
    ('<span class="scan-tag">האווטאר שלך</span>',
     '<span class="scan-tag">הריל המונפש</span>'),
    ("<p class=\"on\">מצלמים אותך <b>פעם אחת.</b></p>",
     "<p class=\"on\">מתחילים מ<strong>רעיון וסטוריבורד.</strong></p>"),
    ("<p>AI לומד <b>את הפנים שלך.</b></p>",
     "<p>יוצרים stills <b>בסגנון אחיד.</b></p>"),
    ("<p>לומד לדבר <b>בקול שלך.</b></p>",
     "<p>Kie / Flow מחיה <b>שוט אחר שוט.</b></p>"),
    ("<p>ומכאן הוא <b>מדבר בשבילך.</b></p>",
     "<p>עריכה, כתוביות — <b>ריל מוכן לפרסום.</b></p>"),
    ("<p>יום צילום.</p>", "<p>ריל בלי רעיון ברור.</p>"),
    ("<p>צלם, עורך, ועוד פינג-פונג כשזה לא יוצא טוב.</p>",
     "<p>כל פעם מחדש: תסריט, ויזואל, סאונד.</p>"),
    ("<p>רעיון, תסריט, להסתפר ולהתארגן.</p>",
     "<p>שוק הכלים רץ מהר — קשה לשמור על קצב.</p>"),
    ("<p>יום שלם בשביל סרטון אחד.</p>",
     "<p>או שמשלמים מאות ₪ על כל סרטון מישהו אחר.</p>"),
    ("<small>צילום, הסתפרות, עורך ופינג-פונג</small>",
     "<small>רעיון, יצירה, עריכה, תיקונים</small>"),
    ("<small>צלם ועורך</small>", "<small>פרילנס / סטודיו</small>"),
    ("<h3>עם האווטאר</h3>", "<h3>אחרי הסדנה</h3>"),
    ("<div class=\"n\">30 עד 40 סרטונים</div>",
     "<div class=\"n\">8 עד 15 רילים</div>"),
    ("<p>מהספה, בפיג'מה, בלי לצאת מהבית. <b>200 עד 300 ₪</b> בחודש על הכלים.</p>",
     "<p>מהמחשב שלך, בקצב שלך. <b>כ~150–400 ₪</b> בחודש על Claude + כלי וידאו.</p>"),
    ("<p class=\"calc-note\">החישוב לפי מה שהזנת. 30 עד 40 סרטונים ו-200 עד 300 ₪ זה מה שקורה אצלי.</p>",
     "<p class=\"calc-note\">החישוב לפי מה שהזנת. היעד בסדנה: שגרת ייצור שאפשר לשחזר בבית.</p>"),
    ("<h2 class=\"rv\">תשכפל <b>את עצמך.</b></h2>",
     "<h2 class=\"rv\">תכפיל <b>את הייצור.</b></h2>"),
    ("<p class=\"sub rv\">מצלמים אותך פעם אחת. מכאן האווטאר מדבר בשבילך, בקול שלך.</p>",
     "<p class=\"sub rv\">סטוריבורד אחד הופך לכמה וריאציות — אותו מסר, זוויות ופורמטים שונים.</p>"),
    ("<p class=\"counter rv\"><b id=\"cnt\">1</b> סרטונים בחודש, בלי יום צילום</p>",
     "<p class=\"counter rv\"><b id=\"cnt\">1</b> רילים בחודש, בלי להזמין הפקה כל פעם</p>"),
    ("<h3>האווטאר מדבר</h3><p>האווטאר מדבר בקול שלך. אתה לא צריך להצטלם.</p>",
     "<h3>הנפשה</h3><p>still → וידאו ב-Kie.ai / Flow. בוחרים מודל לפי איכות ותקציב.</p>"),
    ("<h3>כמה סרטונים מוכנים כבר בסדנה</h3><p>ומה שעובד עולה שוב כ-Trial",
     "<h3>כמה רילים מוכנים כבר בסדנה</h3><p>ומה שעובד עולה שוב כוריאציה"),
    ('<p class="lab-note">דוגמה. בסדנה הוא כותב על העסק שלך, אחרי מחקר על המתחרים שלך.</p>',
     '<p class="lab-note">דוגמה. בסדנה עובדים על העסק או הפרויקט שלך — עם אותה שיטה.</p>'),
    ('<h3>גרור, ותראה מה Claude עשה לסרטון שלי</h3>',
     '<h3>גרור, ותראה מה עריכה + AI שינו לדוגמה</h3>'),
    ('<span class="lab-tag l">אחרי Claude</span><span class="lab-tag r">מהטלפון</span>',
     '<span class="lab-tag l">אחרי עריכה</span><span class="lab-tag r">גרסה גולמית</span>'),
]

for old, new in repls:
    if old not in html:
        print("MISSING:", old[:60], "...")
    else:
        html = html.replace(old, new, 1)

# outcome block
old_out = """    <div class="outcome rv">
      <div><i>✓</i>אווטאר, הכפיל הדיגיטלי שלך</div>
      <div><i>✓</i>סרטונים מוכנים</div>
      <div><i>✓</i>דשבורד לניהול התוכן</div>
    </div>
    <p class="forever rv"><b>לומדים ליצור תוכן לתמיד, לא רק מה שעושים בסדנה.</b> רוצה מחר לבנות לוח תוכן לחודש קדימה? תדע לעשות את זה לבד.</p>"""

new_out = """    <div class="outcome rv">
      <div><i>✓</i>סטוריבורד וסגנון ויזואלי אחיד</div>
      <div><i>✓</i>2–3 רילים מוכנים לפרסום</div>
      <div><i>✓</i>תבנית תיקייה + סקילים להמשך</div>
    </div>
    <p class="forever rv"><b>לומדים pipeline שלם, לא רק קליק אחד.</b> אחרי הסדנה אפשר להוציא ריל חדש מאותו שיטון — בלי לחזור להתחלה.</p>"""

if old_out in html:
    html = html.replace(old_out, new_out, 1)
else:
    print("MISSING outcome")

# syllabus — replace from syl-head through end of .syl
start = html.find('    <div class="syl-head rv">')
end = html.find('    </div>\n  </div>\n</section>\n\n<!-- 8a. THE PRICE STAGE')
if start == -1 or end == -1:
    print("MISSING syllabus bounds", start, end)
else:
    new_syl = r'''    <div class="syl-head rv">
      <h2>3 מפגשים. <b>מאפס לריל.</b></h2>
      <p class="sub">בכל מפגש אני מראה, ואתה עושה על הפרויקט שלך.</p>
    </div>
    <div class="syl">
      <details class="syl-item rv" name="syl" open>
        <summary><span class="syl-n">1</span><span class="syl-t">רעיון, סגנון וסטוריבורד</span><span class="syl-c" aria-hidden="true"></span></summary>
        <div class="syl-b"><p class="syl-d">מפגש 1 · 2 שעות</p><ul><li>בוחרים סגנון אחד (פיקסאר, אנימה, וכו׳)</li><li>Claude: הוק, תסריט 9:16, פירוק לשוטים</li><li>stills ראשונים — עקביות דמות</li></ul><p class="syl-out"><b>יוצא עם:</b> סטוריבורד מאושר + 2–3 stills.</p></div>
      </details>
      <details class="syl-item rv" name="syl">
        <summary><span class="syl-n">2</span><span class="syl-t">הנפשה — Kie.ai ו-Flow</span><span class="syl-c" aria-hidden="true"></span></summary>
        <div class="syl-b"><p class="syl-d">מפגש 2 · 2 שעות</p><ul><li>still → image-to-video ב-Kie.ai</li><li>בחירת מודל לפי מחיר/איכות</li><li>ניהול קליפים בפרויקט (כמו בעבודה אמיתית)</li></ul><p class="syl-out"><b>יוצא עם:</b> קליפים גולמיים לשוט שלם לפחות.</p></div>
      </details>
      <details class="syl-item rv" name="syl">
        <summary><span class="syl-n">3</span><span class="syl-t">עריכה, כתוביות וייצוא</span><span class="syl-c" aria-hidden="true"></span></summary>
        <div class="syl-b"><p class="syl-d">מפגש 3 · 2 שעות</p><ul><li>ffmpeg / סקריפטים + Cursor (למי שרוצה)</li><li>כתוביות מילה-מילה, זומים, סאונד</li><li>ייצוא ל-IG + וריאציות מאותו חומר</li></ul><p class="syl-out"><b>יוצא עם:</b> 2–3 קטעים פרסומיים + תבנית להמשך.</p></div>
      </details>
      <details class="syl-item syl-more rv" name="syl">
        <summary><span class="syl-t">מה צריך לפני, ומה קורה אחרי</span><span class="syl-c" aria-hidden="true"></span></summary>
        <div class="syl-b"><p><b>לפני מפגש 1 (בערך שעה):</b> מנוי Claude · חשבון בכלי וידאו (Kie וכו׳) · מחשב עם דיסק פנוי · (אופציונלי) Cursor.</p><p><b>קהל:</b> כבר נגעת ב-Claude / Cursor / Grok / Codex — לא מתחילי אפס מוחלט.</p><p><b>אחרי הסדנה:</b> הקלטות, ליווי בוואטסאפ לזמן קצר, ואופציה עתידית למסלול אווטאר לבוגרים.</p></div>
      </details>
    </div>
'''
    html = html[:start] + new_syl + html[end:]

# tracks / pricing
tracks_old = html[html.find('<!-- 8a. THE PRICE STAGE'):html.find('<!-- 8b. ROEI')]
tracks_new = f'''<!-- 8a. THE PRICE STAGE -->
<section id="tracks" class="ofr">
  <div class="wrap ofr-in">
    <span class="px-deal rv">סדנת אנימציה AI · פאני באני</span>
    <h2 class="rv">6 שעות לייב. <b>כמה רילים ביד.</b></h2>
    <p class="sub fitline rv">לעסקים קטנים, יוצרי תוכן ופודקאסטרים שרוצים רילים מצוירים — בלי לשכור הפקה כל שבוע.</p>
    <div class="bigprice rv" id="bigPrice"><span class="amt"><span id="bpN">1,500</span> ₪</span><small>+ מע"מ</small></div>
    <p class="vat rv">1,770 ₪ כולל מע"מ</p>

    <div class="ticket" id="ticket">
      <span class="tk-stamp">בונוס</span>
      <span class="tk-border" aria-hidden="true"></span>
      <div class="tk-in">
        <p class="tk-k">לנרשמים בשלב ההרשמה הראשון</p>
        <h3 class="tk-h">ביקורת <b>1:1 · 20 דקות</b></h3>
        <p class="tk-s">עוברים יחד על הריל הראשון שלך אחרי הסדנה — לפני שאתה מפרסם.</p>
        <div class="tk-line" aria-hidden="true"></div>
        <div class="tk-cd" role="timer" aria-label="הזמן שנשאר לבונוס">
          <div><b id="tk-d">0</b><span>ימים</span></div>
          <div><b id="tk-h">00</b><span>שעות</span></div>
          <div><b id="tk-m">00</b><span>דקות</span></div>
          <div><b id="tk-s">00</b><span>שניות</span></div>
        </div>
      </div>
    </div>
    <p class="bonus2 rv"><b>ועוד:</b> חבילת סקילים מצומצמת + תבנית תיקיית פרויקט מה-vault.</p>

    <div class="incl rv">
      <h3>מה עוד בפנים</h3>
      <ul>
        <li>3 מפגשים בזום, שעתיים כל אחד (סה״כ 6 שעות)</li>
        <li>2 מפגשים בשבוע · שעות לפי סקר: בוקר או ערב</li>
        <li>תאריך פתיחה גמיש — לפי הרשמות (מינימום 3–4)</li>
        <li>עד 8 משתתפים · cohort קטן</li>
        <li>הקלטות נשלחות אחרי כל מפגש</li>
        <li>עבודה על פרויקט חופשי לעסק או רעיון מגן משותף</li>
        <li>ליווי בוואטסאפ לזמן קצר אחרי הסדנה</li>
      </ul>
    </div>

    <div class="pay rv">
        <p class="pay-q">מוכן/ה להצטרף?</p>
        <div class="pay-btns">
          <a class="btn" href="{WA_LINK}?text={REG_TEXT.replace(chr(10), '%0A').replace(' ', '%20')}" id="waMain">הרשמה בוואטסאפ</a>
          <button class="btn ghost" type="button" data-track="workshop" data-plan="1">טופס קצר כאן</button>
        </div>
        <p class="closing">משלמים אחרי שמסגרים מועד · <b>תשלום אחד או בתשלומים</b> (מתואם בוואטסאפ)</p>
    </div>
  </div>
</section>

'''
html = html.replace(tracks_old, tracks_new, 1)

# closing section wa
html = html.replace('https://wa.me/972545514898', WA_LINK)
html = html.replace('972545514898', WA)

# footer
html = html.replace('<span>© רועי בן חמו</span>',
                    '<span>© פאני באני · יוסף אחדות</span>')
html = html.replace('וואטסאפ 054-5514898', 'וואטסאפ 051-5688377')

# sticky bar
html = html.replace('<b>סדנת אווטאר AI</b><span id="barLeft">ההרשמה נסגרת ב-9.11</span>',
                    '<b>סדנת אנימציה AI</b><span id="barLeft">cohort נפתח לפי הרשמות</span>')

# now section
html = html.replace(
    '<p class="big rv">יש לי חודש פנוי עד אמצע דצמבר, ואז אני חוזר לקורסי המסחר. לא ידוע מתי תהיה הסדנה הבאה.</p>',
    '<p class="big rv">מחזור ראשון נסגר כשיש מספיק נרשמים — ואז קובעים ימים (בוקר/ערב) יחד.</p>')
html = html.replace('<p class="closing">ההרשמה נסגרת ביום שני, <b>9.11, ב-20:00</b></p>',
                    '<p class="closing">עד <b>8 מקומות</b> · הרשמה עכשיו שומרת מקום</p>')

# faq
html = html.replace(
    '<details><summary>מתי המפגשים?</summary><p>בימי שני ורביעי בבוקר: 11, 16, 18, 23 ו-25.11. כל מפגש מוקלט.</p></details>',
    '<details><summary>מתי המפגשים?</summary><p>3 מפגשים × 2 שעות, פעמיים בשבוע. התאריך המדויק נקבע עם הנרשמים (שבוע הבא / ~שבועיים / +חודש). כל מפגש מוקלט.</p></details>')
html = html.replace(
    '<details><summary>אפשר לשלם בתשלומים?</summary><p>כן, עד 6 תשלומים.</p></details>',
    '<details><summary>אפשר לשלם בתשלומים?</summary><p>כן — מתואם בוואטסאפ לפני תשלום.</p></details>')

# consent + dialog
html = html.replace('אני מסכים שרועי ישלח לי הודעות בוואטסאפ על הסדנה והליווי',
                    'אני מסכים שיוסף ישלח לי הודעות בוואטסאפ על הסדנה והליווי')
html = html.replace('<button class="btn" type="submit" id="submit">להמשיך לתשלום</button>',
                    '<button class="btn" type="submit" id="submit">לשלוח ולפתוח וואטסאפ</button>')
html = html.replace('<p>אשלח לך בוואטסאפ את הקישור לתשלום.</p>',
                    '<p>אחזור אליך בוואטסאפ עם פרטי תשלום ומועדים.</p>')
html = html.replace('לקבל את הקישור עכשיו בוואטסאפ', 'לפתוח וואטסאפ עכשיו')

# CONFIG block
import re
config = f"""const CONFIG = {{
  video: '/v/sales.mp4', poster: '/v/sales.jpg',
  grow: {{ workshop: '', coaching: '' }},
  deadline: '2026-11-30T20:00:00+02:00',
  proof: [
    {{ value: 813000, prefix: '', text: 'צפיות ב-30 יום (פאני באני)', img: '/proof/views.jpg', note: 'נתון עמוד הפייסבוק' }},
    {{ value: 293000, prefix: '', text: 'צפיות לריל בודד (דוגמה)', img: '/proof/followers.jpg', note: 'social proof מהמותג' }}
  ],
  testimonial: null,
  closing: null
}};"""
html = re.sub(r"const CONFIG = \{[\s\S]*?\};", config, html, count=1)

tracks_js = 'const TRACKS = { workshop: \'סדנת אנימציה AI · 1,500 ₪ + מע"מ\' };'
html = re.sub(r"const TRACKS = \{[\s\S]*?\};", tracks_js, html, count=1)

# JS tweaks
html = html.replace("n.textContent = fmt(1990 * e)", "n.textContent = fmt(1500 * e)")
html = html.replace("setTimeout(() => tween($('cnt'), 30, 1400)", "setTimeout(() => tween($('cnt'), 12, 1400)")
html = html.replace("'https://wa.me/972545514898?text='", f"'{WA_LINK}?text='")
html = html.replace(
    "encodeURIComponent('היי רועי, נרשמתי עכשיו ל' + TRACKS[track] + plan + '. אפשר קישור לתשלום?')",
    f"encodeURIComponent('היי יוסף, נרשמתי ל' + TRACKS[track] + plan + '. שם: ' + name + ', טלפון: ' + phone)")
html = html.replace("n.href = 'https://wa.me/972545514898'", f"n.href = '{WA_LINK}'")

# Form: prefer WA on success (marker replace — avoids regex escape pain)
FORM_OLD = "form.addEventListener('submit', async e => {"
if FORM_OLD in html:
    i0 = html.index(FORM_OLD)
    i1 = html.index("});", i0) + 3
    form_submit = (
        "form.addEventListener('submit', async e => {\n"
        "  e.preventDefault();\n"
        "  const err = $('err'), btn = $('submit');\n"
        "  const name = $('f-name').value.trim(), phone = $('f-phone').value.trim();\n"
        "  const digits = phone.replace(/\\D/g, '').replace(/^972/, '0');\n"
        "  if (name.length < 2) { err.textContent = 'רק השם, בבקשה.'; return; }\n"
        "  if (!/^0\\d{8,9}$/.test(digits)) { err.textContent = 'נראה שחסרה ספרה בטלפון.'; return; }\n"
        "  if (!$('f-consent').checked) { err.textContent = 'צריך לאשר שליחת הודעות בוואטסאפ.'; return; }\n"
        "  err.textContent = ''; btn.disabled = true; btn.textContent = 'שולח...';\n"
        "  const msg = 'היי יוסף, נרשמתי לסדנת אנימציה AI.\\nשם: ' + name + '\\nטלפון: ' + phone + '\\n' + (TRACKS[track] || '') + (plan || '');\n"
        "  try {\n"
        "    await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({\n"
        "      name, phone, track, consent: true, consent_text: $('consentText').textContent,\n"
        "      consent_version: CONSENT_VERSION, website: $('f-website').value }) });\n"
        "  } catch (x) { /* static hosting */ }\n"
        f"  $('waPay').href = '{WA_LINK}?text=' + encodeURIComponent(msg);\n"
        "  window.open($('waPay').href, '_blank');\n"
        "  $('formBody').hidden = true; $('done').hidden = false;\n"
        "  btn.disabled = false; btn.textContent = 'לשלוח ולפתוח וואטסאפ';\n"
        "});"
    )
    html = html[:i0] + form_submit + html[i1:]
else:
    print("MISSING form handler")

# Chat objections — batch replace key avatar lines
chat_fixes = [
    ("גם התלמיד שראית למעלה ניסה פעם לבד, וזה לא נראה טוב. אחרי שבנינו את זה ביחד, אימא שלו לא הצליחה לזהות אם זה הוא או לא. במפגש 2 בודקים את האווטאר שלך מול הסרטון האמיתי ומשפרים אותו עד שאתה מרוצה, ויש ליווי בוואטסאפ.",
     "רוב מי שמתחיל לבד נתקע בין סטייל לשוט — או בין כלי לעריכה. בסדנה עוברים pipeline אחד מסודר, עם תיקון בזמן אמת, וליווי בוואטסאפ אחרי."),
    ("בגלל זה בדיוק. רוב מי שלא מעלה סרטונים לא מעלה כי זה קשה: לצלם, לערוך, להתארגן. פה אתה לא עומד מול מצלמה. בוחר רעיון, מאשר, והסרטון יוצא. אנשים מתחילים להכיר אותך ואת העסק שלך, גם בשבוע עמוס.",
     "בדיוק. ריל מצויר עוצר גלילה גם בלי הפקה כבדה. אחרי הסדנה אפשר להוציא רעיון לריל בערב — בלי צלם ובלי יום צילום."),
    ("לפי המחשבון, התוכן עולה לך היום",
     "לפי המחשבון למעלה, התוכן עולה לך היום"),
    ("זה מספיק לבערך 25 סרטונים שונים, ועם שינויים קטנים בעריכה ל-50 עד 60.",
     "זה מספיק לכמה רילים בחודש — בלי עלות פרילנס לכל סרטון."),
    ("<p>בערך <strong>200 עד 300 ₪ בחודש</strong> על הכלים: Claude, ‏HeyGen ו-ElevenLabs.</p>",
     "<p>בערך <strong>150 עד 400 ₪ בחודש</strong> על הכלים: Claude + Kie / כלי וידאו (לפי שימוש).</p>"),
    ('<h2 class="rv" style="text-align:center">מי שכבר <b>בנה איתי אווטאר</b></h2>',
     '<h2 class="rv" style="text-align:center">מי שכבר <b>עבד איתי על תוכן</b></h2>'),
]
for a, b in chat_fixes:
    html = html.replace(a, b)

# close-price duplicates in closing (if visible later)
html = html.replace('<div class="p">1,990 ₪ <span>+ מע"מ</span></div>',
                    '<div class="p">1,500 ₪ <span>+ מע"מ</span></div>')
html = html.replace('נרשמים עד יום שני? מקבלים גם שיעור אחד על אחד',
                    'נרשמים עכשיו? מקבלים ביקורת 1:1 על הריל הראשון')

# vplay duration
html = html.replace('<small>56 שניות</small>', '<small>דוגמה מהמותג</small>')

# aiLine default before video loads
html = html.replace(
    "$('aiLine').textContent = 'אני אומר את זה בגלוי, גם בסרטון שראית למעלה. וזה עובד.';",
    "$('aiLine').textContent = 'רילים מונפשים עוצרים גלילה — גם כשמסבירים שזה AI.';")

# calc once: animate av dots to 12 not 40
html = html.replace(
    "once($('calc'), () => [...da.children].forEach((d, i) => setTimeout(() => d.classList.add('on'), RM ? 0 : 300 + i * 35)), .25);",
    "once($('calc'), () => [...da.children].forEach((d, i) => setTimeout(() => d.classList.toggle('on', i < 12), RM ? 0 : 300 + i * 35)), .25);")

p.write_text(html, encoding="utf-8")
print("Patched", p, "→", len(html), "chars")
