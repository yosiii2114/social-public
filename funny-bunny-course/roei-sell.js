/* Roei sell mechanics on merged Funny Bunny landing */

/** מחירים קנוניים — מקור אמת לטקסטים ב-JS (הדף משקף באותו ניסוח) */
const PRICE = {
  workshopNet: 1500,
  workshopGross: 1770,
  clientReel: '900–1,500',
  clientReelTypical: 1500,
  clientPack3: 4500
};
const fmtClientReel = () => PRICE.clientReel + ' ₪';
const fmtClientTypical = () => '~' + PRICE.clientReelTypical.toLocaleString('en-US') + ' ₪';
const fmtClientPack3 = () => '~' + PRICE.clientPack3.toLocaleString('en-US') + ' ₪';
const fmtWorkshopGross = () => PRICE.workshopGross.toLocaleString('en-US') + ' ₪ כולל מע״מ';
const fmtWorkshopNet = () => PRICE.workshopNet.toLocaleString('en-US') + ' ₪ + מע״מ';
const PRICE_CLARIFY =
  `ממוצע אצלי ${fmtClientTypical()} לריל; הטווח 900–1,500 לפי אורך וסגנון. חבילת 3 ללקוח ${fmtClientPack3()}.`;

/* ===== what Roei fills in ===== */
const CONFIG = {
  video: '/v/hero-reel.mp4', poster: '/v/hero-reel.jpg',
  scanMesh: false, /* mesh.json = Roei demo; scan-a = אסף יצחקי מקור */
  grow: { workshop: '', coaching: '' },
  deadline: '2026-12-15T20:00:00+02:00',
  proof: [
    { value: 1000000, prefix: '', text: 'צפיות ב-30 יום · @funny_bunny.ai', img: '/proof/djs.jpg', note: 'המותר שכבר רץ' },
    { value: 293000, prefix: '', text: 'צפיות לריל בודד (דוגמה)', img: '/proof/bedouin2.jpg', note: 'ריל מהפייפליין' },
    { value: 13, prefix: '', text: 'לקוחות ששילמו על סרטון', img: '/img/og2.jpg', note: `ריל בודד ${fmtClientReel()} (ממוצע ${fmtClientTypical()}) · חבילת 3 ${fmtClientPack3()}` }
  ],
  testimonial: null,
  closing: null
};
const TRACKS = { workshop: 'סדנת אנימציה AI · ' + fmtWorkshopGross() + ' (' + fmtWorkshopNet() + ')' };
const CONSENT_VERSION = 'v1-2026-11-05';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = id => document.getElementById(id);
const fmt = n => Math.round(n).toLocaleString('en-US');
const WA_PHONE = '972515688377';
const waUrl = msg => 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg);
const WA_MSG = {
  hero: 'היי יוסף, ראיתי את דף הסדנה לאנימציה AI (פאני באני · ' + fmtWorkshopGross() + '). רוצה לשמוע על מקום בקבוצה ומועדים.',
  bar: 'היי יוסף, חזרתי מהדף של הסדנה. אפשר לשמוע מתי הקבוצה הבאה נפתחת?',
  pay1: 'היי יוסף, רוצה להירשם לסדנת אנימציה AI · תשלום אחד (' + fmtWorkshopGross() + ').',
  pay6: 'היי יוסף, רוצה להירשם לסדנת אנימציה AI · בתשלומים עד 6 (' + fmtWorkshopGross() + ').',
  calc: 'היי יוסף, הרצתי את המחשבון בדף. רוצה לשמוע איך למכור רילים ב־' + fmtClientReel() + ' לריל כמו בפאני באני.',
  lab: 'היי יוסף, ראיתי את הלפני/אחרי מהסטנדאפ בדף. רוצה ללמוד לעשות את זה ללקוחות שלי.',
  form: 'היי יוסף, רוצה פרטים על הסדנה לפני שאני נרשם.'
};
document.querySelectorAll('[data-wa]').forEach(a => {
  const k = a.dataset.wa;
  if (WA_MSG[k]) { a.href = waUrl(WA_MSG[k]); a.target = '_blank'; a.rel = 'noopener'; }
});

if ($('aiLine')) $('aiLine').textContent = `ריל בודד ללקוח ${fmtClientReel()} (ממוצע ${fmtClientTypical()}). חבילת 3 ${fmtClientPack3()}. הסדנה ${fmtWorkshopGross()}.`;
const priceClarify = $('priceClarify');
if (priceClarify) priceClarify.textContent = PRICE_CLARIFY;
const roiW = $('roiWorkshop'), roiC = $('roiClient');
if (roiW) roiW.textContent = fmtWorkshopGross();
if (roiC) roiC.textContent = fmtClientReel();


