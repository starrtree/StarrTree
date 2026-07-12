const cssFiles = ['css/focus.css', 'css/orb-hover.css', 'css/scene-fix.css'];
cssFiles.forEach((href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});

const avatar = document.getElementById('avatar3d');
const avatarControls = document.getElementById('avatarControls');
const frontLayer = document.getElementById('orbFrontLayer');
const backLayer = document.getElementById('orbBackLayer');
const nav = document.getElementById('nav');
const intro = document.getElementById('intro');
const panel = document.getElementById('panel');
const orb = document.getElementById('orb');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const chips = document.getElementById('chips');
const deck = document.getElementById('deck');
const count = document.getElementById('count');
const status = document.getElementById('status');
const modelError = document.getElementById('modelError');
const bgVideo = document.getElementById('bgVideo');

const IS_MOBILE = matchMedia('(max-width: 860px), (pointer: coarse)').matches;
if (IS_MOBILE) document.body.classList.add('mobile-lite');

const ORB_URLS = {
  tech: 'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385128/orb-tech-mv_joc0yd.glb',
  art: 'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385128/orb-art-mv_yxdxav.glb',
  seed: 'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385129/orb-seed-of-life-mv_ij6drf.glb',
  plant: 'https://res.cloudinary.com/r9c7da2l/image/upload/v1783385129/orb-plant-bio-mv_fvbz1y.glb'
};

const orbitButtons = [...document.querySelectorAll('.starr-orb')];
const orbModels = Object.fromEntries(
  orbitButtons.map((button) => [button.dataset.orb, button.querySelector('.orb-model')])
);

function configureOrbModel(model, focused = false) {
  if (!model) return;
  model.setAttribute('camera-controls', '');
  model.setAttribute('disable-pan', '');
  model.setAttribute('camera-orbit', '0deg 75deg 5.2m');
  model.setAttribute('min-camera-orbit', 'auto 45deg 4.4m');
  model.setAttribute('max-camera-orbit', 'auto 95deg 7.2m');
  model.setAttribute('field-of-view', '28deg');
  model.setAttribute('camera-target', '0m 0m 0m');
  model.setAttribute('interaction-prompt', 'none');
  if (focused) {
    model.setAttribute('auto-rotate', '');
    model.setAttribute('auto-rotate-delay', '500');
    model.setAttribute('rotation-per-second', IS_MOBILE ? '8deg' : '14deg');
  } else {
    model.removeAttribute('auto-rotate');
  }
}

function loadOrbModel(key, focused = false) {
  const model = orbModels[key];
  if (!model) return;
  if (!model.getAttribute('src')) model.setAttribute('src', ORB_URLS[key]);
  configureOrbModel(model, focused);
  model.closest('.starr-orb')?.classList.add('has-model');
}

function unloadOrbModels(exceptButton = null) {
  Object.values(orbModels).forEach((model) => {
    const button = model?.closest('.starr-orb');
    if (!model || button === exceptButton) return;
    model.removeAttribute('src');
    button?.classList.remove('has-model');
  });
}

async function loadDesktopHomeOrbs() {
  if (IS_MOBILE || document.body.classList.contains('orb-focus')) return;
  for (const key of ['tech', 'art', 'plant', 'seed']) {
    if (document.body.classList.contains('orb-focus')) return;
    loadOrbModel(key, false);
    await new Promise((resolve) => setTimeout(resolve, 550));
  }
}

