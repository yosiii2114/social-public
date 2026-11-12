<div dir="rtl" align="right">

# העלאה — GitHub → Vercel

**מדיניות (2026-11-12):** פרודקשן **רק** דרך `git push` ל־`main`.  
אין `vercel deploy --prod` מהמחשב בשגרה — CLI רק חירום / אבחון.

## מה יש ב-repo

| תיקייה | אתר |
|--------|-----|
| `funnybunny/` | נחיתה פאני באני |
| `yosef-animation/` | נחיתה יוסף אנימציה |
| `funny-bunny-course/` | נחיתת סדנת אנימציה AI |

גודל כולל ~28MB (כולל וידאו) — מתאים ל-GitHub רגיל.

---

## 0 — טוקן Vercel (גלובלי, בלי צ'אט)

מלא פעם אחת: **`C:\Users\yosef\.cursor\secrets\vercel.env`**

(פרטים: `my-ai-vault\system\כלים\vercel.md`)

אחרי מילוי: **«טוקן ב-vercel.env»**

---

## 1 — GitHub

מהתיקייה `projects/social-public`:

```bash
git init
git add .
git commit -m "נחיתות funnybunny + yosef-animation מ-zip"
```

ב-GitHub: **New repository** → שם למשל `social-public` → בלי README (כבר יש מקומי).

```bash
git remote add origin https://github.com/<USER>/social-public.git
git branch -M main
git push -u origin main
```

---

## 2 — Vercel (שני פרויקטים)

**פרויקט א — פאני באני**

1. [vercel.com/new](https://vercel.com/new) → Import את `social-public`
2. **Root Directory:** `funnybunny`
3. Framework: Other (סטטי)
4. Deploy  
5. שם מוצע ל-URL: `funnybunny` או `funny-bunny-landing`

**פרויקט ב — יוסף אנימציה**

1. שוב Import **אותו** repo
2. **Root Directory:** `yosef-animation`
3. Deploy  
4. שם מוצע: `yosef-animation`

**פרויקט ג — סדנת אנימציה**

1. Import **אותו** repo  
2. **Root Directory:** `funny-bunny-course`  
3. Deploy  
4. שם מוצע: `funny-bunny-course`

כל push ל-`main` מעדכן את **כל** הפרויקטים המחוברים לאותו repo.

### Root Directory חובה (אחרת 404)

| פרויקט Vercel | Root Directory |
|---------------|----------------|
| `funny-bunny-course` | `funny-bunny-course` |
| `funnybunny-landing` | `funnybunny` |
| `yosef-animation-landing` | `yosef-animation` |

Repo: `https://github.com/yosiii2114/social-public` (monorepo — **לא** 3 ריפואים נפרדים).

**Vercel API (2026-11-12):** שלושת הפרויקטים מחוברים ל-GitHub + `createDeployments: enabled` · Root Directory כבטבלה.

### זרימת עבודה יומית

```powershell
cd C:\Users\yosef\Desktop\my-ai-vault\projects\social-public
git add funny-bunny-course funnybunny yosef-animation   # לפי מה ששינית
git commit -m "..."
git push origin main
```

אחרי push — Vercel בונה אוטומטית (דקה–שתיים), ואז Ctrl+F5 באתר.

---

## 3 — אחרי Deploy

- לעדכן ביו IG לכתובות החדשות  
- לרשום ב-[[../../social/accounts/funny-bunny/CONTEXT|funny-bunny CONTEXT]]  
- Tab — אופציונלי redirect או להשאיר עד שמחליטים

---

## בדיקה מקומית

```bash
cd funnybunny
npx --yes serve .
```

פתח את הכתובת שמוצגת (בד"כ פורט 3000).

</div>