/* count-up helper (one rAF tween per number) */
function tween(el, to, ms = 900, suffix = '') {
  if (RM) { el.textContent = fmt(to) + suffix; return; }
  const from = parseFloat((el.dataset.v || '0')); const t0 = performance.now();
  el.dataset.v = to;
  (function f(t) { const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(from + (to - from) * e) + suffix; if (k < 1) requestAnimationFrame(f); })(t0);
}

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { threshold: .18 });
document.querySelectorAll('.sell-roei .rv').forEach(el => io.observe(el));
const once = (el, fn, th = .3) => {
  if (!el) return;
  new IntersectionObserver((es, o) => {
    es.forEach(e => { if (e.isIntersecting) { o.disconnect(); fn(); } });
  }, { threshold: th, rootMargin: '0px 0px -8% 0px' }).observe(el);
};

/* pain: one line at a time */
const painEl = $('pain');
if (painEl) once(painEl, () => [...painEl.children].forEach((p, i) => setTimeout(() => p.classList.add('on'), RM ? 0 : i * 650)));

/* calculator */
const dn = $('dots-now'), da = $('dots-av');
if (dn && da) for (let i = 0; i < 40; i++) { dn.appendChild(document.createElement('i')); da.appendChild(document.createElement('i')); }
function calc() {
  const cV = $('c-v'), cH = $('c-h'), cM = $('c-m');
  if (!cV || !cH || !cM) return;
  const v = +cV.value, h = +cH.value, m = +cM.value;
  [['c-v', 1, 30], ['c-h', 1, 16], ['c-m', 0, 3000]].forEach(([id, a, b]) => { const el = $(id); if (el) el.style.setProperty('--p', ((el.value - a) / (b - a) * 100) + '%'); });
  const oV = $('o-v'), oH = $('o-h'), oM = $('o-m');
  if (oV) oV.textContent = v;
  if (oH) oH.textContent = h;
  if (oM) oM.textContent = fmt(m) + ' ₪';
  const hours = v * h, money = v * m;
  if ($('r-h')) tween($('r-h'), hours, 500);
  if ($('r-m')) tween($('r-m'), money, 500);
  if ($('r-d')) tween($('r-d'), hours * 12 / 8, 500);
  if ($('r-y')) tween($('r-y'), money * 12, 500);
  if ($('s-v')) $('s-v').textContent = v;
  if ($('s-h')) $('s-h').textContent = fmt(hours);
  if ($('s-m')) $('s-m').textContent = fmt(money);
  const objM = $('obj-m'); if (objM) objM.textContent = fmt(money) + ' ₪';
  if (dn) [...dn.children].forEach((d, i) => d.classList.toggle('on', i < v));
  if (da) [...da.children].forEach((d, i) => d.classList.toggle('on', i < Math.min(15, Math.max(1, v + 4))));
}
if ($('c-v')) {
  ['c-v', 'c-h', 'c-m'].forEach(id => { const el = $(id); if (el) el.addEventListener('input', calc); });
  calc();
}
if (da) once($('calc'), () => {
  const cvEl = $('c-v');
  const n = cvEl ? Math.min(15, Math.max(4, +cvEl.value)) : 8;
  [...da.children].forEach((d, i) => setTimeout(() => d.classList.toggle('on', i < n), RM ? 0 : 300 + i * 35));
}, .25);

/* clone: 1 -> 30 */
const g = $('g36'), person = '<svg viewBox="0 0 60 60"><circle cx="30" cy="22" r="11" fill="#fff"/><path d="M8 58c2-14 11-21 22-21s20 7 22 21z" fill="#fff"/></svg>';
if (g) {
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
    const i = document.createElement('i'); i.innerHTML = person;
    i.style.transitionDelay = RM ? '0s' : (0.35 + Math.hypot(r - 2, c - 2.5) * 0.12).toFixed(2) + 's';
    g.appendChild(i);
  }
}
const stageEl = $('stage');
if (stageEl) once(stageEl, () => {
  stageEl.classList.add('go');
  const cnt = $('cnt'), cv = $('c-v');
  const target = cv ? Math.min(20, Math.max(4, +cv.value)) : 8;
  if (cnt) setTimeout(() => tween(cnt, target, 1400), RM ? 0 : 450);
}, .45);

