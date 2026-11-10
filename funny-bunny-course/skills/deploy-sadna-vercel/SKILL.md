---
name: deploy-sadna-vercel
description: פריסת דף סדנת האנימציה (funny-bunny-course) ל-Vercel — גרסה מקצועית vs פאני באני.
---

# פריסה · אתר סדנה → Vercel

## כישורים (ללא טוקן בקובץ זה)

| שדה | ערך |
|-----|-----|
| **Production URL** | https://funny-bunny-course.vercel.app |
| **Vercel project** | `funny-bunny-course` (team/user: `yosef21`) |
| **GitHub repo** | `yosiii2114/social-public` · Root: `funny-bunny-course` |
| **טוקן CLI** | `C:\Users\yosef\.cursor\secrets\vercel.env` → `VERCEL_TOKEN` |
| **תיקיית קוד** | `C:\Users\yosef\Desktop\my-ai-vault\projects\social-public\funny-bunny-course\` |
| **Env vars בפרויקט** | אין (אתר סטטי) |
| **הגנת פריסה** | Deployment Protection פעילה — לבדיקות אוטומציה: `vercel curl` או Bypass Secret בדשבורד |

## איזו גרסה לפרוס

| מקור | שימוש |
|------|--------|
| **גרסה מקצועית** (ברירת מחדל production) | `אתר סדנה - גרסה מקצועית.zip` — `pro.css`, מיתוג **יוסף אחדות** + תמונת פרופיל |
| **גרסת פאני באני** | `אתר סדנה - גרסת פאני באני.zip` — לוגו **פאני באני**, בלי `pro.css` |
| עותק שמור בפרויקט | `variants/funny-bunny-brand/` |

### עדכון קוד מה-ZIP (שומר מסמכי vault)

```powershell
$src = "<path-to-extracted>\sadna-pro"   # מתוך ZIP מקצועי
$dst = "C:\Users\yosef\Desktop\my-ai-vault\projects\social-public\funny-bunny-course"
Copy-Item "$src\index.html","$src\styles.css","$src\pro.css","$src\script.js","$src\lanyard.*","$src\vercel.json" -Destination $dst -Force
Copy-Item "$src\f","$src\img","$src\v" -Destination $dst -Recurse -Force
# אל תדרוס: CONTEXT.md, log.md, decisions.md, docs-package/, עדכון שני/, memory/, deliverables/
```

## פריסה ידנית (CLI)

```powershell
$env:VERCEL_TOKEN = (Get-Content "$env:USERPROFILE\.cursor\secrets\vercel.env" | Where-Object { $_ -match '^VERCEL_TOKEN=' }).Split('=',2)[1]
cd C:\Users\yosef\Desktop\my-ai-vault\projects\social-public\funny-bunny-course
npx --yes vercel@latest deploy --prod --yes --token $env:VERCEL_TOKEN
```

## פריסה דרך Git

Push ל-`main` ב-`social-public` → Vercel מפריס אוטומטית את `funny-bunny-course/`.

## בדיקה מקומית

```powershell
cd funny-bunny-course
npx --yes serve -l 3002 .
```

## קישורים

- דשבורד: https://vercel.com/yosef21/funny-bunny-course
- מדריך כללי: `projects/social-public/DEPLOY.md`
- שירות סגירת סשן: `deliverables/2026-11-אתר-סדנה/`
