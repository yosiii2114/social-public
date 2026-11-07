
(()=>{
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,to=+el.dataset.to,suf=el.dataset.suf||'',t0=performance.now();
 const f=t=>{const p=Math.min(1,(t-t0)/1100),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString('en-US')+suf;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
document.querySelectorAll('[data-to]').forEach(el=>co.observe(el));
// videos: load+play only in view
const vids=[...document.querySelectorAll('video[data-src]')];
const vo=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src){v.src=v.dataset.src}const p=v.play();p&&p.catch(()=>{})}else{v.pause()}}),{threshold:.35});
vids.forEach(v=>vo.observe(v));
document.querySelectorAll('.vwrap').forEach(w=>{const v=w.querySelector('video'),b=w.querySelector('.snd');
 const tog=ev=>{ev.preventDefault();const on=v.muted;vids.forEach(o=>{if(o!==v){o.muted=true;const ob=o.parentNode.querySelector('.snd');ob.classList.remove('on');ob.querySelector('.ic').textContent='🔇';ob.querySelector('.lb').textContent='הקישו לסאונד'}});
  v.muted=!on;if(on){if(!v.src)v.src=v.dataset.src;v.currentTime=0;v.play().catch(()=>{})}
  b.classList.toggle('on',on);b.querySelector('.ic').textContent=on?'🔊':'🔇';b.querySelector('.lb').textContent=on?'סאונד פועל':'הקישו לסאונד'};
 w.addEventListener('click',tog)});
// scroll: progress, parallax, sticky
const prog=document.getElementById('prog'),st=document.querySelector('.sticky'),hero=document.querySelector('.hero'),fin=document.querySelector('.final'),ws=document.querySelector('.ws');
const pars=[...document.querySelectorAll('[data-par]')];let tk=false;
function onS(){tk=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(h>0?y/h:0)+')';
 pars.forEach(el=>{const r=el.getBoundingClientRect(),c=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.transform='translate3d(0,'+(c*(+el.dataset.par)).toFixed(1)+'px,0) rotate('+(c*(+el.dataset.rot||0)).toFixed(2)+'deg)'});
 const fr=fin.getBoundingClientRect(),wr=ws.getBoundingClientRect();st.classList.toggle('show',y>hero.offsetHeight*.7&&fr.top>innerHeight*.6&&!(wr.top<innerHeight&&wr.bottom>0))}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
})();
