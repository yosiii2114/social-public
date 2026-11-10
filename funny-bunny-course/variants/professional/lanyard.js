(function(){
  var root=document.querySelector('.collab-lanyard');
  if(!root) return;
  var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(RM) return;
  var track=root.querySelector('.collab-rail-track');
  var orig=[].slice.call(root.querySelectorAll('.lanyard-item'));
  if(!track||!orig.length) return;
  /* belt: originals + one clone set, moved with transform for a seamless loop */
  var belt=document.createElement('div');belt.className='collab-rail-belt';
  orig.forEach(function(it){belt.appendChild(it);});
  orig.forEach(function(it){
    var c=it.cloneNode(true);c.setAttribute('aria-hidden','true');c.classList.add('is-clone');
    [].forEach.call(c.querySelectorAll('button,a'),function(el){el.setAttribute('tabindex','-1');});
    belt.appendChild(c);
  });
  track.appendChild(belt);
  root.classList.add('collab-lanyard--live','collab-lanyard--marquee');
  var items=[].slice.call(belt.querySelectorAll('.lanyard-item'));
  var fine=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var SWING_K=32,DAMP=2.4,MAX_SW=19,LIFT=11,MAX_PULL=50,REEL_K=210,REEL_Z=0.5;
  var SPEED=fine?40:32,ACC_K=9,VEL_K=0.3,RESUME_MS=2000;
  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function springProp(s,prop,vprop,target,k,z,h){
    var v=s[vprop]||0,x=s[prop]||0;
    var nv=v+(-k*(x-target)-2*z*Math.sqrt(k)*v)*h;
    s[vprop]=nv;s[prop]=x+nv*h;
  }
  var sims=items.map(function(item,i){
    var len=parseFloat(item.style.getPropertyValue('--strap-len'))||56;
    return{
      item:item,
      swing:item.querySelector('.lanyard-swing'),
      hang:item.querySelector('.lanyard-hang'),
      cord:item.querySelector('.lanyard-cord'),
      badge:item.querySelector('.lanyard-badge'),
      k:SWING_K*Math.sqrt(56/(len+20)*1.35),
      sw:0,vsw:0,pull:0,vpull:0,stretch:0,vst:0,
      hover:false,active:false,flipped:false,lastX:0,lastT:0,
      x0:0,w:114,vis:true,p:{sw:'',y:'',c:'',f:null,a:null}
    };
  });
  /* ---- belt state ---- */
  var pos=0,vel=0,setW=1,beltOff=0,trackW=0,running=false,inView=false;
  var dragging=false,dragPid=-1,dragX=0,dragT=0,dragMoved=0,dragStartPos=0,pauseUntil=0,hoverPause=false,lastVel=0,phase=0;
  function measure(){
    var a=items[0],b=items[orig.length];
    setW=Math.abs(b.offsetLeft-a.offsetLeft)||1;
    beltOff=belt.offsetLeft;trackW=track.clientWidth;
    sims.forEach(function(s){s.x0=s.item.offsetLeft;s.w=s.item.offsetWidth;});
  }
  function wrap(){pos=((pos%setW)+setW)%setW;}
  function paint(s){
    var p=s.p;
    var sw=s.sw.toFixed(2);if(sw!==p.sw){p.sw=sw;s.swing.style.setProperty('--swing',sw+'deg');}
    var y=(s.pull+s.stretch*0.45).toFixed(1);if(y!==p.y){p.y=y;if(s.hang) s.hang.style.setProperty('--pull',y+'px');}
    var cord=(1+Math.min(0.22,Math.abs(s.sw)*0.016+(s.hover||s.active?0.06:0)+(s.stretch>0?0.08:0))).toFixed(2);
    if(cord!==p.c){p.c=cord;if(s.cord) s.cord.style.setProperty('--cord-scale',cord);}
    if(s.badge){
      if(p.f!==s.flipped){p.f=s.flipped;s.badge.classList.toggle('is-flipped',s.flipped);s.badge.setAttribute('aria-pressed',s.flipped?'true':'false');}
      var act=s.active||s.hover;if(p.a!==act){p.a=act;s.badge.classList.toggle('is-active',act);}
    }
  }
  var raf=0,last=0;
  function step(now){
    raf=0;
    if(!last) last=now;
    var dt=Math.min(0.05,(now-last)/1000); last=now;
    /* belt velocity: auto loop with a gentle surge, user fling decays, resumes 2 s after release */
    var prevVel=vel;
    if(!dragging){
      var target=0;
      if(now>=pauseUntil&&!hoverPause){phase+=dt;target=SPEED*(1+0.42*Math.sin(phase*1.9)+0.18*Math.sin(phase*0.73+1.3));}
      var tau=Math.abs(vel)>SPEED*2.2?0.55:0.9;
      vel+=(target-vel)*(1-Math.exp(-dt/tau));
      pos+=vel*dt;wrap();
      belt.style.transform='translate3d('+pos.toFixed(2)+'px,0,0)';
    }
    var acc=dt>0?(vel-prevVel)/dt:0;
    acc=clamp(acc,-6000,6000);
    var force=clamp(ACC_K*acc,-420,420)+VEL_K*clamp(vel,-1200,1200);
    var sub=Math.max(2,Math.ceil(dt/0.007)),h=dt/sub;
    for(var k=0;k<sub;k++){
      for(var i=0;i<sims.length;i++){
        var s=sims[i];
        if(!(ptrMode==='pull'&&ptrIdx===i)){
          s.vsw+=(-s.k*s.sw-DAMP*s.vsw+force*s.k/SWING_K)*h;
          s.sw=clamp(s.sw+s.vsw*h,-MAX_SW,MAX_SW);
        }
        springProp(s,'pull','vpull',(s.hover||s.active)?LIFT:0,185,0.72,h);
        if(!(ptrMode==='pull'&&ptrIdx===i)){
          springProp(s,'stretch','vst',0,REEL_K,REEL_Z,h);
          s.stretch=Math.max(0,s.stretch);
        }
      }
    }
    for(var j=0;j<sims.length;j++){
      var q=sims[j],xl=beltOff+q.x0+pos;
      q.vis=xl>-q.w-40&&xl<trackW+40;
      if(q.vis) paint(q);
    }
    if(running) raf=requestAnimationFrame(step);
  }
  function startLoop(){if(!running){running=true;last=0;if(!raf) raf=requestAnimationFrame(step);}}
  function stopLoop(){running=false;if(raf){cancelAnimationFrame(raf);raf=0;}}
  function kick(){if(inView) startLoop();}
  function impulse(s,amt){s.vsw+=amt;}
  function tug(s,amt){s.vst+=amt;}
  function setActive(idx){sims.forEach(function(s,i){s.active=i===idx;});kick();}
  /* ---- pointer: horizontal drag moves the belt, vertical pull stretches a badge reel ---- */
  var ptrId=-1,ptrIdx=-1,ptrMode='',ptrX=0,ptrY=0,hoverHit=-1,hoverX=0,hoverT=0,suppressClick=false;
  track.addEventListener('pointerdown',function(e){
    if(e.button!==0&&e.pointerType==='mouse') return;
    var b=e.target.closest('.lanyard-badge');
    ptrId=e.pointerId;ptrMode='';ptrX=e.clientX;ptrY=e.clientY;
    ptrIdx=b?sims.findIndex(function(s){return s.badge===b;}):-1;
    dragPid=e.pointerId;dragX=e.clientX;dragT=performance.now();dragMoved=0;dragStartPos=pos;
    dragging=true;vel=0;pauseUntil=Infinity;suppressClick=false;
    if(ptrIdx>=0) setActive(ptrIdx);
    kick();
  });
  track.addEventListener('pointermove',function(e){
    if(e.pointerId===ptrId){
      var dx=e.clientX-ptrX,dy=e.clientY-ptrY;
      if(!ptrMode&&Math.hypot(dx,dy)>7){
        if(Math.abs(dx)>=Math.abs(dy)) ptrMode='belt';
        else if(dy>4&&ptrIdx>=0&&e.pointerType==='mouse') ptrMode='pull';
        else ptrMode='none';
        if(ptrMode==='belt'||ptrMode==='pull'){try{track.setPointerCapture(e.pointerId);}catch(_){}}
        if(ptrMode==='belt'){track.classList.add('is-dragging');suppressClick=true;}
        if(ptrMode==='none'){dragging=false;pauseUntil=performance.now()+RESUME_MS;}
      }
      if(ptrMode==='belt'){
        var t=performance.now(),ddx=e.clientX-dragX,dtt=Math.max(1,t-dragT)/1000;
        var inst=ddx/dtt;vel=vel*0.6+inst*0.4;
        pos+=ddx;dragX=e.clientX;dragT=t;dragMoved+=Math.abs(ddx);wrap();
        belt.style.transform='translate3d('+pos.toFixed(2)+'px,0,0)';
      }else if(ptrMode==='pull'){
        var s=sims[ptrIdx];
        s.stretch=clamp(Math.max(0,dy),0,MAX_PULL);s.vst=0;
        s.sw=clamp((-Math.atan2(dx,130+s.stretch)*180)/Math.PI,-17,17);
      }
      kick();
      return;
    }
    if(e.pointerType!=='mouse'||ptrId>=0) return;
    var hit=nearest(e.clientX,e.clientY),tt=performance.now();
    var hv=(e.clientX-hoverX)/Math.max(1,tt-hoverT);hoverX=e.clientX;hoverT=tt;
    if(hit>=0){
      if(hit!==hoverHit) impulse(sims[hit],clamp(-hv*24,-28,28));
      hoverHit=hit;
      sims.forEach(function(s,j){s.hover=j===hit;s.active=j===hit;});
      kick();
    }
  });
  function endPtr(e){
    if(e.pointerId!==ptrId) return;
    if(ptrMode==='pull'&&ptrIdx>=0){sims[ptrIdx].stretch=0;sims[ptrIdx].vst=0;}
    if(ptrMode==='belt'){
      if(performance.now()-dragT>90) vel*=0.2;
      vel=clamp(vel,-1800,1800);
    }else if(ptrMode!=='belt'){vel=0;}
    track.classList.remove('is-dragging');
    dragging=false;pauseUntil=performance.now()+RESUME_MS;
    ptrId=-1;ptrIdx=-1;ptrMode='';
    kick();
  }
  track.addEventListener('pointerup',endPtr);
  track.addEventListener('pointercancel',endPtr);
  track.addEventListener('lostpointercapture',endPtr);
  track.addEventListener('click',function(e){if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}},true);
  track.addEventListener('pointerleave',function(e){
    if(e.pointerType!=='mouse') return;
    hoverHit=-1;sims.forEach(function(s){s.hover=false;s.active=false;});
    if(hoverPause){hoverPause=false;pauseUntil=performance.now()+600;}
    kick();
  });
  if(fine){track.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse') hoverPause=true;});}
  function nearest(cx,cy){
    var box=track.getBoundingClientRect(),x=cx-box.left,y=cy-box.top;
    if(y<-20||y>box.height+50) return -1;
    var best=-1,bd=1e9;
    sims.forEach(function(s,i){
      if(!s.vis) return;
      var ix=beltOff+s.x0+pos+s.w/2,d=Math.abs(x-ix);
      if(d<62&&d<bd){bd=d;best=i;}
    });
    return best;
  }
  sims.forEach(function(s,i){
    if(fine&&s.badge){
      s.badge.addEventListener('mouseenter',function(){s.hover=true;setActive(i);impulse(s,(i%2?-1:1)*11);});
      s.badge.addEventListener('mouseleave',function(){s.hover=false;impulse(s,(i%2?1:-1)*7);kick();});
    }
    if(s.badge){
      s.badge.addEventListener('click',function(e){
        if(e.target.closest('a.badge-ig')) return;
        s.flipped=!s.flipped;
        tug(s,70);impulse(s,s.flipped?9:-9);
        setActive(i);kick();
      });
    }
  });
  /* keyboard: arrows nudge the belt */
  track.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();vel+=e.key==='ArrowLeft'?600:-600;pauseUntil=performance.now()+RESUME_MS;kick();}
  });
  track.addEventListener('focusin',function(e){var fv=false;try{fv=e.target.matches(':focus-visible');}catch(_){}if(fv&&e.target!==track){hoverPause=true;}});
  track.addEventListener('focusout',function(){hoverPause=false;});
  measure();
  sims.forEach(function(s){paint(s);});
  var rz=0;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){measure();wrap();},120);});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener('load',measure);
  document.addEventListener('visibilitychange',function(){if(document.hidden) stopLoop();else if(inView) startLoop();});
  if('IntersectionObserver' in window){
    var seen=false;
    new IntersectionObserver(function(es){inView=es[0].isIntersecting;if(inView){if(!seen){seen=true;pauseUntil=performance.now()+1400;}measure();startLoop();}else stopLoop();},{rootMargin:'80px 0px'}).observe(root);
  }else{inView=true;startLoop();}
  sims.forEach(function(s,i){setTimeout(function(){impulse(s,(i%2?-1:1)*(12-(i%4)*2));},110+i*60);});
})();
