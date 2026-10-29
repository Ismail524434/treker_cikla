const T={
  period:{name:'Месячные',c:'#7c3aed',ic:'i-period'},
  ovulation:{name:'Овуляция',c:'#facc15',ic:'i-ovulation'},
  normal:{name:'Обычное состояние',c:'#c4b5fd',ic:'i-normal'},
  low:{name:'Депрессивное состояние',c:'#5b6bb0',ic:'i-low'}
};
const ico=k=>`<svg aria-hidden="true"><use href="#${T[k].ic}"/></svg>`;
const MN=['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
const PH={
 menstrual:{n:'Месячные',e:'🩸',intro:'Организм теряет кровь и энергию. Главное — <b>тепло, отдых и железо</b>.',
  s:[['Питание',[['🍌','Бананы и киви','Калий и магний расслабляют мышцы и помогают при спазмах.'],['🥩','Железо','Красное мясо, печень, чечевица, гречка. Сочетайте с витамином C — так железо усваивается лучше.'],['🍫','Тёмный шоколад','Немного (от 70%) — магний и улучшение настроения.'],['🫖','Имбирный или ромашковый чай','Снимает спазмы. Меньше кофе и соли — они усиливают боль и отёки.']]],
  ['Активность и сон',[['🧘','Мягкая нагрузка','Йога, растяжка, прогулка. Тяжёлые тренировки лучше отложить.'],['🔥','Тепло на низ живота','Грелка или тёплая ванна на 15–20 минут уменьшают боль.'],['😴','Больше сна','Организму нужно 8–9 часов — не ругайте себя за усталость.']]],
  ['Настроение',[['🕯️','Режим «мне можно»','Снизьте планку, отмените лишнее, позвольте себе отдыхать.']]]]},
 follicular:{n:'Фолликулярная',e:'🌱',intro:'Эстроген растёт, энергии всё больше. Лучшее время для <b>новых задач и тренировок</b>.',
  s:[['Питание',[['🥚','Белок и злаки','Яйца, рыба, нут, цельнозерновые — энергия для роста фолликулов.'],['🥦','Овощи и ферментированное','Брокколи, квашеная капуста, кефир — поддержка гормонального баланса.'],['🍊','Витамин C','Цитрусовые и болгарский перец помогают восстановить железо.']]],
  ['Активность и сон',[['🏃','Кардио и силовые','Хорошо переносятся интенсивные тренировки.'],['🎯','Сложные задачи','Концентрация и обучаемость на пике — берите проекты.']]],
  ['Настроение',[['✨','Подъём','Хорошее время знакомиться, планировать и пробовать новое.']]]]},
 ovulation:{n:'Овуляция',e:'☀️',intro:'Пик энергии и самый высокий шанс забеременеть. Важны <b>вода и антиоксиданты</b>.',
  s:[['Питание',[['💧','Больше воды','1,5–2 литра в день. Выделения и обмен веществ усиливаются.'],['🫐','Ягоды и зелень','Антиоксиданты: черника, шпинат, авокадо.'],['🌰','Орехи и семечки','Цинк и селен — поддержка яйцеклетки (тыквенные семечки, бразильский орех).']]],
  ['Активность и сон',[['💃','Интенсивные тренировки','Силы много, но разминайтесь тщательнее — связки мягче.'],['🗣️','Общение','Пик общительности: переговоры, свидания, выступления.']]],
  ['Настроение',[['🌡️','Следите за самочувствием','Лёгкая боль внизу живота в 1 из 5 случаев — норма. Сильная — повод к врачу.']]]]},
 luteal:{n:'Лютеиновая (ПМС)',e:'🌙',intro:'Прогестерон растёт, затем падает. Возможны <b>отёки, тяга к сладкому и перепады настроения</b>.',
  s:[['Питание',[['🍠','Сложные углеводы','Батат, овсянка, бурый рис — стабильный сахар и меньше раздражительности.'],['🥜','Магний и B6','Орехи, бананы, индейка, нут — смягчают ПМС.'],['🧂','Меньше соли и кофеина','Уменьшат отёки, болезненность груди и тревожность.']]],
  ['Активность и сон',[['🚶','Умеренные тренировки','Пилатес, плавание, быстрая ходьба. Ближе к месячным — снижайте нагрузку.'],['🛌','Режим сна','Ложитесь в одно время, без экранов за час — сон в эту фазу хрупкий.']]],
  ['Настроение',[['📓','Дневник эмоций','Запишите, что тревожит. Через пару дней многое выглядит иначе.'],['🛁','Ритуалы заботы','Ванна, массаж, любимый сериал — без чувства вины.']]]]}
};
const S=(()=>{try{return JSON.parse(localStorage.getItem('luna')||'null')}catch(e){return null}})()||{};
S.marks=S.marks||{};S.cyc=S.cyc||28;S.per=S.per||5;
if(!S.start){const t=new Date();t.setDate(t.getDate()-8);S.start=key(t)}
function save(){try{localStorage.setItem('luna',JSON.stringify(S))}catch(e){}}
function key(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function parse(k){const[a,b,c]=k.split('-').map(Number);return new Date(a,b-1,c)}
const DAY=864e5;
function cd(date){const diff=Math.round((date-parse(S.start))/DAY);return((diff%S.cyc)+S.cyc)%S.cyc}
function phase(date){const d=cd(date),ov=S.cyc-14;
  if(d<S.per)return'menstrual';if(d>=ov-1&&d<=ov+1)return'ovulation';if(d<ov-1)return'follicular';return'luteal'}
const pk=p=>p==='menstrual'?'period':p==='ovulation'?'ovulation':null;
let view=new Date();view.setDate(1);let sel=null;
const $=id=>document.getElementById(id);

function renderCal(){
  $('mTitle').textContent=MN[view.getMonth()]+' '+view.getFullYear();
  const first=new Date(view.getFullYear(),view.getMonth(),1),off=(first.getDay()+6)%7;
  const n=new Date(view.getFullYear(),view.getMonth()+1,0).getDate(),today=key(new Date());
  let h='';for(let i=0;i<off;i++)h+='<div class="d out"></div>';
  for(let d=1;d<=n;d++){
    const dt=new Date(view.getFullYear(),view.getMonth(),d),k=key(dt),m=S.marks[k],p=pk(phase(dt));
    const label=d+' '+MN[dt.getMonth()]+(m?', '+T[m].name:p?', прогноз: '+T[p].name:'');
    h+=`<button class="d${k===today?' today':''}" data-k="${k}"${m?` data-m="${m}" style="--c:${T[m].c}"`:''} aria-label="${label}"><span>${d}</span>${m?ico(m):p?`<i class="dot" style="background:${T[p].c}"></i>`:''}</button>`;
  }
  $('days').innerHTML=h;
}
function renderHero(){
  const now=new Date(),d=cd(now),p=phase(now),ov=S.cyc-14;
  $('dayN').textContent=d+1;
  $('arc').style.strokeDashoffset=264-264*(d+1)/S.cyc;
  $('phName').textContent=PH[p].e+' '+PH[p].n;
  let sub;
  if(p==='menstrual')sub='Месячные, день '+(d+1)+' из '+S.per;
  else{const toNext=S.cyc-d;const toOv=ov-d;
    sub=(toOv>1&&p==='follicular')?'До овуляции ~'+toOv+' дн. Следующие месячные через '+toNext+' дн.':'Следующие месячные через '+toNext+' дн.';}
  $('phSub').textContent=sub;
}
function renderTips(p){
  document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.p===p));
  const f=PH[p];
  $('tips').innerHTML=`<div class="intro">${f.intro}</div>`+f.s.map(([t,items])=>`<div class="sec"><h3>${t}</h3>${items.map(([e,a,b])=>`<div class="card"><div class="e">${e}</div><div><b>${a}</b><span>${b}</span></div></div>`).join('')}</div>`).join('');
}
function renderSet(){
  $('start').value=S.start;$('cycV').textContent=S.cyc;$('perV').textContent=S.per;
  const cnt={period:0,ovulation:0,normal:0,low:0};Object.values(S.marks).forEach(m=>cnt[m]++);
  $('stats').innerHTML=Object.keys(T).map(k=>`<div class="st"><b>${cnt[k]}</b><span>${T[k].name}</span></div>`).join('');
}
function openSheet(k){
  sel=k;const dt=parse(k),m=S.marks[k];
  $('sT').textContent=dt.getDate()+' '+MN[dt.getMonth()];
  $('opts').innerHTML=Object.keys(T).map(x=>`<button class="opt" data-t="${x}" aria-pressed="${m===x}"><i style="--c:${T[x].c}">${ico(x)}</i>${T[x].name}</button>`).join('');
  $('sbg').classList.add('on');$('opts').querySelector('button').focus();
}
function closeSheet(){$('sbg').classList.remove('on');sel=null}
function all(){renderCal();renderHero();renderSet()}

