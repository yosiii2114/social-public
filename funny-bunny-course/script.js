/* פאני באני · סדנת אנימציה AI */
(function(){
'use strict';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(id){return document.getElementById(id)};
var fmt=function(n){return Math.round(n).toLocaleString('en-US')};
/* canonical prices (decisions.md) */
/* ONE source of truth for every number on the page (decisions.md + יוסף, 9.11.2026) */
var PRICE={"workshopGross": 1770, "workshopNet": 1500, "reelMin": 900, "reelMax": 1500, "packCount": 3, "seats": 8, "views30d": "1M", "toolsMin": 150, "toolsMax": 400};
PRICE.packMin=PRICE.reelMin*PRICE.packCount;PRICE.packMax=PRICE.reelMax*PRICE.packCount;
var payback=function(price){return Math.ceil(PRICE.workshopGross/price)};
var VAL={workshop:fmt(PRICE.workshopGross)+' ₪',workshopNet:fmt(PRICE.workshopNet)+' ₪',reel:fmt(PRICE.reelMin)+'–'+fmt(PRICE.reelMax)+' ₪',reelMin:fmt(PRICE.reelMin)+' ₪',reelMax:fmt(PRICE.reelMax)+' ₪',
  pack:fmt(PRICE.packMin)+'–'+fmt(PRICE.packMax)+' ₪',packRange:fmt(PRICE.packMin)+'–'+fmt(PRICE.packMax),views:PRICE.views30d,seats:String(PRICE.seats),payback:String(payback(PRICE.reelMin)),tools:PRICE.toolsMin+'–'+PRICE.toolsMax+' ₪',twoMin:fmt(2*PRICE.reelMin)+' ₪'};
document.querySelectorAll('[data-p]').forEach(function(el){var v=VAL[el.dataset.p];if(v==null)return;var cur=/ ₪$/.test(v);el.innerHTML='<bdi dir="ltr">'+(cur?v.slice(0,-2):v)+'</bdi>'+(cur?' ₪':'');});
document.querySelectorAll('[data-p-num]').forEach(function(el){el.textContent=fmt(PRICE[el.dataset.pNum]);});

/* lazy videos: load + play only when visible */
var lazy=[].slice.call(document.querySelectorAll('video.lazyv'));
if('IntersectionObserver' in window){
  var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;
    if(e.isIntersecting){if(!v.getAttribute('src')){v.src=v.dataset.src;} if(!RM||v.closest('.reel')) {var p=v.play();if(p&&p.catch)p.catch(function(){});}}
    else{v.pause();}
  })},{rootMargin:'120px 0px',threshold:.15});
  lazy.forEach(function(v){vo.observe(v)});
}else lazy.forEach(function(v){v.src=v.dataset.src});

/* reels: tap = sound on (one at a time) */
document.querySelectorAll('.reel .phone').forEach(function(ph){
  var v=ph.querySelector('video'),s=ph.querySelector('.snd');
  ph.setAttribute('role','button');ph.setAttribute('tabindex','0');ph.setAttribute('aria-label',(v.getAttribute('aria-label')||'')+' · הקשה להפעלת קול');
  var tog=function(){
    var on=v.muted||v.paused;
    document.querySelectorAll('video').forEach(function(o){if(o!==v){o.muted=true;}});
    document.querySelectorAll('.reel .snd').forEach(function(x){x.textContent='קול'});
    var bs=$('baSnd');if(bs){bs.textContent='הפעלת קול';bs.setAttribute('aria-pressed','false');}
    if(!v.getAttribute('src'))v.src=v.dataset.src;
    v.muted=!on; if(s)s.textContent=v.muted?'קול':'השתק';
    var p=v.play();if(p&&p.catch)p.catch(function(){});
  };
  ph.addEventListener('click',tog);
  ph.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tog();}});
});

