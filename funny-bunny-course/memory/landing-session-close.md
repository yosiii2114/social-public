# מוח קצר · סגירת סשן דף סדנה (2026-11-10)

← [[../CONTEXT|CONTEXT]] · [[landing-session-close]]

## מחירים (אל תערבב)

| סוג | ערך |
|-----|-----|
| סדנה | 1,770 ₪ כולל מע״מ |
| ריל ללקוח | 900–1,500 ₪ (טווח) |
| ממוצע | ~1,500 ₪ לריל |
| חבילת 3 | ~4,500 ₪ (לא 1,500!) |

מקור קוד: `PRICE` ב־`roei-sell.js` · טקסט: `#priceClarify` ליד `#tracks`.

## דמוים בדף

| אזור | לפני | אחרי |
|------|------|------|
| `#beforeafter` | `ba_raw.mp4` (סטנדאפ / יוטיוב בדואי) | `bedouin2.mp4` — סליידר Reveal |
| `#scan` | אסף יצחקי (מקור) | still מ־`djs.mp4` + פס סריקה + clip בגלילה |
| mesh.json של רועי | **לא** לאבי — `scanMesh: false` או רשת פרוצדורלית |

## מלכודות

- **אל תריץ** `merge-roei-into-index.py` / `extract-roei.py` בלי לשחזר תיקוני JS (guards, PRICE, chat, `once()`).
- `roei-sell.css` על `.lab-ba` — רק ל־`.sell-roei .lab-sec`; לא לדחוף על `#beforeafter` בראש.
- `100vw` על `#tracks` בתוך RTL שובר מרכוז — ראה `course-unified.css`.
- צ'אט FAQ: טקסט על בועה לבנה + `once()` threshold — בדוק אחרי שינוי CSS גלובלי `--ink`.
- ZIP / תצוגה: **`npx serve`** — לא `file://`.

## ארכיון שולחן עבודה

`C:\Users\yosef\Desktop\אתר סדנא.zip` (~40 MB, 110 קבצים) — קוד + `docs-package/` + `עדכון שני/`. לא מועתק ל-vault (גודל).
