# Sentraflux

**Internal Engineering Core Documentation** — a clean, single-page static website that presents Sentraflux's architecture, services, infrastructure, dataset management, and branching strategy to the core engineering team.

---

## What Is This?

This repository hosts the **static documentation site** for the Sentraflux platform.  
Sentraflux is a cloud-native security intelligence platform that observes live web-application traffic and provides actionable security insights for DevOps teams.

The site covers:

| Section | Content |
|---------|---------|
| 1 | Project Overview |
| 2 | Core System Philosophy |
| 3 | System Architecture |
| 4 | Repository Structure |
| 5 | Service Structure |
| 6 | Infrastructure |
| 7 | Dataset Management |
| 8 | GitHub Branching Strategy |

---

## Project Structure

```
Sentraflux-private/
├── index.html      # Main documentation page (all sections)
├── styles.css      # All styling (layout, cards, responsive)
├── script.js       # Sidebar active-link highlighting & mobile menu
└── vercel.json     # Vercel static deployment configuration
```

---

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no frameworks or build tools required
- **Google Fonts (Inter)** — loaded via CDN
- **Vercel** — static hosting (`@vercel/static`)

---

## Running Locally

Because the site is plain HTML with no build step, you can run it three different ways:

### Option 1 — Open directly in a browser (simplest)

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows (PowerShell)
start index.html
```

### Option 2 — Python built-in HTTP server (recommended)

```bash
# Python 3
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

### Option 3 — Node.js `serve` package

```bash
npx serve .

# Then open the URL printed in the terminal (usually http://localhost:3000)
```

---

## Deployment

The site is configured for **Vercel** via `vercel.json`.

### Deploy with the Vercel CLI

```bash
# Install the Vercel CLI (one-time)
npm install -g vercel

# Deploy (follow the prompts)
vercel

# Deploy to production
vercel --prod
```

### Deploy via GitHub integration

1. Push this repository to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Vercel auto-detects the static configuration — no build settings needed.
4. Every push to `main` triggers an automatic production deployment.

---

## Branching Strategy

| Branch | Purpose | Policy |
|--------|---------|--------|
| `main` | Production-ready code | No direct commits |
| `develop` | Integration branch for completed features | — |
| `feature/*` | Individual feature development | — |
| `hotfix/*` | Critical production fixes | — |
| `release/*` | Release preparation & staging | — |

Branch naming format:

```
feature/<short-description>
hotfix/<issue-id>-<description>
release/<version>
```

---

## License

Internal use only · Sentraflux Engineering Team
