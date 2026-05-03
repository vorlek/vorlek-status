# vorlek-status

Vorlek's public status page, powered by [Gatus](https://github.com/TwiN/gatus) and deployed to Fly.io.

Production URL: [status.vorlek.com](https://status.vorlek.com)

Fly URL: [vorlek-status.fly.dev](https://vorlek-status.fly.dev)

## What Runs Here

This repo has replaced the legacy Upptime-generated codebase with a small Gatus deployment:

- `config/config.yaml` — Vorlek monitor definitions, Gatus UI settings, and SQLite storage settings.
- `Dockerfile` — builds from the upstream `ghcr.io/twin/gatus:stable` image.
- `fly.toml` — Fly.io app config for the `vorlek-status` app.
- `.github/workflows/deploy.yml` — deploys `main` to Fly.io.
- `assets/` — Vorlek logo and favicon used by the Gatus UI.

The old Upptime workflows, generated API JSON, graph images, history files, and GitHub Pages `CNAME` have been removed from `main`.

## Local Run

```bash
docker build -t vorlek-status:gatus .
docker run --rm \
  -p 8080:8080 \
  -v "$PWD/data:/data" \
  vorlek-status:gatus
```

Then open `http://localhost:8080/`.

Useful checks:

```bash
curl http://localhost:8080/
curl http://localhost:8080/api/v1/endpoints/statuses
```

## Deploy

Manual deploy:

```bash
flyctl deploy -a vorlek-status --remote-only
```

The app expects a persistent Fly volume named `gatus_data` mounted at `/data` for SQLite history.

The custom domain points directly at the Fly app:

```text
CNAME status.vorlek.com -> 93kn1o2.vorlek-status.fly.dev
```

Fly also accepts direct A/AAAA records:

```text
A    status.vorlek.com -> 66.241.124.206
AAAA status.vorlek.com -> 2a09:8280:1::10f:e07e:0
```

Keep the record DNS-only unless Cloudflare proxying is intentionally enabled with cache rules that bypass Gatus API routes.

## Monitors

The current monitor set mirrors the previous Upptime configuration:

- API health: `https://api.vorlek.com/health`
- Dashboard: `https://dashboard.vorlek.com/`
- Docs: `https://vorlek.dev/SKILL.md`
- ci-live last green: `https://api.vorlek.com/status/ci-live`
- MCP package: `https://registry.npmjs.org/@vorlek/email-mcp`
- TypeScript SDK package: `https://registry.npmjs.org/@vorlek/sdk`
- Python SDK package: `https://pypi.org/pypi/vorlek/json`
