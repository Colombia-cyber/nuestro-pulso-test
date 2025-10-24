```markdown
I did not include or push any real API keys. Never push keys to the repo.

Security notes:
- Keep real keys out of committed files. Use .env.local for local development and add it to .gitignore.
- Store production keys in your host's secret manager (Vercel/Netlify/GitHub Actions Secrets).
- If a key was accidentally committed, revoke and rotate it immediately and scrub git history using BFG or git-filter-repo.
```
