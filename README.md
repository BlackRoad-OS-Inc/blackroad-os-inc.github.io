# BlackRoad OS, Inc.

**Your AI. Your Hardware. Your Rules.**

Corporate GitHub Pages site for [BlackRoad OS, Inc.](https://github.com/BlackRoad-OS-Inc) — a self-hosted AI platform powering 30,000 agents across Pi fleets, cloud, and edge.

## Live Site

**[blackroad-os-inc.github.io](https://blackroad-os-inc.github.io/)**

## Overview

BlackRoad OS is a self-hosted AI platform built for hardware sovereignty. It orchestrates thousands of autonomous agents across distributed infrastructure — Raspberry Pi fleets, edge clusters, and cloud — with zero per-token API costs.

### Key Highlights

- **30,000 AI Agents** — Distributed autonomous agent orchestration
- **17 Organizations** — Cross-org infrastructure coordination
- **1,800+ Repositories** — Extensive open and internal tooling
- **$0 AI Cost Target** — Own your inference stack, eliminate API fees

## Site Features

- Responsive, mobile-first design with animated hero section
- Glassmorphic sticky navigation bar
- Feature cards highlighting platform capabilities
- Key metrics dashboard
- Custom 404 error page
- Full SEO (Open Graph, Twitter Cards, JSON-LD structured data)
- Accessibility (skip navigation, ARIA landmarks, focus management)
- `robots.txt` and `sitemap.xml` for search engine indexing
- SVG favicon

## Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Hosting     | GitHub Pages                   |
| Framework   | Static HTML/CSS (no build)     |
| Fonts       | Google Fonts (Inter)           |
| CI/CD       | GitHub Actions                 |
| Testing     | Jest + jsdom                   |

## Development

### Prerequisites

- Node.js >= 18

### Install & Test

```bash
npm install
npm test
```

### Project Structure

```
├── index.html          # Main site
├── 404.html            # Custom error page
├── favicon.svg         # Site favicon
├── robots.txt          # Search engine directives
├── sitemap.xml         # Sitemap for SEO
├── LICENSE             # Proprietary license
├── .nojekyll           # Bypass Jekyll on GitHub Pages
├── package.json        # Test dependencies
├── __tests__/
│   └── index.test.js   # DOM structure tests (13 assertions)
└── .github/
    └── workflows/
        └── ci.yml      # CI pipeline + Pages deployment
```

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

1. **Test** — Runs the Jest test suite against the DOM structure
2. **Validate** — Checks that required HTML files exist
3. **Deploy** — Deploys to GitHub Pages on push to `main`

## License

Proprietary — All Rights Reserved. See [LICENSE](LICENSE) for details.

## Links

- [BlackRoad OS, Inc. on GitHub](https://github.com/BlackRoad-OS-Inc)
- [BlackRoad OS Platform](https://blackroad.io)

---

© 2026 BlackRoad OS, Inc. All rights reserved.