/* machine: one step at a time; the line fills as steps come on */
const steps = [...document.querySelectorAll('#machine .step')];
const meterSegs = [...document.querySelectorAll('#stepsMeter i')];
const syncSteps = idx => {
  steps.forEach((s, i) => {
    s.classList.toggle('on', i === idx);
    s.classList.toggle('past', i < idx);
    s.classList.toggle('future', i > idx);
  });
  meterSegs.forEach((m, i) => {
    m.classList.toggle('on', i === idx);
    m.classList.toggle('past', i < idx);
  });
};
let typed = false, forty = false;
const machSec = $('machine');
const machClamp = (a, b, x) => Math.max(0, Math.min(1, (x - a) / (b - a)));
const onMachineScroll = () => {
  if (!machSec || !steps.length || RM) return;
  const r = machSec.getBoundingClientRect();
  const span = Math.max(innerHeight * 0.55, r.height - innerHeight * 0.45);
  const p = machClamp(0, 1, -r.top / span);
  const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
  syncSteps(idx);
  if (idx === 1 && !typed) { typed = true; const ty = $('type'); if (ty) typeIt(ty, 'למה לשלם ' + fmtClientReel() + ' על ריל — כשאפשר לייצר לבד?'); }
  if (idx === 4 && !forty && mini) { forty = true; [...mini.children].forEach((d, i) => setTimeout(() => d.classList.add('on'), RM ? 0 : i * 30)); }
};
const W = $('wave');
if (W) for (let i = 0; i < 28; i++) { const b = document.createElement('i'); b.style.setProperty('--h', (0.3 + Math.random() * 0.7).toFixed(2)); b.style.animationDelay = (i * 0.04).toFixed(2) + 's'; W.appendChild(b); }
const mini = $('mini');
if (mini) for (let i = 0; i < 10; i++) mini.appendChild(document.createElement('i'));
if (steps.length) {
  syncSteps(0);
  addEventListener('scroll', onMachineScroll, { passive: true });
  addEventListener('resize', onMachineScroll);
  requestAnimationFrame(onMachineScroll);
}
if (RM && steps.length) {
  steps.forEach(s => { s.classList.add('on'); s.classList.remove('future'); });
  meterSegs.forEach(m => m.classList.add('past'));
  const ty = $('type'); if (ty) ty.textContent = 'למה לשלם ' + fmtClientReel() + ' על ריל — כשאפשר ללמוד לייצר לבד?';
  if (mini) [...mini.children].forEach(d => d.classList.add('on'));
}
function typeIt(el, s) { if (!el) return; if (RM) { el.textContent = s; return; } let i = 0; (function t() { el.textContent = s.slice(0, ++i); if (i < s.length) setTimeout(t, 45); })(); }

/* ===== try it yourself ===== */
(() => {
  const wait = ms => new Promise(r => setTimeout(r, RM ? 0 : ms));
  const BIZ = [
    { n: 'ערוץ הומור', scan: 'בודק מה עובד ברילים קומיים דומים', t: 'הבדיחה שלך בטקסט לא מספיקה? תנפיש סטנדאפ לריל — כמו 1M בפיד.' },
    { n: 'פודקאסטר', scan: 'מחפש קטעים לריל 9:16', t: 'פרק שלם בפודקאסט → 60 שניות מצוירות עם הוק «שמע עכשיו».' },
    { n: 'יוצר AI', scan: 'מחבר רעיון לסטוריבורד', t: 'כבר יודע פרומפטים — בונים ריל שאפשר למכור מחר ב־' + fmtClientReel() + '.' },
    { n: 'פרילנסר תוכן', scan: 'משווה רילים שעבדו בנישה', t: 'במקום להסביר במילים — דמו חי מהתסריט לריל מוכן.' }
  ];
  const chips = $('labChips'), log = $('labLog'), out = $('labOut'), cap = $('labCap'), phone = $('labPhone'), pg = $('labPg'), wave = $('labWave');
  if (!chips || !log || !out || !cap || !phone || !pg || !wave) return;
  for (let i = 0; i < 18; i++) { const b = document.createElement('i'); b.style.setProperty('--h', (0.3 + ((i * 37) % 70) / 100).toFixed(2)); b.style.animationDelay = (i * 0.05).toFixed(2) + 's'; wave.appendChild(b); }
  let run = 0;
  async function go(i) {
    const me = ++run, b = BIZ[i], live = () => me === run;
    [...chips.children].forEach((c, k) => { c.classList.toggle('on', k === i); c.setAttribute('aria-pressed', k === i); });
    log.textContent = ''; out.textContent = ''; cap.textContent = ''; pg.style.transform = 'scaleX(0)'; phone.classList.remove('run', 'ready'); out.classList.add('typing');
    for (const line of [b.scan, 'בוחר את הרעיון הכי חזק', 'כותב תסריט בסגנון שלך']) {
      const li = document.createElement('li'); li.textContent = line; log.appendChild(li);
      await wait(620); if (!live()) return; li.classList.add('ok');
    }
    for (let k = 1; k <= b.t.length; k++) { out.textContent = b.t.slice(0, k); if (!RM) await wait(20); if (!live()) return; }
    out.classList.remove('typing'); phone.classList.add('run');
    const words = b.t.split(' ');
    for (let k = 0; k < words.length; k++) {
      const sp = document.createElement('span'); sp.textContent = words[k]; cap.replaceChildren(sp);
      pg.style.transform = 'scaleX(' + ((k + 1) / words.length).toFixed(3) + ')';
      await wait(290); if (!live()) return;
    }
    cap.textContent = ''; phone.classList.remove('run'); phone.classList.add('ready');
  }
  BIZ.forEach((b, i) => { const c = document.createElement('button'); c.type = 'button'; c.className = 'lab-chip'; c.textContent = b.n; c.onclick = () => go(i); chips.appendChild(c); });
  once($('labBiz'), () => go(0), .3);

})();

