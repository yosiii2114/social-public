(function(){
  var root=document.querySelector('.collab-lanyard');
  if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var track=root.querySelector('.collab-rail-track');
  var items=[].slice.call(root.querySelectorAll('.lanyard-item'));
  if(!track||!items.length) return;
  root.classList.add('collab-lanyard--live');
  var fine=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var SWING_K=32,DAMP=2.15,MAX_SW=19,LIFT=11,MAX_PULL=50,REEL_K=210,REEL_Z=0.5;
  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function springProp(s,prop,vprop,target,k,z,h){
    var v=s[vprop]||0,x=s[prop]||0;
    var nv=v+(-k*(x-target)-2*z*Math.sqrt(k)*v)*h;
    s[vprop]=nv;s[prop]=x+nv*h;
  }
  var sims=items.map(function(item){
    return{
      item:item,
      swing:item.querySelector('.lanyard-swing'),
      hang:item.querySelector('.lanyard-hang'),
      cord:item.querySelector('.lanyard-cord'),
      badge:item.querySelector('.lanyard-badge'),
      sw:parseFloat(getComputedStyle(item).getPropertyValue('--rest'))||0,vsw:0,pull:0,vpull:0,stretch:0,vst:0,
      hover:false,active:false,flipped:false,lastX:0,lastT:0
    };
  });
  var raf=0,last=0,ptrId=-1,ptrIdx=-1,ptrMode='',ptrX=0,ptrY=0,hoverHit=-1,hoverX=0,hoverT=0;
  function paint(s){
    if(s.swing) s.swing.style.setProperty('--swing',s.sw.toFixed(2)+'deg');
    var y=(s.pull+s.stretch*0.45).toFixed(2);
    if(s.hang) s.hang.style.setProperty('--pull',y+'px');
    var cord=1+Math.min(0.22,Math.abs(s.sw)*0.016+(s.hover||s.active?0.06:0)+(s.stretch>0?0.08:0));
    if(s.cord) s.cord.style.setProperty('--cord-scale',cord.toFixed(3));
    if(s.badge){
      s.badge.classList.toggle('is-flipped',s.flipped);
      s.badge.classList.toggle('is-active',s.active||s.hover);
      s.badge.setAttribute('aria-pressed',s.flipped?'true':'false');
    }
  }
  function impulse(s,amt){s.vsw+=amt;}
  function tug(s,amt){s.vst+=amt;}
  function step(now){
    if(!last) last=now;
    var dt=Math.min(0.08,(now-last)/1000); last=now;
    var sub=Math.max(2,Math.ceil(dt/0.007)),h=dt/sub,busy=false;
    for(var k=0;k<sub;k++){
      sims.forEach(function(s,idx){
        if(!(ptrMode==='pull'&&ptrIdx===idx)){
          s.vsw+=(-SWING_K*s.sw-DAMP*s.vsw)*h;
          s.sw=clamp(s.sw+s.vsw*h,-MAX_SW,MAX_SW);
        }
        var target=(s.hover||s.active)?LIFT:0;
        springProp(s,'pull','vpull',target,185,0.72,h);
        if(!(ptrMode==='pull'&&ptrIdx===idx)){
          springProp(s,'stretch','vst',0,REEL_K,REEL_Z,h);
          s.stretch=Math.max(0,s.stretch);
        }
      });
    }
    sims.forEach(function(s){
      paint(s);
      var tgt=(s.hover||s.active)?LIFT:0;
      if(Math.abs(s.vsw)>0.2||Math.abs(s.sw)>0.04||Math.abs(s.vpull)>0.02||Math.abs(s.pull-tgt)>0.1||Math.abs(s.vst)>0.05||Math.abs(s.stretch)>0.04) busy=true;
    });
    if(ptrMode==='pull') busy=true;
    if(busy) raf=requestAnimationFrame(step); else{raf=0;last=0;}
  }
  function kick(){if(!raf){last=0;raf=requestAnimationFrame(step);}}
  function nearest(cx,cy){
    var box=track.getBoundingClientRect();
    var x=cx-box.left,y=cy-box.top;
    if(y<-20||y>box.height+50) return -1;
    var best=-1,bd=1e9;
    sims.forEach(function(s,i){
      var r=s.item.getBoundingClientRect();
      var ix=r.left+r.width/2-box.left;
      var d=Math.abs(x-ix);
      if(d<62&&d<bd){bd=d;best=i;}
    });
    return best;
  }
  function setActive(idx){
    sims.forEach(function(s,i){s.active=i===idx;});
    kick();
  }
  var dragScroll=false,dragSx=0,dragSl=0,dragPid=-1;
  track.addEventListener('pointerdown',function(e){
    if(e.target.closest('.lanyard-badge')) return;
    dragScroll=true;dragSx=e.clientX;dragSl=track.scrollLeft;dragPid=e.pointerId;
    track.classList.add('is-dragging');
    try{track.setPointerCapture(e.pointerId);}catch(_){}
  });
  track.addEventListener('pointermove',function(e){
    if(dragScroll&&e.pointerId===dragPid){
      track.scrollLeft=dragSl-(e.clientX-dragSx)*1.1;
    }
  });
  function endDrag(e){
    if(dragScroll&&e.pointerId===dragPid){
      dragScroll=false;dragPid=-1;track.classList.remove('is-dragging');
    }
  }
  track.addEventListener('pointerup',endDrag);
  track.addEventListener('pointercancel',endDrag);
  sims.forEach(function(s,i){
    paint(s);
    if(fine&&s.badge){
      s.badge.addEventListener('mouseenter',function(){s.hover=true;setActive(i);impulse(s,(i%2?-1:1)*11);kick();});
      s.badge.addEventListener('mouseleave',function(){s.hover=false;impulse(s,(i%2?1:-1)*7);kick();});
      s.badge.addEventListener('mousemove',function(e){
        var t=performance.now(),dx=s.lastT?(e.clientX-s.lastX)/Math.max(1,t-s.lastT):0;
        s.lastX=e.clientX;s.lastT=t;
        if(Math.abs(dx)>0.12){impulse(s,clamp(-dx*0.45,-18,18));kick();}
      });
    }
    if(s.badge){
      s.badge.addEventListener('click',function(e){
        if(e.target.closest('a.badge-ig')) return;
        if(ptrMode==='pull') return;
        s.flipped=!s.flipped;
        tug(s,70);
        impulse(s,s.flipped?9:-9);
        setActive(i);
        kick();
      });
      s.badge.addEventListener('pointerdown',function(e){
        if(e.button!==0) return;
        ptrId=e.pointerId;ptrIdx=i;ptrMode='';ptrX=e.clientX;ptrY=e.clientY;
        setActive(i);
      });
    }
  });
  track.addEventListener('pointermove',function(e){
    if(e.pointerId===ptrId&&ptrIdx>=0){
      var dx=e.clientX-ptrX,dy=e.clientY-ptrY;
      if(!ptrMode&&Math.hypot(dx,dy)>8){
        ptrMode=Math.abs(dy)>Math.abs(dx)&&dy>4?'pull':'none';
        if(ptrMode==='pull') track.setPointerCapture(e.pointerId);
      }
      if(ptrMode==='pull'){
        var s=sims[ptrIdx];
        s.stretch=clamp(Math.max(0,dy),0,MAX_PULL);
        s.vst=0;
        s.sw=clamp((-Math.atan2(dx,130+s.stretch)*180)/Math.PI,-17,17);
        kick();
      }
      return;
    }
    if(e.pointerType!=='mouse'||ptrId>=0) return;
    var hit=nearest(e.clientX,e.clientY);
    var t=performance.now();
    var hv=(e.clientX-hoverX)/Math.max(1,t-hoverT);
    hoverX=e.clientX;hoverT=t;
    if(hit>=0){
      if(hit!==hoverHit) impulse(sims[hit],clamp(-hv*24,-28,28));
      hoverHit=hit;
      sims.forEach(function(s,j){s.hover=j===hit;s.active=j===hit;});
      kick();
    }
  });
  function endPtr(e){
    if(e.pointerId!==ptrId) return;
    if(ptrMode==='pull'&&ptrIdx>=0){sims[ptrIdx].stretch=0;sims[ptrIdx].vst=0;kick();}
    ptrId=-1;ptrIdx=-1;ptrMode='';
  }
  track.addEventListener('pointerup',endPtr);
  track.addEventListener('pointercancel',endPtr);
  track.addEventListener('pointerleave',function(){
    hoverHit=-1;
    sims.forEach(function(s){s.hover=false;s.active=false;});
    kick();
  });
  sims.forEach(function(s,i){setTimeout(function(){impulse(s,(i%2?-1:1)*(24-(i%4)*3));kick();},110+i*70);});
})();
