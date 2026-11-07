<div dir="rtl" align="right">

# העלאה — GitHub → Vercel

## מה יש ב-repo

| תיקייה | אתר |
|--------|-----|
| `funnybunny/` | נחיתה פאני באני |
| `yosef-animation/` | נחיתה יוסף אנימציה |

גודל כולל ~28MB (כולל וידאו) — מתאים ל-GitHub רגיל.

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

כל push ל-`main` מעדכן **את שני** הפרויקטים (אם שניהם מחוברים לאותו repo).

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
