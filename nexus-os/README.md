# StarrTree Nexus OS

A React + Vite UI prototype for Max Starr's StarrTree command center.

## What this is

StarrTree Nexus OS is a visual operating dashboard for managing projects, agents, workflows, offers, cashflow lanes, and raw ideas across the StarrTree ecosystem.

## Local setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

## Production build

```bash
npm run build
npm run preview
```

Vite outputs the production build to `dist`.

## Recommended deployment

Vercel or Netlify.

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

## Current prototype features

- Nexus Home dashboard
- StarrMap visual branch map
- Project Rooms
- Agent Bay
- Cashflow Cockpit
- Idea Incubator
- Command bar simulation
- Mock StarrTree project data

## Next build layer

- Save projects to localStorage
- Add real project creation/editing
- Add webhook-ready agent buttons
- Add Supabase or Airtable storage
- Add n8n/Make workflow endpoints
- Add GitHub issue/PR creation from project rooms
