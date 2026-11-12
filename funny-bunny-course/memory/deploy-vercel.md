# deploy · סדנת אנימציה

**Production:** https://funny-bunny-course.vercel.app  
**פרויקט Vercel:** `funny-bunny-course` (yosef21)  
**מקור פרודקשן:** `variants/professional/` (= ZIP «גרסה מקצועית») → שורש הפרויקט לפני deploy

## סטייג'ינג (Tab.bot — עובד מלא)
- https://sadna-funnybunny.sites.tab.bot/
- https://sadna-funnybunny-v1.sites.tab.bot/

## 404 על `funny-bunny-course.vercel.app` (2026-11-10)

**תסמין:** דף Vercel `NOT_FOUND`, בעוד `funny-bunny-course-yosef21.vercel.app` עובד.  
**סיבה:** דומיין הפרויקט לא היה מצביע לדיפלוי עם `index.html` (דיפלוי Git קצר מ־שורש repo בלי Root Directory, או alias שבור אחרי שני production ברצף).  
**תיקון:** `cd funny-bunny-course` → `npx vercel deploy --prod --yes` (טוקן מ־`vercel.env`). או `vercel alias set <deployment-url> funny-bunny-course.vercel.app`.  
**מניעה:** ב־Vercel → Project Settings → **Root Directory** = `funny-bunny-course` (repo `yosiii2114/social-public`).

## באג נפוץ (2026-11-10)
מדיה הייתה תחת **`v/v/`** במקום **`v/`** → 404 ב־`h_djs.mp4`, `ba_o.mp4`, `img/yosef_c.webp`, קליפים ב־ring.  
תיקון: סנכרון מלא מ־ZIP מקצועית + deploy.

## ZIPים (ארכיון)
`deliverables/2026-11-אתר-סדנה/archives/`
- `אתר סדנה - גרסה מקצועית.zip` → `variants/professional/`
- `אתר סדנה - גרסת פאני באני.zip` → `variants/funny-bunny-brand/`

## צ'קליסט נכסים לפני deploy
- [ ] `v/h_*.mp4`, `v/p_*.jpg`, `v/ba_*.mp4`, `v/c_*.jpg`, `v/r_*.mp4` — ישירות תחת `v/` (לא `v/v/`)
- [ ] `img/yosef_c.webp`, `img/c_*.webp`, `f/heebo-*.woff2`
- [ ] `curl -I` על 3–5 נתיבים אחרי deploy

## פריסה
```powershell
cd C:\Users\yosef\Desktop\my-ai-vault\projects\social-public\funny-bunny-course
# VERCEL_TOKEN מ־~\.cursor\secrets\vercel.env
npx --yes vercel@latest deploy --prod --yes --token $env:VERCEL_TOKEN
```

או push ל־`main` ב־`social-public` (Root Directory: `funny-bunny-course`) — **רק אחרי `git add` לכל `v/` ו־`img/``.

`.vercelignore` — לא מעלה variants/docs, לא מעלה קבצי dev ישנים ב־`v/`.

Skill: `skills/deploy-sadna-vercel/SKILL.md`