/* before / after slider: two <video> of the same small clip (left half = original, right half = animation), CSS clip-path reveal. No canvas, no seeking loop; iOS-safe watchdog. */
var ba=$('ba');
if(ba){
  var vA=$('baA'),vB=$('baB'),vids=[vA,vB],touched=false,cur=0,visible=false,want=false;
  var setP=function(n){cur=Math.max(0,Math.min(100,n));ba.style.setProperty('--p',cur.toFixed(1)+'%');ba.setAttribute('aria-valuenow',String(Math.round(cur)));ba.classList.toggle('is-anim',cur>50);};
  var fromX=function(e){var r=ba.getBoundingClientRect();setP((e.clientX-r.left)/r.width*100);};
  var dragging=false;
  var playOne=function(v){if(!v||!want)return;try{var p=v.play();if(p&&p.catch)p.catch(function(){});}catch(_){}};
  var playAll=function(){want=true;vids.forEach(playOne);};
  var pauseAll=function(){want=false;vids.forEach(function(v){try{v.pause()}catch(_){}});};
  ba.addEventListener('pointerdown',function(e){if(e.target.closest('.snd-btn'))return;dragging=true;touched=true;ba.classList.add('touched');try{ba.setPointerCapture(e.pointerId)}catch(_){}fromX(e);if(visible)playAll();});
  ba.addEventListener('pointermove',function(e){if(dragging)fromX(e);});
  ['pointerup','pointercancel'].forEach(function(t){ba.addEventListener(t,function(){dragging=false;})});
  ba.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){setP(cur-5);touched=true}else if(e.key==='ArrowRight'){setP(cur+5);touched=true}});
  setP(0);
  /* recover once per event, never in a loop */
  vids.forEach(function(v){
    var t=0;
    var nudge=function(){if(!want||!visible)return;var n=Date.now();if(n-t<800)return;t=n;playOne(v);};
    v.addEventListener('pause',nudge);v.addEventListener('stalled',nudge);v.addEventListener('waiting',nudge);v.addEventListener('suspend',function(){if(v.paused)nudge();});
    v.addEventListener('ended',function(){if(want){try{v.currentTime=0}catch(_){}playOne(v);}});
  });
  /* watchdog: if currentTime stops advancing for 1.5 s while visible, play() once; keep B gently locked to A by playbackRate (no seeking unless far off) */
  var lastT=[-1,-1],lastMove=[0,0];
  setInterval(function(){
    if(!want||!visible||document.hidden)return;var now=Date.now();
    vids.forEach(function(v,i){var ct=v.currentTime;if(ct!==lastT[i]){lastT[i]=ct;lastMove[i]=now;}else if(now-lastMove[i]>1500){lastMove[i]=now;playOne(v);}});
    var D=vA.duration;if(!(D>0)||vA.paused||vB.paused)return;
    var d=vB.currentTime-vA.currentTime;if(d>D/2)d-=D;else if(d<-D/2)d+=D;
    if(Math.abs(d)>0.6){try{vB.currentTime=vA.currentTime}catch(_){}vB.playbackRate=1;}
    else if(Math.abs(d)>0.05){vB.playbackRate=d>0?0.94:1.06;}
    else if(vB.playbackRate!==1){vB.playbackRate=1;}
  },500);
  var hinted=false;
  var demo=function(){ if(hinted||touched||RM)return;hinted=true;var t0=null;
    var f=function(ts){if(touched)return;if(!t0)t0=ts;var k=(ts-t0)/2600;if(k>1){setP(0);return;}setP(Math.sin(k*Math.PI)*58);requestAnimationFrame(f);};
    setTimeout(function(){requestAnimationFrame(f)},700);};
  new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible){playAll();demo();}else pauseAll();},{rootMargin:'120px 0px',threshold:0}).observe(ba);
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&visible)playAll();});
  var sb=$('baSnd');
  if(sb)sb.addEventListener('click',function(e){e.stopPropagation();var on=vA.muted;
    document.querySelectorAll('video').forEach(function(o){o.muted=true});document.querySelectorAll('.reel .snd').forEach(function(x){x.textContent='קול'});
    vB.muted=true;vA.muted=!on;sb.textContent=on?'השתקה':'הפעלת קול';sb.setAttribute('aria-pressed',on?'true':'false');if(visible||on)playAll();});
}

