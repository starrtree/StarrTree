const focusStyles=document.createElement('link');
focusStyles.rel='stylesheet';
focusStyles.href='css/focus.css';
document.head.appendChild(focusStyles);
const orbHoverStyles=document.createElement('link');
orbHoverStyles.rel='stylesheet';
orbHoverStyles.href='css/orb-hover.css';
document.head.appendChild(orbHoverStyles);
const progressiveOrbStyles=document.createElement('link');
progressiveOrbStyles.rel='stylesheet';
progressiveOrbStyles.href='css/progressive-orbs.css';
document.head.appendChild(progressiveOrbStyles);
const mobileLiteStyles=document.createElement('link');
mobileLiteStyles.rel='stylesheet';
mobileLiteStyles.href='css/mobile-lite.css';
document.head.appendChild(mobileLiteStyles);
const orbDepthStyles=document.createElement('link');
orbDepthStyles.rel='stylesheet';
orbDepthStyles.href='css/orb-depth-live.css';
document.head.appendChild(orbDepthStyles);

const avatar=document.getElementById('avatar3d'),nav=document.getElementById('nav'),intro=document.getElementById('intro'),panel=document.getElementById('panel'),orb=document.getElementById('orb'),title=document.getElementById('title'),desc=document.getElementById('desc'),chips=document.getElementById('chips'),deck=document.getElementById('deck'),count=document.getElementById('count'),status=document.getElementById('status'),modelError=document.getElementById('modelError'),bgVideo=document.getElementById('bgVideo');
const deviceMemory=navigator.deviceMemory||8;
const IS_LITE=matchMedia('(max-width: 860px), (pointer: coarse)').matches||deviceMemory<=4;
const USE_STATIC_BG=IS_LITE||deviceMemory<=4;
const CAN_LIVE_HOME_ORBS=!IS_LITE;
document.body.classList.add('progressive-orbs');
if(IS_LITE){document.body.classList.add('mobile-lite')}
if(USE_STATIC_BG){document.body.classList.add('bg-ended');try{bgVideo.pause();bgVideo.removeAttribute('src');bgVideo.load()}catch(e){}}

const ORB_URLS={
  tech:'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385128/orb-tech-mv_joc0yd.glb',
  art:'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385128/orb-art-mv_yxdxav.glb',
  seed:'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385129/orb-seed-of-life-mv_ij6drf.glb',
  plant:'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385129/orb-plant-bio-mv_fvbz1y.glb'
};
const orbModels={
  tech:document.querySelector('.orb-tech .orb-model'),
  art:document.querySelector('.orb-art .orb-model'),
  seed:document.querySelector('.orb-seed .orb-model'),
  plant:document.querySelector('.orb-plant .orb-model')
};
Object.entries(orbModels).forEach(([key,mv])=>{const btn=mv?.closest('.starr-orb');if(!btn)return;const img=document.createElement('img');img.className='orb-preview';img.alt=`${key} orb preview`;btn.insertBefore(img,btn.firstChild)});
function configureOrbModel(mv){if(!mv)return;mv.setAttribute('camera-controls','');mv.setAttribute('disable-pan','');mv.setAttribute('auto-rotate','');mv.setAttribute('camera-orbit','0deg 75deg 5.2m');mv.setAttribute('min-camera-orbit','auto 45deg 4.4m');mv.setAttribute('max-camera-orbit','auto 95deg 7.2m');mv.setAttribute('field-of-view','28deg');mv.setAttribute('camera-target','0m 0m 0m');mv.setAttribute('auto-rotate-delay',IS_LITE?'1200':'900');mv.setAttribute('rotation-per-second',IS_LITE?'8deg':'11deg');mv.setAttribute('interaction-prompt','none')}
function loadOrbModel(key){const mv=orbModels[key];if(!mv||mv.getAttribute('src'))return;mv.setAttribute('src',ORB_URLS[key]);configureOrbModel(mv);mv.closest('.starr-orb')?.classList.add('has-model')}
function unloadOrbModels(exceptBtn=null){Object.values(orbModels).forEach(mv=>{const btn=mv?.closest('.starr-orb');if(!mv||btn===exceptBtn)return;mv.removeAttribute('src');btn?.classList.remove('has-model')})}
function wait(ms){return new Promise(r=>setTimeout(r,ms))}
function waitForLoad(mv){return new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;resolve()};mv.addEventListener('load',finish,{once:true});mv.addEventListener('error',finish,{once:true});setTimeout(finish,4500)})}
async function captureOrbPreview(renderer){await wait(260);try{if(typeof renderer.toDataURL==='function'){const result=renderer.toDataURL('image/png');return typeof result?.then==='function'?await result:result}}catch(e){}try{const canvas=renderer.shadowRoot?.querySelector('canvas');return canvas?.toDataURL('image/png')}catch(e){}return null}
async function generateOrbPreviews(){if(IS_LITE)return;const keys=['tech','art','plant','seed'];const renderer=document.createElement('model-viewer');renderer.className='orb-preview-renderer';renderer.setAttribute('crossorigin','anonymous');configureOrbModel(renderer);renderer.removeAttribute('auto-rotate');renderer.setAttribute('exposure','1.12');renderer.setAttribute('shadow-intensity','0');document.body.appendChild(renderer);for(const key of keys){const btn=orbModels[key]?.closest('.starr-orb');const img=btn?.querySelector('.orb-preview');if(!img)continue;const cached=sessionStorage.getItem(`orb-preview-${key}`);if(cached){img.src=cached;btn.classList.add('has-preview');continue}renderer.setAttribute('src',ORB_URLS[key]);await waitForLoad(renderer);const data=await captureOrbPreview(renderer);if(data&&data.startsWith('data:image')){try{sessionStorage.setItem(`orb-preview-${key}`,data)}catch(e){}img.src=data;btn.classList.add('has-preview')}renderer.removeAttribute('src');await wait(120)}renderer.remove()}
async function loadHomeOrbModelsStaggered(){if(!CAN_LIVE_HOME_ORBS||document.body.classList.contains('orb-focus'))return;for(const key of ['tech','art','plant','seed']){if(document.body.classList.contains('orb-focus'))return;loadOrbModel(key);await wait(650)}}