$('dws').innerHTML=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(x=>`<div class="dw">${x}</div>`).join('');
$('legend').innerHTML=Object.keys(T).map(k=>`<div class="lg"><i style="--c:${T[k].c}">${ico(k)}</i>${T[k].name}</div>`).join('');
$('chips').innerHTML=Object.keys(PH).map(p=>`<button class="chip" data-p="${p}">${PH[p].e} ${PH[p].n}</button>`).join('');
$('chips').onclick=e=>{const b=e.target.closest('.chip');if(b)renderTips(b.dataset.p)};
$('days').onclick=e=>{const b=e.target.closest('.d[data-k]');if(b)openSheet(b.dataset.k)};
$('opts').onclick=e=>{const b=e.target.closest('.opt');if(!b)return;
  S.marks[sel]=b.dataset.t;save();closeSheet();all()};
$('sClear').onclick=()=>{delete S.marks[sel];save();closeSheet();all()};
$('sStart').onclick=()=>{S.start=sel;S.marks[sel]='period';save();closeSheet();all()};
$('sClose').onclick=closeSheet;
$('sbg').onclick=e=>{if(e.target===$('sbg'))closeSheet()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});
$('prev').onclick=()=>{view.setMonth(view.getMonth()-1);renderCal()};
$('next').onclick=()=>{view.setMonth(view.getMonth()+1);renderCal()};
$('start').onchange=e=>{if(e.target.value){S.start=e.target.value;save();all()}};
document.querySelectorAll('.step button').forEach(b=>b.onclick=()=>{
  const k=b.dataset.k,d=+b.dataset.d;
  if(k==='cyc')S.cyc=Math.min(45,Math.max(21,S.cyc+d));else S.per=Math.min(10,Math.max(2,S.per+d));
  save();all()});
$('reset').onclick=()=>{if(confirm('Удалить все отметки?')){S.marks={};save();all()}};
document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.nav button').forEach(x=>x.setAttribute('aria-selected',x===b));
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+b.dataset.v));
  window.scrollTo(0,0)});
function isLight(){const t=document.documentElement.dataset.theme;
  return t?t==='light':window.matchMedia('(prefers-color-scheme: light)').matches}
function setTheme(t){document.documentElement.dataset.theme=t;$('theme').textContent=t==='light'?'🌙':'☀️';
  $('theme').setAttribute('aria-label',t==='light'?'Включить тёмную тему':'Включить светлую тему');
  try{localStorage.setItem('luna-theme',t)}catch(e){}}
$('theme').onclick=()=>setTheme(isLight()?'dark':'light');
try{const t=localStorage.getItem('luna-theme');if(t)setTheme(t);else $('theme').textContent=isLight()?'🌙':'☀️'}catch(e){}
renderTips(phase(new Date()));all();
