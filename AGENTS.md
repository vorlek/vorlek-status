# Repo Instructions

This repo contains Vorlek's public status page, powered by Gatus and deployed to Fly.io. Product strategy, spikes, and cross-repo planning live in the sibling `../ideation/agent-api-aggregator/` checkout when available.

## Commit Identity

Every commit to this repo must be authored as `tmatow4 <tmatow4@gmail.com>`.

At the start of any session that will commit to a Vorlek repo, verify:

```bash
git config user.name
git config user.email
```

If needed, set repo-local config:

```bash
git config user.name tmatow4
git config user.email tmatow4@gmail.com
```

## Documentation Hygiene

- Keep `README.md` updated when monitor definitions, local run steps, deploy flow, DNS details, Gatus storage, or repo layout changes.
- Keep `CHANGELOG.md` updated for monitor changes, deploy changes, status-page UI changes, notable fixes, and production verification milestones.
- Prefer concise implementation notes here; keep broad product strategy and spike journals in the ideation repo.

## Verification

- For monitor/config changes, validate `config/config.yaml` structure and run the Docker image locally when practical.
- Useful local checks after starting the container: `curl http://localhost:8080/` and `curl http://localhost:8080/api/v1/endpoints/statuses`.
- For deployment changes, verify the Fly deployment and public `https://status.vorlek.com` status page.

## Operational Notes

- Do not commit real status database state unless it is intentionally part of the repo.
- Treat DNS, Fly volume, and public monitor changes as operational changes and document the verification result.