/* preview domain only: show where the real material will go (main domain: only real material, never empty) */
const PREVIEW = /preview|localhost/.test(location.hostname) || location.protocol === 'file:';
const BADGE = '<span class="ph-badge">תצוגה מקדימה בלבד. בדף הראשי החלק הזה מופיע רק כשיש חומר אמיתי.</span>';
const proofGrid = $('proofGrid');
if (PREVIEW && !CONFIG.proof.length && proofGrid) {
  [['כמה צפיות ב-30 יום', 'כאן ייכנס צילום מסך מהעמוד / אינסטגרם'],
   ['כמה אנשים ראו את הסרטונים בחודש אחד, בלי שקל על ממומן', 'כאן ייכנס צילום המסך: "חשבונות שנחשפו" מאינסטגרם, ולידו 0 ₪ על ממומן']].forEach(([t, ph]) => {
    const c = document.createElement('figure'); c.className = 'proof-card';
    c.innerHTML = '<div class="num ph">?</div><p></p><div class="ph-box"></div>';
    c.querySelector('p').textContent = t; c.querySelector('.ph-box').textContent = ph;
    proofGrid.appendChild(c);
  });
  proofGrid.insertAdjacentHTML('beforebegin', BADGE);
  const pr = $('proof'); if (pr) pr.hidden = false;
}
/* proof (only real screenshots) · Apple tiles: the number counts up huge, the screenshot rises in under it */
if (CONFIG.proof.length) {
  const sec = $('proof'), list = $('proofGrid');
  sec.classList.add('px'); list.className = 'px-list';
  CONFIG.proof.forEach((p, i) => {
    if (i) list.insertAdjacentHTML('beforeend', '<div class="px-sep" aria-hidden="true"></div>');
    const t = document.createElement('figure'); t.className = 'px-tile';
    t.innerHTML = '<div class="px-num"></div><span class="px-bar" aria-hidden="true"></span><p class="px-label"></p><div class="px-shot"><img loading="lazy" alt=""></div><small class="px-note"></small>';
    const n = t.querySelector('.px-num'); n.textContent = (p.prefix || '') + '0';
    t.querySelector('.px-label').textContent = p.text;
    const im = t.querySelector('img'); im.src = p.img; im.alt = p.text;
    t.querySelector('.px-note').textContent = p.note || '';
    list.appendChild(t);
    once(t, () => {
      sec.classList.add('lit'); t.classList.add('on');
      if (RM) { n.textContent = (p.prefix || '') + fmt(p.value); t.classList.add('px-done'); return; }
      const t0 = performance.now(), D = 2200;
      (function f(now) { const k = Math.min(1, (now - t0) / D), e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        n.textContent = (p.prefix || '') + fmt(p.value * e);
        if (k < 1) requestAnimationFrame(f); else t.classList.add('px-done'); })(t0);
    }, .35);
  });
  sec.hidden = false;
}
/* testimonial (only real, with permission) */
if (CONFIG.testimonial && CONFIG.testimonial.video) {
  const t = CONFIG.testimonial, v = document.createElement('video');
  Object.assign(v, { src: t.video, controls: true, playsInline: true, preload: 'none' }); if (t.poster) v.poster = t.poster;
  const p = document.createElement('p'); p.textContent = t.who || '';
  $('testiBox').append(v, p); $('testi').hidden = false;
}
/* closing video + "יש לי שאלה" on WhatsApp */
if (CONFIG.closing && CONFIG.closing.video) {
  const c = CONFIG.closing, v = document.createElement('video');
  Object.assign(v, { src: c.video, controls: true, playsInline: true, preload: 'none' }); if (c.poster) v.poster = c.poster;
  $('closingBox').append(v);
  $('waAsk').href = 'https://wa.me/972515688377?text=' + encodeURIComponent(c.waText);
  $('closing').hidden = false;
}

