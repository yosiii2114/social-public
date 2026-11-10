#!/usr/bin/env python3
from pathlib import Path
import re

legacy = Path(__file__).with_name("index-roei-legacy.html")
text = legacy.read_text(encoding="utf-8")
a = text.index("/* ===== the AI scan")
b = text.index("/* ===== the first screen on a phone")
scan = text[a:b]
css_path = Path(__file__).with_name("roei-sell.css")
with css_path.open("a", encoding="utf-8") as f:
    f.write(
        "\n"
        + scan
        + "\n.sell-roei .lab-sec{background:radial-gradient(70% 40% at 50% 0,rgba(255,79,180,.08) 0,transparent 72%) !important}\n"
        "#prog{position:fixed;top:0;left:0;right:0;height:3px;z-index:40;background:linear-gradient(90deg,#FF4FB4,#ffd60a);transform-origin:0 50%;transform:scaleX(0);pointer-events:none}\n"
    )
si = text.index("<script>", text.index("CONFIG"))
sj = text.rindex("</script>")
js = text[si + 8 : sj]
js = re.sub(r"/\* hero video.*?\}\)\(\);\s*", "", js, flags=re.S)
js = re.sub(
    r"  /\* before / after on the real footage:.*?\n  once\(ba,.*?\n",
    "",
    js,
    flags=re.S,
)
js = js.replace("observe($('hero'))", "observe(document.querySelector('.hero'))")
js = re.sub(
    r"/\* sticky bar:.*?\)\.observe\(\$\('tracks'\)\);",
    "/* sticky bar: page uses .sticky wa */",
    js,
    flags=re.S,
)
js = js.replace("const bar = $('bar')", "const bar = { classList: { toggle() {} } }")
js = js.replace("const prog = $('prog');", "const prog = document.getElementById('prog');")
js = js.replace(
    "prog.style.transform = 'scaleX('",
    "if (prog) prog.style.transform = 'scaleX('",
)
Path(__file__).with_name("roei-sell.js").write_text(
    "/* Roei sell mechanics on merged Funny Bunny landing */\n" + js, encoding="utf-8"
)
print("wrote roei-sell.js", len(js))