const sections=[
['ai','🤖','AI + Automation','#80f7ff','Custom AI agents, GPTs, workflow automations, and research systems that save time and turn scattered work into repeatable engines.',['Custom GPTs','n8n / Make','Lead systems','AI training'],[['Ịmaya Automation Builds','Lead capture, outreach, CRM cleanup, follow-ups, and virtual assistant workflows for small teams.'],['Custom AI Assistants','Personal or business GPTs trained for a specific workflow, audience, voice, or internal knowledge base.'],['Deep Research Systems','Fast research packages with clear summaries, action plans, and reusable knowledge files.']]],
['education','🎓','Education + Workshops','#72ff9b','AI literacy and creative technology programs for students, schools, youth organizations, and working adults.',['Youth AI','Curriculum','Workshops','Creative learning'],[['Shoot With A Camera','Film, storytelling, and AI media education for youth through hands-on creation.'],['AI Club / School Programs','Prompting, short films, app ideas, responsible AI, and project-based learning.'],['Workflow Training','Practical workshops that help adults and teams use AI without getting lost in tool overload.']]],
['music','🎵','Music + Audio','#b586ff','Songs, beats, vocal coaching, mobile studio recording, sound design, and music-driven brand experiences.',['Beats','Recording','Vocal presets','Theme songs'],[['Max Starr Music','R&B, alternative rap, Afro-beats, dancehall, pop, and experimental storytelling.'],['Production Services','Custom beats, theme songs, in-the-booth coaching, and mobile recording support.'],['Audio Products','BandLab vocal presets, effect chains, visualizers, and music media packs.']]],
['visuals','🎨','Design + Film','#ff7adf','Album covers, visualizers, short videos, logos, UI icons, pitch visuals, AI art direction, and cinematic brand assets.',['Covers','Videos','Logos','Brand assets'],[['Cover + Visualizer Packs','Cover art, motion loops, promo clips, and short-form visuals for releases.'],['Brand Identity Assets','Logos, UI icons, social graphics, slide art, and stylized promo materials.'],['AI Art Direction','Prompt systems, creative concepts, and visual pipelines for campaigns or storyworlds.']]],
['engineering','🚀','Web + Engineering','#ffb84d','Websites, prototypes, interfaces, 3D concepts, no-code systems, and practical technical problem solving.',['Websites','Prototypes','3D ideas','No-code'],[['Portfolio + Brand Sites','Clean web interfaces for artists, educators, local businesses, and creative service brands.'],['Prototype Builds','Fast MVP layouts, automation demos, UI concepts, and technical proof-of-concepts.'],['Future-Tech Projects','Engineering concepts, CAD-informed ideas, robotics, bionics, aerospace, and systems design.']]],
['starrdome','🌌','StarrDome','#9f8cff','The youth creative platform vision: kids turn ideas into characters, comics, games, stories, animations, and eventually products.',['Edutainment','Game worlds','AI characters','Creator hub'],[['Idea to Franchise','A future workflow for text-to-character, comic, animation, game asset, and toy-style creation.'],['Learn · Create · Share','A safe loop where learning unlocks creation, and creation gives kids a reason to learn more.'],['StarrDome Online','A player-built world for showcasing characters, stories, and interactive creations.']]],
['products','🛒','Products + Digital Shop','#ffffff','Digital products and packaged services: presets, prompt packs, templates, AI media assets, studio kits, and creative toolkits.',['Presets','Prompt packs','Templates','Media kits'],[['Vocal Presets','Affordable preset bundles and effect chains for quick artist setup.'],['AI Media Packs','Prompt packs, visual assets, icons, covers, and reusable brand materials.'],['Studio Toolkits','Recommended home studio setups and training for creators building from scratch.']]],
['brand','🌳','StarrTree Brand','#ffd700','The umbrella identity: music, AI, education, engineering, design, services, and storyworlds rooted in one living system.',['Rooted in Light','Cosmic tree','Creative systems','Unity'],[['Central Hub','A public-facing map of the branches: what you make, teach, sell, and build.'],['Creative Services Menu','A simplified way for visitors to understand what to book or ask about.'],['Living Portfolio','A website that can keep growing without becoming slow, cluttered, or confusing.']]]
];

