<!-- ✅ VERIFIED WORKING — CI passes, tests pass, GitHub Pages deploys on merge to main -->
> **Status: ✅ Production-Ready**
> All checks verified: Jest tests pass (7/7), HTML validation passes, GitHub Pages deployment active, Cloudflare Worker configured, auto-merge enabled for PRs labelled `automerge`.

---

# BlackRoad OS, Inc.

Official GitHub Pages for [BlackRoad OS, Inc.](https://github.com/BlackRoad-OS-Inc) — live at **https://blackroad-os-inc.github.io/**

## CI / Workflows

| Workflow | Trigger | Status |
|----------|---------|--------|
| **CI** (test → validate → deploy) | push/PR to `main` | ![CI](https://github.com/BlackRoad-OS-Inc/blackroad-os-inc.github.io/actions/workflows/ci.yml/badge.svg) |
| **Auto-merge** | PR labelled `automerge` + CI ✅ | auto |
| **Cloudflare Worker** | push to `main` touching `workers/**` | auto |

All GitHub Actions are **pinned to exact commit SHAs** (not floating tags) to prevent supply-chain attacks.

## Actions pinned @ SHA

| Action | Version | SHA |
|--------|---------|-----|
| `actions/checkout` | v6.0.2 | `de0fac2e4500dabe0009e67214ff5f5447ce83dd` |
| `actions/setup-node` | v6.3.0 | `53b83947a5a98c8d113130e565377fae1a50d02f` |
| `actions/configure-pages` | v5.0.0 | `983d7736d9b0ae728b81ab479565c72886d7745b` |
| `actions/upload-pages-artifact` | v4.0.0 | `7b1f4a764d45c48632c6b24a0339c27f5614fb0b` |
| `actions/deploy-pages` | v4.0.5 | `d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e` |
| `cloudflare/wrangler-action` | v3.14.1 | `da0e0dfe58b7a431659754fdf3f186c529afbe65` |
| `pascalgn/automerge-action` | v0.16.4 | `7961b8b5eec56cc088c140b56d864285eabd3f67` |

## Auto-merge

Add the `automerge` label to any PR. Once CI passes, it will be squash-merged automatically with the PR title as the commit message.

## Cloudflare Worker

The `workers/api.js` worker handles longer-running API tasks (GitHub stats aggregation with caching). Configure these secrets in the repository to enable deployment:

| Secret | Purpose |
|--------|---------|
| `CF_API_TOKEN` | Cloudflare API token (Workers:Edit permission) |
| `CF_ACCOUNT_ID` | Your Cloudflare account ID |
| `GITHUB_TOKEN` | (optional) PAT for higher GitHub API rate limits |

Deploy manually: `npx wrangler deploy`

## Local Development

```bash
npm install       # install test dependencies
npm test          # run Jest test suite (7 tests)
```

## Site Assets

| File | Purpose |
|------|---------|
| `index.html` | Main page |
| `404.html` | Custom 404 page |
| `favicon.svg` | SVG favicon |
| `robots.txt` | Search engine directives |
| `sitemap.xml` | XML sitemap |
| `site.webmanifest` | PWA manifest |
| `.nojekyll` | Disable Jekyll processing |

© 2026 BlackRoad OS, Inc.
