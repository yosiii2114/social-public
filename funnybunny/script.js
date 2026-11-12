/* Funny Bunny landing — video behaviour.
   Each reel is stored as a few small parts (media/<name>.mp4.part0..N) because the
   host takes files up to ~900 KB. The script joins the parts into one video when the
   reel scrolls into view. If you host elsewhere, you can instead put a normal
   src="media/<name>.mp4" on the <video> and the script will just use it. */
(function(){
  var wraps=[].slice.call(document.querySelectorAll('.vwrap'));
  var vids=wraps.map(function(w){return w.querySelector('video');});

  function load(v){
    if(v._loading) return v._loading;
    if(v.getAttribute('src')||!v.dataset.parts){ v._loading=Promise.resolve(); return v._loading; }
    var base=v.dataset.parts, n=parseInt(v.dataset.count,10)||0, reqs=[];
    v.parentNode.classList.add('loading');
    for(var i=0;i<n;i++){ reqs.push(fetch(base+i).then(function(r){ if(!r.ok) throw new Error(r.status); return r.arrayBuffer(); })); }
    v._loading=Promise.all(reqs).then(function(bufs){
      v.src=URL.createObjectURL(new Blob(bufs,{type:'video/mp4'}));
      v.parentNode.classList.remove('loading');
    }).catch(function(){ v.parentNode.classList.remove('loading'); v._loading=null; });
    return v._loading;
  }
  function play(v){ var p=v.play(); if(p&&p.catch) p.catch(function(){ if(!v.muted){ v.muted=true; icon(v); v.play().catch(function(){}); } }); }
  function icon(v){ var w=v.parentNode; w.querySelector('.snd').textContent=v.muted?'🔇':'🔊'; w.setAttribute('aria-label',v.muted?'הפעלת סאונד':'השתקה'); }

  wraps.forEach(function(w){
    var v=w.querySelector('video');
    w.setAttribute('role','button'); w.setAttribute('tabindex','0'); w.setAttribute('aria-label','הפעלת סאונד');
    function toggle(){
      var turnOn=v.muted||v.paused;
      vids.forEach(function(o){ if(o!==v && !o.muted){ o.muted=true; icon(o); } });
      v.muted=!turnOn; icon(v);
      if(v.readyState>0){ if(v.paused) play(v); }
      else { var l=load(v); if(l) l.then(function(){ play(v); }); }
    }
    w.addEventListener('click',toggle);
    w.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } });
  });

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){
      var v=e.target;
      if(e.isIntersecting && e.intersectionRatio>=0.5){ var l=load(v); if(l) l.then(function(){ if(v._visible) play(v); }); v._visible=true; }
      else { v._visible=false; if(!v.paused) v.pause(); }
    }); },{threshold:[0,0.5,1]});
    vids.forEach(function(v){ io.observe(v); });
  } else { vids.forEach(function(v){ load(v).then(function(){ play(v); }); }); }

  /* Floating WhatsApp button on phones: hidden while the hero button or the final CTA is on screen. */
  var sticky=document.querySelector('.sticky'), hero=document.querySelector('.hero .btn.wa'), fin=document.querySelector('.final');
  if(sticky && hero && fin && 'IntersectionObserver' in window){
    var seen={hero:true,fin:false};
    var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.target===hero) seen.hero=e.isIntersecting; else seen.fin=e.isIntersecting; }); sticky.classList.toggle('hide',seen.hero||seen.fin); });
    io2.observe(hero); io2.observe(fin);
    sticky.classList.add('hide');
  }
})();

/* Dreamy scroll-reveal: sections fade and slide up as they come into view.
   Skipped for people who turn off animations; without JS everything is simply visible. */
(function(){
  var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || !('IntersectionObserver' in window)) return;
  var sel='main h2,.hint,.lead,.stats li,.marquee,.reels,.card,.quotes blockquote,.shots,.steps li,.final .btn,.ai-box,.ai-card,.ai-btns';
  var els=[].slice.call(document.querySelectorAll(sel)).filter(function(el){
    return !el.closest('.hero h1') && !el.closest('.collab-lanyard');
  });
  /* Partner lanyard rail is always visible (no fade-out on load). */
  var lanyard=document.querySelector('.collab-lanyard');
  if(lanyard){ lanyard.classList.remove('reveal'); }
  document.documentElement.classList.add('rv');
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){
    if(!e.isIntersecting) return;
    var el=e.target; el.classList.add('in'); io.unobserve(el);
    setTimeout(function(){ el.classList.add('done'); }, 1400);
  }); },{rootMargin:'0px 0px -6% 0px',threshold:0.12});
  els.forEach(function(el){
    var sibs=[].slice.call(el.parentNode.children).filter(function(s){ return s.tagName===el.tagName; });
    el.style.setProperty('--d', Math.min(sibs.indexOf(el),5)*80+'ms');
    el.classList.add('reveal'); io.observe(el);
  });
})();
