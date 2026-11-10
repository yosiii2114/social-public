/* סדנת פאני באני — רילים + לפני/אחרי + סטיקי WA */
(function () {
  const WA = '972515688377';
  const wa = (t) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);

  /* רילים: סאונד בלחיצה, טעינה בגלילה */
  const vids = [...document.querySelectorAll('video[data-src]')];
  const vo = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          v.play()?.catch(() => {});
        } else v.pause();
      }),
    { threshold: 0.35 }
  );
  vids.forEach((v) => vo.observe(v));
  document.querySelectorAll('.vwrap').forEach((w) => {
    const v = w.querySelector('video');
    const snd = w.querySelector('.snd');
    if (!v) return;
    w.setAttribute('role', 'button');
    w.setAttribute('tabindex', '0');
    const icon = () => {
      if (snd) snd.textContent = v.muted ? '🔇' : '🔊';
    };
    const tog = (ev) => {
      ev.preventDefault();
      const turnOn = v.muted || v.paused;
      vids.forEach((o) => {
        if (o !== v) {
          o.muted = true;
          const s = o.parentNode.querySelector('.snd');
          if (s) s.textContent = '🔇';
        }
      });
      v.muted = !turnOn;
      icon();
      if (!v.src) v.src = v.dataset.src;
      if (v.paused) v.play()?.catch(() => {});
    };
    w.addEventListener('click', tog);
    w.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tog(e);
      }
    });
  });

  /* לפני / אחרי */
  const ba = document.getElementById('labBa');
  if (ba) {
    const raw = document.getElementById('baRaw');
    const ed = document.getElementById('baEdit');
    const grip = ba.querySelector('.ba-grip');
    const setP = (v) => {
      const n = Math.max(3, Math.min(97, v));
      const p = n.toFixed(1) + '%';
      ba.style.setProperty('--p', p);
      if (grip) grip.style.left = p;
      ba.setAttribute('aria-valuenow', String(Math.round(n)));
    };
    const fromX = (e) => {
      const r = ba.getBoundingClientRect();
      setP(((e.clientX - r.left) / r.width) * 100);
    };
    ba.addEventListener('pointerdown', (e) => {
      ba.setPointerCapture(e.pointerId);
      const pr = document.getElementById('baPrompt');
      if (pr) pr.style.display = 'none';
      fromX(e);
    });
    ba.addEventListener('pointermove', (e) => {
      if (ba.hasPointerCapture(e.pointerId)) fromX(e);
    });
    setP(6);
    if (raw && ed) {
      const syncT = () => {
        const dr = raw.duration;
        const de = ed.duration;
        if (!dr || !de || !Number.isFinite(dr) || !Number.isFinite(de)) return;
        const loop = Math.min(dr, de);
        const t = raw.currentTime % loop;
        if (Math.abs(ed.currentTime - t) > 0.12) ed.currentTime = t;
      };
      raw.addEventListener('timeupdate', syncT);
      ed.addEventListener('timeupdate', syncT);
      new IntersectionObserver(
        (es) => {
          const on = es[0].isIntersecting;
          [raw, ed].forEach((v) => {
            if (on) {
              if (v.preload === 'none') {
                v.preload = 'auto';
                v.load();
              }
              v.play()?.catch(() => {});
            } else v.pause();
          });
        },
        { threshold: 0.2 }
      ).observe(ba);
    }
  }

  /* סטיקי WA */
  const sticky = document.querySelector('.sticky');
  const heroBtn = document.querySelector('.hero .btn.wa');
  const fin = document.querySelector('.final');
  if (sticky && heroBtn && fin && 'IntersectionObserver' in window) {
    const seen = { hero: true, fin: false };
    const io2 = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.target === heroBtn) seen.hero = e.isIntersecting;
        else seen.fin = e.isIntersecting;
      });
      sticky.classList.toggle('hide', seen.hero || seen.fin);
    });
    io2.observe(heroBtn);
    io2.observe(fin);
    sticky.classList.add('hide');
  }

  document.querySelectorAll('[data-wa-msg]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A') return;
      e.preventDefault();
      const msg = el.getAttribute('data-wa-msg');
      if (msg) window.open(wa(msg), '_blank', 'noopener');
    });
  });
})();

(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  const sel =
    'main h2,.hint,.lead,.stats li,.marquee,.reels,.card,.shots,.steps li,.final .btn,.workshop-card,.audience article,.syl details,.faq details';
  const els = [...document.querySelectorAll(sel)].filter((el) => !el.closest('.collab-lanyard'));
  const lanyard = document.querySelector('.collab-lanyard');
  if (lanyard) lanyard.classList.remove('reveal');
  document.documentElement.classList.add('rv');
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        setTimeout(() => e.target.classList.add('done'), 1400);
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.12 }
  );
  els.forEach((el) => {
    const sibs = [...el.parentNode.children].filter((s) => s.tagName === el.tagName);
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 80 + 'ms');
    el.classList.add('reveal');
    io.observe(el);
  });
})();