/* objections: reveal when chat block enters view */
const chatBox = $('chatBox');
const chatPairs = chatBox ? [...chatBox.querySelectorAll('.pair')] : [];
const revealChat = () => {
  chatPairs.forEach((pair, i) => {
    if (pair.classList.contains('q-on')) return;
    const run = () => {
      if (RM) { pair.classList.add('q-on', 'a-on'); return; }
      pair.classList.add('q-on');
      setTimeout(() => pair.classList.add('typing-on'), 350);
      setTimeout(() => { pair.classList.remove('typing-on'); pair.classList.add('a-on'); }, 1100);
    };
    setTimeout(run, i * 200);
  });
};
if (chatBox && chatPairs.length) {
  once(chatBox, revealChat, 0.18);
  setTimeout(() => chatPairs.forEach(p => { if (!p.classList.contains('q-on')) p.classList.add('q-on', 'a-on'); }), 2500);
}

/* countdown + closing */
const end = new Date(CONFIG.deadline).getTime();
function tick() {
  const left = Math.max(0, end - Date.now());
  const d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4);
  const cdD = $('cd-d'), cdH = $('cd-h'), cdM = $('cd-m');
  if (cdD) cdD.textContent = d;
  if (cdH) cdH.textContent = h;
  if (cdM) cdM.textContent = m;
  const barLeft = $('barLeft');
  if (barLeft) barLeft.textContent = left ? (d ? `נסגר בעוד ${d} ימים ו-${h} שעות` : `נסגר בעוד ${h} שעות ו-${m} דקות`) : 'ההרשמה נסגרה';
  if (!left) {
    document.querySelectorAll('[data-track]').forEach(b => { b.disabled = true; b.textContent = 'ההרשמה נסגרה'; });
    const n = $('nowBtn'); n.textContent = 'ההרשמה נסגרה. לכתוב לי בוואטסאפ'; n.href = 'https://wa.me/972515688377';
  }
}
tick(); setInterval(tick, 30000);

/* the price stage: the number counts up, the bonus ticket lands, its countdown is live (the real deadline) */
const pad2 = n => String(n).padStart(2, '0');
let tkT = 0;
function tkTick() {
  const left = Math.max(0, end - Date.now());
  $('tk-d').textContent = Math.floor(left / 864e5);
  $('tk-h').textContent = pad2(Math.floor(left % 864e5 / 36e5));
  $('tk-m').textContent = pad2(Math.floor(left % 36e5 / 6e4));
  $('tk-s').textContent = pad2(Math.floor(left % 6e4 / 1e3));
  if (!left) clearInterval(tkT);
}
tkTick(); tkT = setInterval(tkTick, 1000);
once($('bigPrice'), () => {
  if (RM) return;
  const n = $('bpN'), D = 1300, t0 = performance.now();
  (function f(now) { const k = Math.min(1, (now - t0) / D), e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    n.textContent = fmt(1500 * e); if (k < 1) requestAnimationFrame(f); })(t0);
}, .4);
const tk = $('ticket');
if (tk) {
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2, r = 130 + (i % 3) * 55, sp = document.createElement('i');
    sp.className = 'spk'; sp.setAttribute('aria-hidden', 'true');
    sp.style.setProperty('--x', (Math.cos(a) * r * 1.25).toFixed(0) + 'px'); sp.style.setProperty('--y', (Math.sin(a) * r).toFixed(0) + 'px');
    sp.style.setProperty('--c', ['#fff', '#ffd27a', '#FF8FB1', '#22B8A8'][i % 4]); sp.style.animationDelay = (.5 + (i % 5) * .05) + 's';
    tk.appendChild(sp);
  }
  if (RM) tk.classList.add('on'); else once(tk, () => tk.classList.add('on'), .3);
}