const sections = [
  ['ai','🤖','AI + Automation','#80f7ff','Custom AI agents, GPTs, workflow automations, and research systems that save time and turn scattered work into repeatable engines.',['Custom GPTs','n8n / Make','Lead systems','AI training'],[['Ịmaya Automation Builds','Lead capture, outreach, CRM cleanup, follow-ups, and virtual assistant workflows for small teams.'],['Custom AI Assistants','Personal or business GPTs trained for a specific workflow, audience, voice, or internal knowledge base.'],['Deep Research Systems','Fast research packages with clear summaries, action plans, and reusable knowledge files.']]],
  ['education','🎓','Education + Workshops','#72ff9b','AI literacy and creative technology programs for students, schools, youth organizations, and working adults.',['Youth AI','Curriculum','Workshops','Creative learning'],[['Shoot With A Camera','Film, storytelling, and AI media education for youth through hands-on creation.'],['AI Club / School Programs','Prompting, short films, app ideas, responsible AI, and project-based learning.'],['Workflow Training','Practical workshops that help adults and teams use AI without getting lost in tool overload.']]],
  ['music','🎵','Music + Audio','#b586ff','Songs, beats, vocal coaching, mobile studio recording, sound design, and music-driven brand experiences.',['Beats','Recording','Vocal presets','Theme songs'],[['Max Starr Music','R&B, alternative rap, Afro-beats, dancehall, pop, and experimental storytelling.'],['Production Services','Custom beats, theme songs, in-the-booth coaching, and mobile recording support.'],['Audio Products','BandLab vocal presets, effect chains, visualizers, and music media packs.']]],
  ['visuals','🎨','Design + Film','#ff7adf','Album covers, visualizers, short videos, logos, UI icons, pitch visuals, AI art direction, and cinematic brand assets.',['Covers','Videos','Logos','Brand assets'],[['Cover + Visualizer Packs','Cover art, motion loops, promo clips, and short-form visuals for releases.'],['Brand Identity Assets','Logos, UI icons, social graphics, slide art, and stylized promo materials.'],['AI Art Direction','Prompt systems, creative concepts, and visual pipelines for campaigns or storyworlds.']]],
  ['engineering','🚀','Web + Engineering','#ffb84d','Websites, prototypes, interfaces, 3D concepts, no-code systems, and practical technical problem solving.',['Websites','Prototypes','3D ideas','No-code'],[['Portfolio + Brand Sites','Clean web interfaces for artists, educators, local businesses, and creative service brands.'],['Prototype Builds','Fast MVP layouts, automation demos, UI concepts, and technical proof-of-concepts.'],['Future-Tech Projects','Engineering concepts, CAD-informed ideas, robotics, bionics, aerospace, and systems design.']]],
  ['starrdome','🌌','StarrDome','#9f8cff','The youth creative platform vision: kids turn ideas into characters, comics, games, stories, animations, and eventually products.',['Edutainment','Game worlds','AI characters','Creator hub'],[['Idea to Franchise','A future workflow for text-to-character, comic, animation, game asset, and toy-style creation.'],['Learn · Create · Share','A safe loop where learning unlocks creation, and creation gives kids a reason to learn more.'],['StarrDome Online','A player-built world for showcasing characters, stories, and interactive creations.']]],
  ['products','🛒','Products + Digital Shop','#ffffff','Digital products and packaged services: presets, prompt packs, templates, AI media assets, studio kits, and creative toolkits.',['Presets','Prompt packs','Templates','Media kits'],[['Vocal Presets','Affordable preset bundles and effect chains for quick artist setup.'],['AI Media Packs','Prompt packs, visual assets, icons, covers, and reusable brand materials.'],['Studio Toolkits','Recommended home studio setups and training for creators building from scratch.']]],
  ['brand','🌳','StarrTree Brand','#ffd700','The umbrella identity: music, AI, education, engineering, design, services, and storyworlds rooted in one living system.',['Rooted in Light','Cosmic tree','Creative systems','Unity'],[['Central Hub','A public-facing map of the branches: what you make, teach, sell, and build.'],['Creative Services Menu','A simplified way for visitors to understand what to book or ask about.'],['Living Portfolio','A website that can keep growing without becoming slow, cluttered, or confusing.']]]
];

let selected = 0;
let focusedOrb = null;
let sceneOrbit = 0;
let lastFrame = performance.now();
let manualUntil = 0;
let lastMobileFrame = 0;

const pinLayer = document.createElement('div');
pinLayer.className = 'pin-layer';
document.body.appendChild(pinLayer);

const backButton = document.createElement('button');
backButton.type = 'button';
backButton.className = 'orb-back';
backButton.textContent = 'Return to AxStarr';
document.body.appendChild(backButton);

function renderNav() {
  nav.innerHTML = sections.map((section, index) =>
    `<button class="${index === selected ? 'active' : ''}" data-index="${index}"><i>${section[1]}</i><span>${section[2]}</span></button>`
  ).join('');
  nav.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      closeOrbFocus(false);
      selectSection(Number(button.dataset.index), true);
    });
  });
}

function selectSection(index, show = true) {
  selected = (index + sections.length) % sections.length;
  const section = sections[selected];
  orb.textContent = section[1];
  orb.style.boxShadow = `0 0 28px ${section[3]}`;
  title.textContent = section[2];
  desc.textContent = section[4];
  chips.innerHTML = section[5].map((tag) => `<span class="chip">${tag}</span>`).join('');
  deck.innerHTML = section[6].map((card) =>
    `<article class="card"><h3>${card[0]}</h3><p>${card[1]}</p></article>`
  ).join('');
  count.textContent = `${selected + 1} / ${sections.length}`;
  renderNav();
  if (show) {
    panel.classList.add('show');
    intro.classList.add('hide');
  }
}