/* scroll-driven: scan + pain + machine + sticky */
var scan=$('scan'),frame=$('scanFrame'),pct=$('scanPct'),sSteps=[].slice.call(document.querySelectorAll('#scanSteps li'));
var pls=[].slice.call(document.querySelectorAll('.pl'));
var sts=[].slice.call(document.querySelectorAll('#steps .st')),meter=[].slice.call(document.querySelectorAll('#meter i'));
var ticking=false;
var clamp=function(x){return Math.max(0,Math.min(1,x))};
var onScroll=function(){ticking=false;var vh=innerHeight;
  if(scan&&frame&&!RM){var r=scan.getBoundingClientRect();var p=clamp((-r.top)/(r.height-vh));
    var s=clamp((p-.08)/.8);frame.style.setProperty('--s',s.toFixed(4));frame.style.setProperty('--done',s>=1?1:0);
    if(pct)pct.textContent=Math.round(s*100)+'%';frame.classList.toggle('is-done',s>=1);var ss=$('scanState');if(ss)ss.textContent=s>=1?'✓ הריל מוכן':(s>.02?'מנפיש בפיקסר תלת מימדי...':'סורק סטנדאפ...');
    var idx=Math.min(sSteps.length-1,Math.floor(p*sSteps.length*1.02));sSteps.forEach(function(li,i){li.classList.toggle('on',i<=idx)});}
  pls.forEach(function(el){var r=el.getBoundingClientRect();el.classList.toggle('on',r.top<vh*.72);});
  if(sts.length){var a=-1;sts.forEach(function(el,i){var r=el.getBoundingClientRect();if(r.top<vh*.6)a=i;});
    if(innerWidth>=900){var mr=$('machine').getBoundingClientRect();if(mr.top<vh*.5){a=Math.min(sts.length-1,Math.floor(clamp((vh*.5-mr.top)/(mr.height*.7))*sts.length));}}
    sts.forEach(function(el,i){el.classList.toggle('on',i===a);el.classList.toggle('past',i<a)});
    meter.forEach(function(m,i){m.classList.toggle('on',i<=a)});}
};
var req=function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll);}};
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);onScroll();
if(RM){if(frame){frame.style.setProperty('--s',1);frame.classList.add('is-done');if(pct)pct.textContent='100%';}pls.forEach(function(e){e.classList.add('on')});sts.forEach(function(e){e.classList.add('past')});}

/* money machine (2 tabs) */
var mV=$('mV'),mP=$('mP');
if(mV&&mP){
  var mode='biz',lastNum=0,tw0=0;
  var T={biz:{v:'כמה סרטונים העסק צריך בחודש?',p:'כמה סטודיו או פרילנסר גובה לסרטון?',out:'מה שנשאר אצלך כל חודש במקום לשלם לסטודיו',unit:'סרטונים',wa:'biz',dv:4},
         earn:{v:'כמה רילים אתה מוכר בחודש?',p:'כמה אתה גובה לריל?',out:'ההכנסה החודשית שלך מרילים',unit:'רילים',wa:'earn',dv:3}};
  var fill2=function(el){el.style.setProperty('--v',((el.value-el.min)/(el.max-el.min)*100)+'%')};
  var moods=['','','','',''];
  var coin=function(){var c=$('coins');if(!c||RM)return;for(var i=0;i<4;i++){var b=document.createElement('b');b.textContent='₪';b.style.setProperty('--dx',(Math.random()*80-40)+'px');b.style.setProperty('--r',(Math.random()*90-45)+'deg');b.style.animationDelay=(i*.08)+'s';c.appendChild(b);setTimeout(function(x){return function(){x.remove()}}(b),1300);}};
  var anim=function(to){var el=$('outNum');var from=lastNum;lastNum=to;if(RM){el.textContent=fmt(to);return;}var t0=performance.now();tw0=t0;var f=function(ts){if(tw0!==t0)return;var k=Math.min(1,(ts-t0)/600);k=1-Math.pow(1-k,3);el.textContent=fmt(from+(to-from)*k);if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);};
  var run=function(pop){var t=T[mode],v=+mV.value,p=+mP.value,tot=v*p;[mV,mP].forEach(fill2);
    $('oV').textContent=v;$('oP').textContent=fmt(p)+' ₪';$('lblV').textContent=t.v;$('lblP').textContent=t.p;$('outLbl').textContent=t.out;
    anim(tot);$('outYear').textContent='בשנה: '+fmt(tot*12)+' ₪';
    $('mmX').textContent=payback(p);$('mmPunch').innerHTML='הסדנה ('+VAL.workshop+') החזירה את עצמה אחרי <b id="mmX">'+payback(p)+'</b> '+t.unit;
    var lvl=Math.min(4,Math.floor(tot/3000));$('mmMood').textContent=moods[lvl];$('mmState').textContent=lvl>=3?'משתלם':'מחשב...';
    var bn=$('mmBunny');bn.style.transform='scale('+(0.9+lvl*0.06)+')';
    if(pop){bn.classList.remove('pop');void bn.offsetWidth;bn.classList.add('pop');coin();}
    var cta=document.querySelector('.mm-cta a');if(cta){cta.href=document.querySelector('.trk[data-wa="'+t.wa+'"]').href;cta.dataset.wa=t.wa;}
  };
  [mV,mP].forEach(function(el){el.addEventListener('input',function(){run(true)})});
  document.querySelectorAll('.mm-tabs button').forEach(function(b){b.addEventListener('click',function(){mode=b.dataset.mode;document.querySelectorAll('.mm-tabs button').forEach(function(x){x.setAttribute('aria-selected',x===b?'true':'false')});mV.value=T[mode].dv;run(true);});});
  run(false);
}

