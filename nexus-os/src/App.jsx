import { useMemo, useState } from 'react';

const branches = [
  { name: 'AI Work', icon: '🤖', health: 82, color: '#4bc9ff', x: 84, y: 16, desc: 'Agents, automations, client systems, n8n, Make, Google Workspace.' },
  { name: 'Education', icon: '🎓', health: 66, color: '#7cff6b', x: 17, y: 13, desc: 'StarrDome, OZI, youth AI programs, creative curriculum.' },
  { name: 'Music', icon: '🎵', health: 44, color: '#ff6bd6', x: 10, y: 72, desc: 'Releases, visuals, performance, AlienZ Social, sync opportunities.' },
  { name: 'Design & Film', icon: '🎬', health: 58, color: '#8f5cff', x: 91, y: 81, desc: 'Visual prompts, covers, shorts, client creative assets, cinematic systems.' },
  { name: 'Engineering', icon: '🛠', health: 54, color: '#c6d1ff', x: 31, y: 91, desc: 'StarrLign, apps, hardware ideas, websites, prototypes.' },
  { name: 'Cashflow', icon: '💸', health: 50, color: '#7cff6b', x: 70, y: 93, desc: 'Offers, invoices, service packages, subscriptions, products.' },
  { name: 'Personal Ops', icon: '🧘🏾', health: 35, color: '#a66a3f', x: 36, y: 18, desc: 'Focus, wellness, schedule, admin, spiritual practices, life maintenance.' }
];

const startingProjects = [
  { title: 'StarrTree Nexus OS', branch: 'Engineering', status: 'Active Build', progress: 38, accent: '#ffd700', next: 'Convert prototype into a Vite repo and wire real data next.', agent: 'Builder + UNI Core', cash: 'Internal tool' },
  { title: 'AI Website Service', branch: 'AI Work', status: 'Launch Soon', progress: 72, accent: '#4bc9ff', next: 'Create offer page and lead list for local businesses.', agent: 'Lead Scout + Cashflow', cash: '$750 starter offer' },
  { title: 'StarrDome MVP', branch: 'Education', status: 'Strategy', progress: 56, accent: '#7cff6b', next: 'Condense MVP pitch into parent/student demo flow.', agent: 'Curriculum Architect', cash: 'Grant / platform' },
  { title: 'AI Creatives Club', branch: 'Education', status: 'Program Ops', progress: 64, accent: '#7cff6b', next: 'Package lesson plan + student outcomes.', agent: 'Curriculum Architect', cash: 'School program' },
  { title: 'Max Starr Music Promo System', branch: 'Music', status: 'Needs Motion', progress: 32, accent: '#ff6bd6', next: 'Build weekly release/content cadence.', agent: 'Music Ops + Content', cash: 'Audience growth' },
  { title: 'HVAC Permit Agent', branch: 'AI Work', status: 'Automation R&D', progress: 46, accent: '#4bc9ff', next: 'Map jurisdiction intake to doc checklist.', agent: 'Automation Architect', cash: 'Work efficiency' },
  { title: 'StarrLign Finance Upgrade', branch: 'Engineering', status: 'Feature Spec', progress: 41, accent: '#c6d1ff', next: 'Design recurring expenses and variables UI.', agent: 'Builder + Cashflow', cash: 'Personal OS' },
  { title: 'AlienZ Social', branch: 'Music', status: 'Incubating', progress: 29, accent: '#ff6bd6', next: 'Define member experience and first event/content product.', agent: 'Content Engine', cash: 'Events / merch' }
];

