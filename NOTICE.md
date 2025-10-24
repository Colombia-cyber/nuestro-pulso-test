# Security Notice

I did not include or push any real API keys. Never push keys to the repo.

## Security Guidelines

### Local Development
- Keep real keys out of committed files
- Use `.env.local` for local development and add it to `.gitignore`
- Never commit `.env` files with real credentials

### Production Deployment
- Store production keys in your hosting platform's secret manager:
  - **Vercel**: Environment Variables in Project Settings
  - **Netlify**: Environment Variables in Site Settings
  - **GitHub Actions**: Repository Secrets

### If a Key Was Accidentally Committed
If you accidentally commit a real API key:

1. **Immediately revoke and rotate the key** in the service provider's console
2. **Scrub git history** using tools like:
   - [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
   - `git filter-repo` (recommended)
3. **Force push** the cleaned history (coordinate with team members)
4. **Verify** the key is completely removed from all branches and history

### Best Practices
- Use `.env.example` with placeholder values only
- Document which API keys are required
- Set up environment-specific configurations
- Enable secret scanning in your repository settings
- Regularly audit your codebase for exposed credentials
