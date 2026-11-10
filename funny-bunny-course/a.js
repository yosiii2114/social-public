
(()=>{
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const prog=document.getElementById('prog'),hero=document.querySelector('.hero'),sticky=document.querySelector('.cta.sticky');
function onS(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  if(prog)prog.style.transform='scaleX('+(h>0?y/h:0)+')';
  if(sticky&&hero)sticky.classList.toggle('show',y>hero.offsetHeight*.65);
}
addEventListener('scroll',onS,{passive:true});
onS();
})();