const agents = [
  { name: 'UNI Core', icon: '🧠', role: 'Master orchestrator. Routes requests, prioritizes, and asks for approval when actions matter.', status: 'online', color: '#ffd700', last: 'Mapped StarrTree Nexus OS structure.' },
  { name: 'Strategist', icon: '♟️', role: 'Turns chaotic ideas into plans, milestones, and next moves.', status: 'idle', color: '#8f5cff', last: 'Suggested three pressure moves for today.' },
  { name: 'Builder', icon: '⚙️', role: 'Creates UI specs, code prompts, feature breakdowns, and implementation plans.', status: 'working', color: '#c6d1ff', last: 'Building prototype UI shell.' },
  { name: 'Automation Architect', icon: '🔁', role: 'Designs n8n, Make, Airtable, Google Workspace, and webhook workflows.', status: 'online', color: '#4bc9ff', last: 'Ready to draft workflow forge templates.' },
  { name: 'Lead Scout', icon: '🛰️', role: 'Finds and scores businesses, grants, partnerships, and opportunity leads.', status: 'needs approval', color: '#4bc9ff', last: 'Waiting for target niche approval.' },
  { name: 'Content Engine', icon: '🎥', role: 'Generates scripts, post ideas, captions, visuals, and campaign angles.', status: 'idle', color: '#ff6bd6', last: 'Prepared StarrTree content categories.' },
  { name: 'Curriculum Architect', icon: '📚', role: 'Builds youth AI lessons, activities, rubrics, and program structures.', status: 'online', color: '#7cff6b', last: 'Mapped Learn-Create-Share flow.' },
  { name: 'Music Ops', icon: '🎧', role: 'Tracks releases, visuals, gig tasks, playlists, and promo cycles.', status: 'idle', color: '#ff6bd6', last: 'Music branch needs fresh launch cadence.' },
  { name: 'Cashflow Agent', icon: '💵', role: 'Turns services into offers, pricing, payment steps, and revenue lanes.', status: 'online', color: '#7cff6b', last: 'Flagged fastest $750 starter offer.' },
  { name: 'QA Sentinel', icon: '🛡️', role: 'Checks missing pieces, broken workflows, risk points, and launch blockers.', status: 'idle', color: '#ff4d5d', last: 'No live automations connected yet.' }
];

const cashLanes = [
  { lane: 'AI Automations', offer: 'n8n/Make workflow build', range: '$1,500–$3,500', stage: 'High priority' },
  { lane: 'Custom GPTs', offer: 'Custom assistant + training', range: '$300–$3,000', stage: 'Package offer' },
  { lane: 'Website Refresh', offer: 'Static site + AI visuals/content', range: '$750–$2,500', stage: 'Fastest sell' },
  { lane: 'Curriculum / Workshops', offer: 'Youth AI program modules', range: '$1,500–$5,000', stage: 'Strong alignment' },
  { lane: 'Music Services', offer: 'Beats, recording, visuals', range: '$150–$2,500', stage: 'Needs promotion' },
  { lane: 'Visual Design', offer: 'Covers, social assets, video prompts', range: '$100–$800', stage: 'Easy entry' },
  { lane: 'IT Support', offer: 'Tech setup + workflow improvement', range: '$200–$1,000', stage: 'Local trust' },
  { lane: 'StarrDome', offer: 'Platform/grant/startup path', range: 'Future scalable', stage: 'MVP track' }
];

const startingIdeas = [
  { title: 'Local Business Website Agent', detail: 'Find small local companies with old websites and generate pitch packets.', scores: [9, 9, 5, 9, 8], route: 'Build now' },
  { title: 'StarrTree Content Radar', detail: 'A daily system that turns projects into short-form content ideas.', scores: [8, 6, 4, 10, 7], route: 'Turn into workflow' },
  { title: 'Kids AI Character Builder', detail: 'Simple demo where students create characters, comics, and game scenes.', scores: [10, 7, 8, 10, 7], route: 'MVP sprint' }
];

const screenCopy = {
  home: ['Nexus Home', 'Your command center for projects, agents, workflows, offers, and cashflow.'],
  map: ['StarrMap', 'A visual constellation tree showing branches, project gravity, and where your energy is going.'],
  projects: ['Project Rooms', 'Every project gets a cockpit: vision, tasks, launch stage, agents, files, and cashflow.'],
  agents: ['Agent Bay', 'Your controllable AI worker layer. See roles, permissions, status, and last actions.'],
  cash: ['Cashflow Cockpit', 'Turn your skills and projects into visible offers, lanes, packages, and next sales moves.'],
  ideas: ['Idea Incubator', 'Catch raw ideas, score them, and route them before they become mental clutter.']
};

const nav = [['home', '⌘', 'Nexus Home'], ['map', '✦', 'StarrMap'], ['projects', '⬡', 'Project Rooms'], ['agents', '◈', 'Agent Bay'], ['cash', '◆', 'Cashflow'], ['ideas', '✺', 'Idea Incubator']];