/* sticky bar: page uses .sticky wa */

/* register — ברירת מחדל: וואטסאפ (כמו yosef-animation) */
const dlg = $('dlg'), form = $('form');
let track = 'workshop', plan = '';
if (dlg && form) {
document.querySelectorAll('[data-track]').forEach(b => b.addEventListener('click', e => {
  e.preventDefault();
  track = b.dataset.track;
  const msg = b.dataset.plan === '6' ? WA_MSG.pay6 : WA_MSG.pay1;
  window.open(waUrl(msg), '_blank', 'noopener');
}));
document.querySelectorAll('[data-wa-form]').forEach(b => b.addEventListener('click', e => {
  e.preventDefault();
  track = 'workshop'; plan = ''; $('which').textContent = TRACKS.workshop; $('err').textContent = '';
  dlg.showModal(); setTimeout(() => $('f-name').focus(), 50);
}));
$('close').onclick = () => dlg.close();
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
form.addEventListener('submit', async e => {
  e.preventDefault();
  const err = $('err'), btn = $('submit');
  const name = $('f-name').value.trim(), phone = $('f-phone').value.trim();
  const digits = phone.replace(/\D/g, '').replace(/^972/, '0');
  if (name.length < 2) { err.textContent = 'רק השם, בבקשה.'; return; }
  if (!/^0\d{8,9}$/.test(digits)) { err.textContent = 'נראה שחסרה ספרה בטלפון.'; return; }
  if (!$('f-consent').checked) { err.textContent = 'צריך לאשר שליחת הודעות בוואטסאפ.'; return; }
  err.textContent = ''; btn.disabled = true; btn.textContent = 'שולח...';
  const msg = 'היי יוסף, נרשמתי לסדנת אנימציה AI.\nשם: ' + name + '\nטלפון: ' + phone + '\n' + (TRACKS[track] || '') + (plan || '');
  try {
    await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      name, phone, track, consent: true, consent_text: $('consentText').textContent,
      consent_version: CONSENT_VERSION, website: $('f-website').value }) });
  } catch (x) { /* static hosting */ }
  $('waPay').href = 'https://wa.me/972515688377?text=' + encodeURIComponent(msg);
  window.open($('waPay').href, '_blank');
  $('formBody').hidden = true; $('done').hidden = false;
  btn.disabled = false; btn.textContent = 'לשלוח ולפתוח וואטסאפ';
});
}