/* count-up stats */
var counters=[].slice.call(document.querySelectorAll('[data-to]'));
if('IntersectionObserver' in window&&!RM){var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,to=+el.dataset.to,suf=el.dataset.suffix||'',t0=performance.now();
  var f=function(ts){var k=Math.min(1,(ts-t0)/1400);k=1-Math.pow(1-k,4);el.textContent=Math.round(to*k)+suf;if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);})},{threshold:.6});counters.forEach(function(c){co.observe(c)});}

var nws=[].slice.call(document.querySelectorAll('.nw-c b[data-count]'));
if('IntersectionObserver' in window&&!RM){var nio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;nio.unobserve(e.target);var el=e.target,to=+el.dataset.count,t0=performance.now();var f=function(ts){var k=Math.min(1,(ts-t0)/1200);k=1-Math.pow(1-k,4);el.textContent=fmt(to*k);if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);})},{threshold:.6});nws.forEach(function(n){nio.observe(n)});}
/* chat bubbles: WhatsApp-style, one by one on scroll, typing dots before each answer */
var bubbles=[].slice.call(document.querySelectorAll('#chatBody .cq,#chatBody .ca'));
if('IntersectionObserver' in window&&!RM){
  var q=[],busy=false;
  function pump(){if(busy||!q.length)return;busy=true;var b=q.shift();
    if(b.classList.contains('ca')){var t=document.createElement('div');t.className='ctyping';t.innerHTML='<img src="img/yosef_c.webp?v=5" alt="" width="28" height="28"><span><i></i><i></i><i></i></span>';b.parentNode.insertBefore(t,b);requestAnimationFrame(function(){t.classList.add('in')});
      setTimeout(function(){t.remove();b.classList.add('in');setTimeout(function(){busy=false;pump()},260)},750);}
    else{b.classList.add('in');setTimeout(function(){busy=false;pump()},420);}}
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){q.push(e.target);cio.unobserve(e.target);}});q.sort(function(a,b){return bubbles.indexOf(a)-bubbles.indexOf(b)});pump();},{rootMargin:'0px 0px -12% 0px',threshold:.35});
  bubbles.forEach(function(b){cio.observe(b)});}
else bubbles.forEach(function(b){b.classList.add('in')});

/* reveal on scroll */
var rvs=[].slice.call(document.querySelectorAll('.h2,.lead,.kicker,.ses,.st-b,.ticket,.clarify,.roi-c,.trk,.dev-mm,.nw-c,.big-stats div,.ba,.sty-row,.reels,.shots'));
if('IntersectionObserver' in window&&!RM){var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target);}})},{rootMargin:'0px 0px -6% 0px',threshold:.08});
  rvs.forEach(function(el){if(el.closest('.hero')||el.closest('.scan'))return;el.classList.add('rv');rio.observe(el);});}

/* lanyard: start with Yosef (host) centered on mobile */
var trk=document.querySelector('.collab-rail-track'),host=document.querySelector('.lanyard-item--host');
if(trk&&host&&trk.scrollWidth>trk.clientWidth){var hr=host.getBoundingClientRect(),tr=trk.getBoundingClientRect();trk.scrollLeft+= (hr.left+hr.width/2)-(tr.left+tr.width/2);}
/* FAQ: one open at a time */
var dets=[].slice.call(document.querySelectorAll('.faq details'));
dets.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)dets.forEach(function(o){if(o!==d)o.open=false})})});

/* sticky WA (hidden while hero CTA or final CTA is visible) */
var sticky=$('sticky'),heroBtn=document.querySelector('.hero .btn-wa'),fin=document.querySelector('.final .btn-wa'),tkb=document.querySelector('.tk-cta .btn');
if(sticky&&'IntersectionObserver' in window){var seen=new Map();var sio=new IntersectionObserver(function(es){es.forEach(function(e){seen.set(e.target,e.isIntersecting)});var any=false;seen.forEach(function(v){if(v)any=true});sticky.classList.toggle('hide',any);});
  [heroBtn,fin,tkb].forEach(function(b){if(b){seen.set(b,false);sio.observe(b)}});sticky.classList.add('hide');}
})();