function Bar({ value, color }) {
  return <div className="bar"><i style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, var(--gold))` }} /></div>;
}

function Tag({ children, tone = '' }) {
  return <span className={`tag ${tone}`}>{children}</span>;
}

function scoreIdea(title, detail) {
  const text = `${title} ${detail}`.toLowerCase();
  const cash = /client|money|sell|sales|offer|business|lead|website|cash|revenue/.test(text) ? 9 : 5;
  const align = /starr|ai|music|education|kid|workflow|agent|creative|website/.test(text) ? 9 : 6;
  const effort = /platform|app|marketplace|backend|full|complex/.test(text) ? 8 : 4;
  const impact = Math.min(10, Math.round((cash + align + (10 - effort)) / 3 + 3));
  const urgent = cash >= 8 ? 8 : 5;
  const route = cash >= 8 && effort <= 5 ? 'Build now' : align >= 8 ? 'MVP sprint' : 'Schedule later';
  return { scores: [impact, cash, effort, align, urgent], route };
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [projects, setProjects] = useState(startingProjects);
  const [ideas, setIdeas] = useState(startingIdeas);
  const [selectedNode, setSelectedNode] = useState('StarrSeed');
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState('');
  const [command, setCommand] = useState('');
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDetail, setIdeaDetail] = useState('');
  const meta = screenCopy[screen];
  const nodeDetail = branches.find((branch) => branch.name === selectedNode);
  const relatedProjects = useMemo(() => selectedNode === 'StarrSeed' ? projects.slice(0, 4) : projects.filter((project) => project.branch === selectedNode), [projects, selectedNode]);

  const flash = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const routeCommand = () => {
    if (!command.trim()) return flash('Drop a command first. Example: Build a lead tracker for local website clients.');
    setIdeas((current) => [{ title: command.trim().slice(0, 56), detail: `Command captured: ${command.trim()}`, scores: [8, 8, 5, 9, 8], route: 'UNI routed' }, ...current]);
    setScreen('ideas');
    setCommand('');
    flash('UNI Core simulated: command captured as a new StarrSeed.');
  };

  const addIdea = () => {
    const title = ideaTitle.trim() || 'Untitled StarrSeed';
    const detail = ideaDetail.trim() || 'Raw idea captured without details yet.';
    const scored = scoreIdea(title, detail);
    setIdeas((current) => [{ title, detail, ...scored }, ...current]);
    setIdeaTitle('');
    setIdeaDetail('');
    flash(`Seed scored: ${scored.route}.`);
  };

  const promoteIdea = (idea) => {
    setProjects((current) => [{ title: idea.title, branch: 'AI Work', status: 'Seed Promoted', progress: 12, accent: '#ffd700', next: 'Define spec, agent owner, and first launch step.', agent: 'UNI Core', cash: idea.route }, ...current]);
    setScreen('projects');
    flash(`${idea.title} promoted into Project Rooms.`);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-card"><div className="brand-orb" /><div><h1>StarrTree</h1><span>Nexus OS</span></div></div>
        <nav className="nav-stack">
          {nav.map(([id, glyph, label]) => <button key={id} className={screen === id ? 'active' : ''} onClick={() => setScreen(id)}><span className="glyph">{glyph}</span>{label}</button>)}
        </nav>
        <section className="side-panel"><h3>Branch Health</h3><div className="mini-meter">{branches.slice(0, 5).map((branch) => <div className="meter-row" key={branch.name}><div className="meter-top"><span>{branch.name}</span><span>{branch.health}%</span></div><Bar value={branch.health} color={branch.color} /></div>)}</div></section>
        <section className="side-panel compact"><h3>Mode</h3><p>Build Season</p><small>Prototype state. Agent buttons are simulations until webhooks are connected.</small></section>
      </aside>

      <main className="main-stage">
        <header className="topbar"><div><p className="eyebrow">StarrTree Command Layer</p><h2>{meta[0]}</h2><p className="subtitle">{meta[1]}</p></div><button className="primary-btn" onClick={() => setScreen('ideas')}>+ New StarrSeed</button></header>
        <section className="command-card"><div><strong>Command Bar</strong><span>Ask, create, route, query, or turn chaos into a buildable plan.</span></div><input value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && routeCommand()} placeholder="Build a lead tracker for local website clients..." /><button onClick={routeCommand}>Route</button></section>

        {screen === 'home' && <Home projects={projects} onOpen={setSelectedProject} />}
        {screen === 'map' && <StarrMap selectedNode={selectedNode} setSelectedNode={setSelectedNode} nodeDetail={nodeDetail} relatedProjects={relatedProjects} onOpen={setSelectedProject} />}
        {screen === 'projects' && <section className="card-grid">{projects.map((project) => <ProjectCard key={`${project.title}-${project.progress}`} project={project} onOpen={() => setSelectedProject(project)} />)}</section>}
        {screen === 'agents' && <section className="card-grid agents-grid">{agents.map((agent) => <AgentCard key={agent.name} agent={agent} onPing={() => flash(`${agent.name} simulated. Real connection comes after webhook/API layer.`)} />)}</section>}
        {screen === 'cash' && <section className="cash-stack">{cashLanes.map((lane) => <div className="cash-lane" key={lane.lane}><div><strong>{lane.lane}</strong><small>{lane.offer}</small></div><div><span className="money">{lane.range}</span><small>potential range</small></div><Tag tone={lane.stage.includes('Fastest') ? 'green' : 'blue'}>{lane.stage}</Tag><button className="ghost-btn" onClick={() => flash(`Offer builder simulated for ${lane.lane}.`)}>Build Offer</button></div>)}</section>}
        {screen === 'ideas' && <Ideas ideas={ideas} ideaTitle={ideaTitle} ideaDetail={ideaDetail} setIdeaTitle={setIdeaTitle} setIdeaDetail={setIdeaDetail} addIdea={addIdea} promoteIdea={promoteIdea} />}
      </main>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
}

function Home({ projects, onOpen }) {
  return <section className="screen-grid"><div className="hero-card"><div className="starrseed-orb">✦</div><p className="eyebrow">Origin Node</p><h3>Today’s Pressure Points</h3><div className="task-stack"><Task index="1" title="Ship this UI into GitHub" body="Get the Nexus OS prototype into a real React/Vite workspace." done /><Task index="2" title="Package the website refresh offer" body="Make the fastest cashflow lane sellable this week." /><Task index="3" title="Choose first webhook target" body="Decide whether Agent Bay connects to n8n, Make, Airtable, or GitHub issues first." /></div></div><div className="panel-card"><h3>Agent Alerts</h3><Task index="◈" title="Lead Scout" body="12 possible local business leads ready to research." /><Task index="↳" title="Builder" body="React/Vite workspace staged for GitHub iteration." /><Task index="$" title="Cashflow Agent" body="Website refresh offer is the fastest package to sell." /><Task index="!" title="QA Sentinel" body="No real integrations connected yet. Prototype mode only." /></div><div className="panel-card wide"><h3>Active Branch Health</h3><div className="branch-health-grid">{branches.map((branch) => <div className="branch-row" key={branch.name}><strong>{branch.icon} {branch.name}</strong><Bar value={branch.health} color={branch.color} /><span>{branch.health}%</span></div>)}</div></div><div className="panel-card wide"><h3>Launch Queue</h3><div className="project-strip">{projects.slice(0, 5).map((project) => <button key={project.title} className="launch-chip" onClick={() => onOpen(project)}><span>{project.progress}%</span><strong>{project.title}</strong><small>{project.next}</small></button>)}</div></div></section>;
}

function StarrMap({ selectedNode, setSelectedNode, nodeDetail, relatedProjects, onOpen }) {
  return <section className="map-layout"><div className="cosmic-map"><svg className="branch-lines" viewBox="0 0 100 100" preserveAspectRatio="none">{branches.map((branch) => <line key={branch.name} x1="50" y1="50" x2={branch.x} y2={branch.y} />)}</svg><button className={`node core ${selectedNode === 'StarrSeed' ? 'selected' : ''}`} style={{ left: '50%', top: '50%' }} onClick={() => setSelectedNode('StarrSeed')}><strong>STARRSEED<br />CORE</strong><small>Origin Node</small></button>{branches.map((branch) => <button key={branch.name} className={`node ${selectedNode === branch.name ? 'selected' : ''}`} style={{ left: `${branch.x}%`, top: `${branch.y}%`, '--c': branch.color }} onClick={() => setSelectedNode(branch.name)}><strong>{branch.icon}<br />{branch.name}</strong><small>{branch.health}% health</small></button>)}</div><aside className="panel-card map-inspector"><Tag tone="hot">Selected Node</Tag><h3>{selectedNode === 'StarrSeed' ? 'StarrSeed Core' : `${nodeDetail?.icon} ${nodeDetail?.name}`}</h3><p>{selectedNode === 'StarrSeed' ? 'Origin node for all branches. Use this when you need to zoom out and decide what matters.' : nodeDetail?.desc}</p><div className="task-stack">{relatedProjects.length ? relatedProjects.map((project) => <Task key={project.title} index={`${project.progress}%`} title={project.title} body={project.next} onClick={() => onOpen(project)} />) : <p className="muted">No active projects mapped here yet.</p>}</div></aside></section>;
}

function Ideas({ ideas, ideaTitle, ideaDetail, setIdeaTitle, setIdeaDetail, addIdea, promoteIdea }) {
  return <section className="idea-layout"><div className="panel-card idea-form"><Tag tone="hot">Capture Seed</Tag><h3>Turn a raw thought into a routed system object.</h3><input value={ideaTitle} onChange={(e) => setIdeaTitle(e.target.value)} placeholder="Idea title" /><textarea value={ideaDetail} onChange={(e) => setIdeaDetail(e.target.value)} placeholder="Describe the idea, who it helps, and what it could become..." /><button className="primary-btn" onClick={addIdea}>Score StarrSeed</button></div><div className="idea-list">{ideas.map((idea) => <IdeaCard key={`${idea.title}-${idea.detail}`} idea={idea} onPromote={() => promoteIdea(idea)} />)}</div></section>;
}

function Task({ index, title, body, done = false, onClick }) {
  const Comp = onClick ? 'button' : 'div';
  return <Comp className={`task ${done ? 'done' : ''}`} onClick={onClick}><span className="check">{done ? '✓' : index}</span><span><strong>{title}</strong><small>{body}</small></span></Comp>;
}

function ProjectCard({ project, onOpen }) {
  return <button className="panel-card project-card" onClick={onOpen}><div className="project-head"><div><Tag tone="hot">{project.branch}</Tag><h3>{project.title}</h3></div><div className="progress-ring" style={{ '--p': `${project.progress * 3.6}deg`, '--accent': project.accent }}><span>{project.progress}%</span></div></div><p>{project.next}</p><div className="tag-row"><Tag tone="blue">{project.status}</Tag><Tag>{project.agent}</Tag><Tag tone="green">{project.cash}</Tag></div></button>;
}

function AgentCard({ agent, onPing }) {
  const statusColors = { online: '#7cff6b', idle: '#a79aba', working: '#ffd700', 'needs approval': '#ff4d5d' };
  return <article className="panel-card agent-card"><div className="agent-top"><span className="agent-avatar" style={{ backgroundColor: `${agent.color}18`, borderColor: `${agent.color}55` }}>{agent.icon}</span><Tag>{agent.status}</Tag></div><h3>{agent.name}</h3><p>{agent.role}</p><div className="status-line" style={{ '--st': statusColors[agent.status] }}><span />{agent.last}</div><button className="ghost-btn" onClick={onPing}>Ping Agent</button></article>;
}

function IdeaCard({ idea, onPromote }) {
  return <article className="panel-card idea-card"><div className="project-head"><div><Tag tone="hot">{idea.route}</Tag><h3>{idea.title}</h3></div><button className="ghost-btn" onClick={onPromote}>Promote</button></div><p>{idea.detail}</p><div className="score-grid">{['Impact', 'Cash', 'Effort', 'Align', 'Urgent'].map((label, index) => <div className="score" key={label}><strong>{idea.scores[index]}</strong><span>{label}</span></div>)}</div></article>;
}

function ProjectModal({ project, onClose }) {
  const complete = Math.round(project.progress / 14);
  const steps = ['Idea captured', 'Spec written', 'Assets gathered', 'Build started', 'Tested', 'Offer/publish path defined', 'Launch', 'Improve from feedback'];
  return <div className="modal-backdrop" onClick={onClose}><article className="modal-card" onClick={(e) => e.stopPropagation()}><button className="close-btn" onClick={onClose}>×</button><Tag tone="hot">Project Room</Tag><h2>{project.title}</h2><p>{project.branch} • {project.status} • {project.agent}</p><div className="modal-stats"><div><Tag tone="hot">Progress</Tag><strong>{project.progress}%</strong><small>{project.status}</small></div><div><Tag tone="blue">Agent</Tag><strong>{project.agent}</strong><small>Assigned worker layer</small></div><div><Tag tone="green">Cash</Tag><strong>{project.cash}</strong><small>Revenue/value lane</small></div></div><div className="next-card"><h3>Next Action</h3><p>{project.next}</p></div><div className="launch-steps">{steps.map((step, index) => <div className="step" key={step}><span className="check">{index + 1}</span><strong>{step}</strong><Tag tone={index < complete ? 'green' : ''}>{index < complete ? 'done' : 'wait'}</Tag></div>)}</div></article></div>;
}