/* ===== the AI scan and the scroll reveals (Roei 08.11) ===== */
(() => {
  const clamp = (a, b, x) => Math.max(0, Math.min(1, (x - a) / (b - a)));
  const sec = $('scan'), box = $('scanBox'), imgA = $('scanA'), imgB = $('scanB'), cv = $('scanCv'), bar = $('scanBar'), wave = $('scanWave'), scanLines = $('scanLines');
  if (!sec || !box || !imgA || !imgB || !cv || !bar || !wave || !scanLines) return;
  const lines = [...scanLines.children];
  if (RM) { sec.classList.add('static'); lines.forEach(l => l.classList.add('on')); box.classList.add('done'); return; }
  wave.innerHTML = '<i></i>'.repeat(26);
  const bars = [...wave.children], ctx = cv.getContext('2d');
  let M = null, W = 0, H = 0, X = [], Y = [], Xa = [], Ya = [], Xb = [], Yb = [], mouth = new Set(), stage = -1, last = -1, tick = 0, near = false;
  const size = () => {
    const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    if (!M) {
      cv.width = W = Math.round(r.width * d); cv.height = H = Math.round(r.height * d);
      return;
    }
    cv.width = W = Math.round(r.width * d); cv.height = H = Math.round(r.height * d);
    const sx = W / M.w, sy = H / M.h; Xa = []; Ya = []; Xb = []; Yb = [];
    for (let i = 0; i < M.a.length; i += 2) { Xa.push(M.a[i] * sx); Ya.push(M.a[i + 1] * sy); Xb.push(M.b[i] * sx); Yb.push(M.b[i + 1] * sy); }
    X = Xa.slice(); Y = Ya.slice();
    const mx0 = Xa[61], mx1 = Xa[291], my0 = Ya[0] - H * .012, my1 = Ya[17] + H * .012;
    mouth = new Set(Xa.map((x, i) => (x > mx0 - 4 && x < mx1 + 4 && Ya[i] > my0 && Ya[i] < my1) ? i : -1).filter(i => i >= 0));
  };
  if (CONFIG.scanMesh) fetch('/v/mesh.json').then(r => r.json()).then(d => { M = d; size(); last = -1; paint(); }).catch(() => {});
  imgA.style.opacity = '1';
  imgB.style.opacity = '0';
  const inView = () => { const r = sec.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  const bootPaint = () => { last = -1; if (!tick) tick = requestAnimationFrame(paint); };
  function paint() {
    tick = 0;
    const r = sec.getBoundingClientRect(), span = r.height - innerHeight, p = clamp(0, 1, -r.top / span);
    if (Math.abs(p - last) < .0008) return; last = p;
    const st = p < .2 ? 0 : p < .5 ? 1 : p < .75 ? 2 : 3;
    if (st !== stage) { stage = st; lines.forEach((l, i) => l.classList.toggle('on', i === st)); box.classList.toggle('done', st === 3); }
    const revealB = clamp(0, .92, p);
    const bc = (revealB * 100).toFixed(2);
    imgA.style.clipPath = +bc > 2 ? `inset(0 0 ${bc}% 0 round 0)` : 'none';
    imgA.style.opacity = revealB > .88 ? (1 - clamp(.88, .98, p) * 8).toFixed(3) : '1';
    imgB.style.opacity = '1';
    bar.style.opacity = (revealB > .04 && revealB < .94) ? 1 : 0;
    bar.style.transform = 'translate3d(0,' + (revealB * cv.clientHeight).toFixed(1) + 'px,0)';
    const glow = clamp(.12, .5, p) * (1 - clamp(.55, .85, p));
    box.style.boxShadow = glow > 0.02
      ? `0 0 ${(40 + glow * 50).toFixed(0)}px rgba(255,196,60,${(0.25 + glow * 0.55).toFixed(2)})`
      : '';
    const talk = clamp(.5, .56, p) * (1 - clamp(.7, .75, p));
    wave.style.opacity = talk > .02 ? 1 : 0;
    if (talk > .02) bars.forEach((b, i) => { const v = .14 + .86 * Math.abs(Math.sin(p * 92 + i * .7) * Math.sin(p * 41 + i * .23)); b.style.transform = 'scaleY(' + (v * talk).toFixed(3) + ')'; });
    const yl = revealB * H, amp = H * .009 * talk;
    const drawGrid = (alpha) => {
      if (alpha <= 0.02 || W < 2) return;
      const step = Math.max(14, W / 14);
      ctx.globalAlpha = alpha;
      ctx.lineWidth = Math.max(0.6, W / 520);
      ctx.strokeStyle = '#FFC23C';
      for (let x = 0; x <= W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, yl); ctx.stroke();
      }
      for (let y = 0; y <= yl; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.fillStyle = '#fff';
      const q = Math.max(1.4, W / 360);
      for (let i = 0; i < 48; i++) {
        const px = ((i * 73 + p * 120) % 997) / 997 * W;
        const py = ((i * 41 + p * 90) % 631) / 631 * yl;
        ctx.fillRect(px - q / 2, py - q / 2, q, q);
      }
      ctx.globalAlpha = 1;
    };
    if (!M) {
      ctx.clearRect(0, 0, W, H);
      const ga = clamp(.22, .72, p) * (1 - clamp(.78, .96, p));
      drawGrid(Math.min(0.85, ga * 1.15));
      if (revealB > 0.04 && revealB < 0.94) {
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = 'rgba(255,196,60,.18)';
        ctx.fillRect(0, Math.max(0, yl - H * 0.05), W, H * 0.05);
        ctx.globalAlpha = 1;
      }
      return;
    }
    const m0 = clamp(.5, .72, p), m = m0 * m0 * (3 - 2 * m0);                                       // the mesh of his face morphs into the avatar's
    for (let i = 0; i < Xa.length; i++) { X[i] = Xa[i] + (Xb[i] - Xa[i]) * m; Y[i] = Ya[i] + (Yb[i] - Ya[i]) * m; }
    ctx.clearRect(0, 0, W, H);
    const a = clamp(.2, .24, p) * (1 - clamp(.74, .84, p));
    if (a <= 0) return;
    const yy = i => mouth.has(i) ? Y[i] + Math.sin(p * 150 + i) * amp : Y[i];
    ctx.globalAlpha = a; ctx.lineWidth = Math.max(.7, W / 620); ctx.strokeStyle = '#FFC23C'; ctx.beginPath();
    for (let k = 0; k < M.e.length; k += 2) { const u = M.e[k], v = M.e[k + 1]; if (Y[u] > yl || Y[v] > yl) continue; ctx.moveTo(X[u], yy(u)); ctx.lineTo(X[v], yy(v)); }
    ctx.stroke(); ctx.fillStyle = '#fff'; const q = Math.max(1.6, W / 330);
    for (let i = 0; i < X.length; i++) { if (Y[i] > yl) continue; ctx.fillRect(X[i] - q / 2, yy(i) - q / 2, q, q); }
    ctx.globalAlpha = 1;
  }
  const prog = document.getElementById('prog');
  const onScroll = () => {
    if ((near || inView()) && !tick) tick = requestAnimationFrame(paint);
    if (prog) prog.style.transform = 'scaleX(' + (scrollY / (document.documentElement.scrollHeight - innerHeight || 1)).toFixed(4) + ')';
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { size(); last = -1; onScroll(); });
  new IntersectionObserver(es => { near = es[0].isIntersecting; if (near) onScroll(); }, { rootMargin: '200px 0px' }).observe(sec);
  imgA.addEventListener('load', () => { size(); bootPaint(); });
  imgB.addEventListener('load', () => { size(); bootPaint(); });
  size();
  if (imgA.complete && imgB.complete) bootPaint();
  else addEventListener('load', () => { size(); bootPaint(); }, { once: true });
  requestAnimationFrame(bootPaint);
  // headlines rise word by word
  document.querySelectorAll('.sell-roei section h2.rv').forEach(h => {
    let n = 0;
    const word = t => { const o = document.createElement('span'), i = document.createElement('span'); o.className = 'w'; i.textContent = t; i.style.transitionDelay = (n++ * .07) + 's'; o.appendChild(i); return o; };
    const split = (src, dst) => [...src.childNodes].forEach(c => {
      if (c.nodeType === 3) c.textContent.split(/(\s+)/).forEach(t => dst.append(t && /\S/.test(t) ? word(t) : (t || '')));
      else if (c.nodeName === 'BR') dst.append(c.cloneNode());
      else { const e = c.cloneNode(false); split(c, e); dst.append(e); }
    });
    const f = document.createDocumentFragment(); split(h, f); h.textContent = ''; h.append(f); h.classList.add('wd');
  });
  // cards: one family of entrances, staggered
  const fx = (sel, kind, st = 0) => { let n = 0; document.querySelectorAll('.sell-roei ' + sel).forEach(el => { if (!el.classList.contains('rv')) { el.classList.add('rv'); io.observe(el); } el.classList.add('fx-' + kind); if (st) el.style.transitionDelay = (n++ * st).toFixed(2) + 's'; }); };
  fx('.inputs', 'tilt'); fx('.burn', 'zoom'); fx('.vs .side', 'zoom', .12); fx('.outcome>div', 'side', .1); fx('.syl-item', 'up', .05); fx('.both li', 'side', .04);
  const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); cio.unobserve(e.target); } }), { rootMargin: '-8% 0px' });
  const tracksSec = $('tracks'); if (tracksSec) { tracksSec.classList.add('curtain'); cio.observe(tracksSec); }
  document.querySelectorAll('.sell-roei section .eyebrow').forEach(e => {
    const t = e.textContent; e.setAttribute('aria-label', t); e.textContent = '​';
    once(e, () => { let i = 0; e.classList.add('typing'); const id = setInterval(() => { e.textContent = t.slice(0, ++i); if (i >= t.length) { clearInterval(id); setTimeout(() => e.classList.remove('typing'), 900); } }, 42); }, .6);
  });
  // the calculator's sliders run to their values on arrival, stop as soon as he touches one
  const cV = $('c-v');
  if (cV) once(cV, () => {
    const R = [['c-v', 1], ['c-h', 1], ['c-m', 0]].map(([id, a]) => { const e = $(id); return [e, a, +e.value]; });
    let t0 = 0, stop = false; R.forEach(([e]) => e.addEventListener('pointerdown', () => stop = true, { once: true }));
    const step = t => { if (stop) return; t0 = t0 || t; const k = clamp(0, 1, (t - t0) / 1100), v = 1 - Math.pow(1 - k, 3); R.forEach(([e, a, b]) => { e.value = a + (b - a) * v; }); calc(); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, .5);
})();