function renderPins(sectionIndex) {
  if (IS_MOBILE) {
    pinLayer.classList.remove('show');
    pinLayer.innerHTML = '';
    return;
  }
  const section = sections[sectionIndex];
  pinLayer.innerHTML = section[6].map((card, index) =>
    `<button class="planet-pin pin-${index}" data-card="${index}"><i>${section[1]}</i><span>${card[0]}<small>Open detail</small></span></button>`
  ).join('');
  pinLayer.classList.add('show');
  pinLayer.querySelectorAll('.planet-pin').forEach((pin) => {
    pin.addEventListener('click', () => openProjectCard(sectionIndex, Number(pin.dataset.card)));
  });
}

function openProjectCard(sectionIndex, cardIndex) {
  const section = sections[sectionIndex];
  const card = section[6][cardIndex];
  panel.classList.add('show');
  intro.classList.add('hide');
  orb.textContent = section[1];
  title.textContent = card[0];
  desc.textContent = card[1];
  chips.innerHTML = section[5].map((tag) => `<span class="chip">${tag}</span>`).join('');
  deck.innerHTML = `
    <article class="card"><h3>Project / Service Detail</h3><p>This panel is ready for images, autoplay video, audio, music links, pricing, or booking actions.</p></article>
    <article class="card"><h3>Media Slot</h3><p>Add a cover image, video, music preview, gallery, case study, or service package here.</p></article>`;
  count.textContent = `Pin ${cardIndex + 1} / ${section[6].length}`;
}

function openOrbFocus(button, target) {
  focusedOrb = button;
  unloadOrbModels(button);
  frontLayer.appendChild(button);
  loadOrbModel(button.dataset.orb, true);
  orbitButtons.forEach((item) => item.classList.remove('is-focused', 'is-opening'));
  button.classList.add('is-focused', 'is-opening');
  button.style.opacity = '1';
  setTimeout(() => button.classList.remove('is-opening'), 700);
  document.body.classList.add('orb-focus');
  selectSection(target, true);
  renderPins(target);
}

function closeOrbFocus(hidePanel = true) {
  document.body.classList.remove('orb-focus');
  orbitButtons.forEach((button) => button.classList.remove('is-focused', 'is-opening'));
  pinLayer.classList.remove('show');
  pinLayer.innerHTML = '';
  focusedOrb = null;
  if (hidePanel) {
    panel.classList.remove('show');
    intro.classList.remove('hide');
  }
  setTimeout(() => {
    if (IS_MOBILE) unloadOrbModels();
    else loadDesktopHomeOrbs();
  }, 220);
}

orbitButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    openOrbFocus(button, Number(button.dataset.target));
  });
});

function updateOrbPositions(time) {
  if (IS_MOBILE && time - lastMobileFrame < 33) {
    requestAnimationFrame(updateOrbPositions);
    return;
  }
  lastMobileFrame = time;
  const delta = Math.min(48, time - lastFrame) / 1000;
  lastFrame = time;
  if (!document.body.classList.contains('orb-focus') && time > manualUntil) {
    sceneOrbit += delta * (IS_MOBILE ? 0.10 : 0.14);
  }

  const width = innerWidth;
  const height = innerHeight;
  const radiusX = Math.min(width * (IS_MOBILE ? 0.34 : 0.30), IS_MOBILE ? 210 : 430);
  const radiusY = Math.min(height * (IS_MOBILE ? 0.24 : 0.255), IS_MOBILE ? 145 : 240);
  const centerX = width * 0.5;
  const centerY = height * (IS_MOBILE ? 0.44 : 0.485);
  const offsets = [Math.PI * 0.92, Math.PI * 0.08, Math.PI * 1.25, Math.PI * 1.75];

  orbitButtons.forEach((button, index) => {
    if (button.classList.contains('is-focused')) return;
    const angle = sceneOrbit + offsets[index];
    const depth = (Math.sin(angle) + 1) / 2;
    const x = centerX + Math.cos(angle) * radiusX;
    const y = centerY + Math.sin(angle) * radiusY * 0.72 + (index > 1 ? (IS_MOBILE ? 34 : 48) : (IS_MOBILE ? -18 : -26));
    const scale = 0.72 + depth * 0.46;
    button.style.transform = `translate(-50%,-50%) translate(${x - centerX}px,${y - centerY}px) scale(${scale})`;
    button.style.opacity = depth < 0.45 ? '0.58' : '1';
    button.classList.toggle('behind-ax', depth < 0.45);
    button.classList.toggle('front-ax', depth >= 0.45);

    const desiredLayer = depth < 0.45 ? backLayer : frontLayer;
    if (button.parentElement !== desiredLayer) desiredLayer.appendChild(button);
  });

  requestAnimationFrame(updateOrbPositions);
}