let sel=0,focusedOrb=null,orbitAngle=0,lastT=performance.now(),manualUntil=0,lastMobileFrame=0;
const orbitButtons=[...document.querySelectorAll('.starr-orb')];
const pinLayer=document.createElement('div');
pinLayer.className='pin-layer';
document.body.appendChild(pinLayer);
const backBtn=document.createElement('button');
backBtn.className='orb-back';
backBtn.textContent='Return to AxStarr';
document.body.appendChild(backBtn);
if(!IS_LITE){const note=document.createElement('div');note.className='perf-note';note.textContent='Live 3D Orbs';document.body.appendChild(note);setTimeout(()=>note.remove(),5200)}

function renderNav(){nav.innerHTML=sections.map((s,i)=>`<button class="${i===sel?'active':''}" data-i="${i}"><i>${s[1]}</i><span>${s[2]}</span></button>`).join('');nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{closeOrbFocus(false);select(+b.dataset.i,true)}))}
function select(i,show=true){sel=(i+sections.length)%sections.length;const s=sections[sel];orb.textContent=s[1];orb.style.boxShadow=`0 0 28px ${s[3]}`;title.textContent=s[2];desc.textContent=s[4];chips.innerHTML=s[5].map(c=>`<span class="chip">${c}</span>`).join('');deck.innerHTML=s[6].map((c,idx)=>`<article class="card"><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join('');count.textContent=`${sel+1} / ${sections.length}`;renderNav();if(show){panel.classList.add('show');intro.classList.add('hide')}};
function renderPins(sectionIndex){const s=sections[sectionIndex];const cards=s[6];pinLayer.innerHTML=cards.map((c,idx)=>`<button class="planet-pin pin-${idx}" data-card="${idx}"><i>${s[1]}</i><span>${c[0]}<small>Open detail</small></span></button>`).join('');pinLayer.classList.add('show');pinLayer.querySelectorAll('.planet-pin').forEach(pin=>pin.addEventListener('click',()=>openProjectCard(sectionIndex,Number(pin.dataset.card))))}
function openProjectCard(sectionIndex,cardIndex){const s=sections[sectionIndex],c=s[6][cardIndex];panel.classList.add('show');intro.classList.add('hide');orb.textContent=s[1];title.textContent=c[0];desc.textContent=c[1];chips.innerHTML=s[5].slice(0,4).map(tag=>`<span class="chip">${tag}</span>`).join('');deck.innerHTML=`<article class="card"><h3>Project / Service Detail</h3><p>This pin is ready for images, video, audio, music links, or a booking CTA once the final media is added.</p></article><article class="card"><h3>Next media slot</h3><p>Drop in a cover image, short autoplay video, music preview, or service package here.</p></article>`;count.textContent=`Pin ${cardIndex+1} / ${s[6].length}`}
function openOrbFocus(btn,target){focusedOrb=btn;const key=btn.dataset.orb;unloadOrbModels(btn);loadOrbModel(key);orbitButtons.forEach(o=>o.classList.remove('is-focused','is-opening'));btn.classList.add('is-opening','is-focused');btn.style.opacity='1';btn.style.zIndex='20';setTimeout(()=>btn.classList.remove('is-opening'),760);document.body.classList.add('orb-focus');select(target,true);renderPins(target);const mv=btn.querySelector('model-viewer');if(mv){configureOrbModel(mv);mv.setAttribute('auto-rotate-delay','650');mv.setAttribute('rotation-per-second',IS_LITE?'8deg':'14deg')}}
function closeOrbFocus(hidePanel=true){document.body.classList.remove('orb-focus');orbitButtons.forEach(o=>o.classList.remove('is-focused','is-opening'));pinLayer.classList.remove('show');pinLayer.innerHTML='';focusedOrb=null;if(hidePanel){panel.classList.remove('show');intro.classList.remove('hide')}setTimeout(()=>{if(CAN_LIVE_HOME_ORBS)loadHomeOrbModelsStaggered();else unloadOrbModels()},300)}
function parseTheta(v){if(!v)return null;const match=String(v).match(/-?[\d.]+/);return match?Number(match[0])*Math.PI/180:null}
function syncOrbitFromAvatar(){try{const orbit=avatar.getCameraOrbit?avatar.getCameraOrbit():null;if(orbit&&Number.isFinite(orbit.theta)){orbitAngle=orbit.theta;manualUntil=performance.now()+1200;return}}catch(e){}const attr=parseTheta(avatar.getAttribute('camera-orbit'));if(attr!==null){orbitAngle=attr;manualUntil=performance.now()+1200}}
function updateOrbPositions(t){if(IS_LITE&&t-lastMobileFrame<33){requestAnimationFrame(updateOrbPositions);return}lastMobileFrame=t;const dt=Math.min(48,t-lastT)/1000;lastT=t;const autoSpeed=IS_LITE ? .10 : .14;if(!document.body.classList.contains('orb-focus')&&t>manualUntil){orbitAngle+=dt*autoSpeed}const w=innerWidth,h=innerHeight;const rx=Math.min(w*(IS_LITE ? .34 : .30),IS_LITE?210:430),ry=Math.min(h*(IS_LITE ? .24 : .255),IS_LITE?145:240);const cx=w*.5,cy=h*(IS_LITE ? .44 : .485);const base=[Math.PI*.92,Math.PI*.08,Math.PI*1.25,Math.PI*1.75];orbitButtons.forEach((btn,i)=>{if(btn.classList.contains('is-focused'))return;const a=orbitAngle+base[i];const depth=(Math.sin(a)+1)/2;const x=cx+Math.cos(a)*rx;const y=cy+Math.sin(a)*ry*.72+(i>1?(IS_LITE?34:48):(IS_LITE?-18:-26));const hover=btn.matches(':hover')?1.08:1;const scale=(.72+depth*.46)*hover;const opacity=.46+depth*.54;const z=depth<.45?2:4+Math.round(depth*4);btn.style.transform=`translate(-50%,-50%) translate(${x-cx}px,${y-cy}px) scale(${scale})`;btn.style.opacity=String(opacity);btn.style.zIndex=String(z);btn.classList.toggle('behind-ax',depth<.45);btn.classList.toggle('front-ax',depth>=.45);btn.classList.toggle('back-depth',depth<.34);btn.classList.toggle('mid-depth',depth>=.34&&depth<.67);btn.classList.toggle('front-depth',depth>=.67)});requestAnimationFrame(updateOrbPositions)}

document.getElementById('explore').addEventListener('click',()=>select(0,true));
document.getElementById('prev').addEventListener('click',()=>select(sel-1,true));
document.getElementById('next').addEventListener('click',()=>select(sel+1,true));
document.getElementById('brand').addEventListener('click',()=>closeOrbFocus(true));
backBtn.addEventListener('click',()=>closeOrbFocus(true));
document.querySelectorAll('.orb-model').forEach(configureOrbModel);
avatar.setAttribute('camera-orbit',IS_LITE?'0deg 78deg 7.2m':'0deg 78deg 8.2m');
avatar.setAttribute('min-camera-orbit',IS_LITE?'auto 50deg 5.8m':'auto 50deg 6.4m');
avatar.setAttribute('max-camera-orbit',IS_LITE?'auto 92deg 10m':'auto 92deg 13m');
avatar.setAttribute('field-of-view',IS_LITE?'24deg':'22deg');
avatar.setAttribute('camera-target','0m 0.2m 0m');
avatar.setAttribute('auto-rotate-delay',IS_LITE?'1800':'1000');
avatar.setAttribute('rotation-per-second',IS_LITE?'8deg':'10deg');
avatar.addEventListener('camera-change',syncOrbitFromAvatar);
orbitButtons.forEach(btn=>{btn.addEventListener('click',e=>{const target=Number(btn.dataset.target);openOrbFocus(btn,target)})});
avatar.addEventListener('load',()=>{avatar.classList.add('loaded');status.textContent=IS_LITE?'Mobile Lite Mode':'Live 3D Orb Mode';setTimeout(generateOrbPreviews,500);setTimeout(loadHomeOrbModelsStaggered,1700)});
avatar.addEventListener('error',()=>{avatar.classList.add('failed');status.textContent='Model Error';modelError.classList.add('show')});
if(!USE_STATIC_BG){bgVideo.addEventListener('ended',()=>document.body.classList.add('bg-ended'));bgVideo.addEventListener('error',()=>document.body.classList.add('bg-ended'));bgVideo.play().catch(()=>document.body.classList.add('bg-ended'))}
setTimeout(()=>{if(!avatar.classList.contains('loaded'))status.textContent='Still loading model'},6500);
renderNav();select(0,false);panel.classList.remove('show');requestAnimationFrame(updateOrbPositions);