let avatarTheta = 0;
let avatarPhi = 78;
let avatarRadius = IS_MOBILE ? 7.2 : 8.2;
let dragging = false;
let lastPointerX = 0;
let lastPointerY = 0;
let velocityX = 0;
let velocityY = 0;
let momentumFrame = 0;

function applyAvatarOrbit() {
  avatarPhi = Math.max(50, Math.min(92, avatarPhi));
  avatarRadius = Math.max(IS_MOBILE ? 5.8 : 6.4, Math.min(IS_MOBILE ? 10 : 13, avatarRadius));
  avatar.setAttribute('camera-orbit', `${avatarTheta}deg ${avatarPhi}deg ${avatarRadius}m`);
  sceneOrbit = avatarTheta * Math.PI / 180;
  manualUntil = performance.now() + 1200;
}

function runMomentum() {
  cancelAnimationFrame(momentumFrame);
  const step = () => {
    velocityX *= 0.92;
    velocityY *= 0.90;
    if (Math.abs(velocityX) < 0.015 && Math.abs(velocityY) < 0.015) return;
    avatarTheta -= velocityX;
    avatarPhi += velocityY;
    applyAvatarOrbit();
    momentumFrame = requestAnimationFrame(step);
  };
  momentumFrame = requestAnimationFrame(step);
}

avatarControls.addEventListener('pointerdown', (event) => {
  dragging = true;
  cancelAnimationFrame(momentumFrame);
  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
  velocityX = 0;
  velocityY = 0;
  avatarControls.setPointerCapture(event.pointerId);
});

avatarControls.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const dx = event.clientX - lastPointerX;
  const dy = event.clientY - lastPointerY;
  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
  velocityX = dx * 0.24;
  velocityY = dy * 0.16;
  avatarTheta -= velocityX;
  avatarPhi += velocityY;
  applyAvatarOrbit();
});

function endAvatarDrag(event) {
  if (!dragging) return;
  dragging = false;
  try { avatarControls.releasePointerCapture(event.pointerId); } catch (_) {}
  runMomentum();
}

avatarControls.addEventListener('pointerup', endAvatarDrag);
avatarControls.addEventListener('pointercancel', endAvatarDrag);
avatarControls.addEventListener('wheel', (event) => {
  event.preventDefault();
  avatarRadius += event.deltaY * 0.006;
  applyAvatarOrbit();
}, { passive: false });

backButton.addEventListener('click', () => closeOrbFocus(true));
document.getElementById('brand').addEventListener('click', () => closeOrbFocus(true));
document.getElementById('explore').addEventListener('click', () => selectSection(0, true));
document.getElementById('prev').addEventListener('click', () => selectSection(selected - 1, true));
document.getElementById('next').addEventListener('click', () => selectSection(selected + 1, true));

avatar.addEventListener('load', () => {
  avatar.classList.add('loaded');
  status.textContent = IS_MOBILE ? 'Mobile Geometry Mode' : 'Live 3D Orb Mode';
  if (!IS_MOBILE) setTimeout(loadDesktopHomeOrbs, 900);
});

avatar.addEventListener('error', () => {
  avatar.classList.add('failed');
  status.textContent = 'Model Error';
  modelError.classList.add('show');
});

bgVideo.addEventListener('ended', () => document.body.classList.add('bg-ended'));
bgVideo.addEventListener('error', () => document.body.classList.add('bg-ended'));
bgVideo.play().catch(() => {
  const playOnce = () => {
    bgVideo.play().catch(() => document.body.classList.add('bg-ended'));
    document.removeEventListener('pointerdown', playOnce);
  };
  document.addEventListener('pointerdown', playOnce, { once: true });
});

renderNav();
selectSection(0, false);
panel.classList.remove('show');
requestAnimationFrame(updateOrbPositions);
