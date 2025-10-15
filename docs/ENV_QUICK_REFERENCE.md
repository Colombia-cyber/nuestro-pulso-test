# Environment Variables Quick Reference

## 🚀 Quick Setup

```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit .env and add your API keys
nano .env

# 3. Restart dev server
npm run dev
```

## 📋 Variable Naming Convention

| Location | Pattern | Example |
|----------|---------|---------|
| **Frontend** (src/) | `import.meta.env.VITE_*` | `VITE_YOUTUBE_API_KEY` |
| **Backend** (server/) | `process.env.*` | `YOUTUBE_API_KEY` |

⚠️ **Important**: Frontend variables MUST have `VITE_` prefix!

## ✅ Required Variables

### Frontend
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
```

### Backend
```bash
FRONTEND_URL=http://localhost:5173
PORT=3001
```

## 🔧 Optional API Keys

### YouTube Content
```bash
# Frontend
VITE_YOUTUBE_API_KEY=your_youtube_key

# Backend
YOUTUBE_API_KEY=your_youtube_key
```

### News APIs
```bash
# Frontend
VITE_NEWSAPI_KEY=your_newsapi_key
VITE_GUARDIAN_KEY=your_guardian_key

# Backend (supports both for compatibility)
NEWSAPI_KEY=your_newsapi_key
GUARDIAN_KEY=your_guardian_key
```

### Google Custom Search
```bash
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_CSE_ID=your_search_engine_id
VITE_GOOGLE_CX=your_search_engine_id
```

### Social Media (All Frontend)
```bash
# TikTok
VITE_TIKTOK_CLIENT_KEY=your_tiktok_key
VITE_TIKTOK_CLIENT_SECRET=your_tiktok_secret

# Instagram
VITE_INSTAGRAM_ACCESS_TOKEN=your_instagram_token
VITE_INSTAGRAM_APP_ID=your_instagram_app_id

# Facebook
VITE_FACEBOOK_ACCESS_TOKEN=your_facebook_token
VITE_FACEBOOK_APP_ID=your_facebook_app_id

# Twitter/X
VITE_TWITTER_BEARER_TOKEN=your_twitter_token
VITE_TWITTER_API_KEY=your_twitter_key
VITE_TWITTER_API_SECRET=your_twitter_secret
```

## ⚙️ Configuration Variables

### Search & API URLs
```bash
VITE_API_URL=http://localhost:3001
VITE_SEARCH_PROXY_URL=http://localhost:3001/api/search
VITE_REEL_API=http://localhost:3001/api/reels
VITE_TRENDS_API=https://api.nuestropulso.com/trends
```

### Performance Settings
```bash
VITE_PAGING_CAP=2000
VITE_SEARCH_RESULTS_PER_PAGE=12
VITE_SEARCH_DEBOUNCE_MS=300
VITE_SEARCH_TIMEOUT_MS=10000
VITE_PROVIDER_TIMEOUT_MS=5000
```

### Feature Flags
```bash
VITE_NEWS_PROVIDER_ENABLED=true
VITE_SOCIAL_PROVIDER_ENABLED=true
VITE_GOVERNMENT_PROVIDER_ENABLED=true
VITE_WIKI_PROVIDER_ENABLED=true
VITE_INFINITE_SCROLL_DEFAULT=false
VITE_REELS_INFINITE_SCROLL=true
```

## 🎯 Common Use Cases

### Minimal Setup (Firebase Only)
```bash
# Just these 3 for basic functionality
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FRONTEND_URL=http://localhost:5173
```

### News Aggregation
```bash
# Add these for real news
VITE_YOUTUBE_API_KEY=your_key
VITE_NEWSAPI_KEY=your_key
YOUTUBE_API_KEY=your_key
NEWSAPI_KEY=your_key
```

### Full Social Media Integration
```bash
# All social media APIs
VITE_TIKTOK_CLIENT_KEY=your_key
VITE_INSTAGRAM_ACCESS_TOKEN=your_token
VITE_FACEBOOK_ACCESS_TOKEN=your_token
VITE_TWITTER_BEARER_TOKEN=your_token
```

## 🐛 Troubleshooting

### Problem: "API key not configured" warnings

**Solution:**
1. Check `.env` file exists
2. Verify variable names (exact match, including VITE_ prefix)
3. Restart dev server: `npm run dev`

### Problem: Variables not updating

**Solution:**
```bash
# Stop server (Ctrl+C)
# Edit .env
# Restart
npm run dev
```

### Problem: CORS errors

**Solution:**
```bash
# In .env
FRONTEND_URL=http://localhost:5173

# Restart backend
npm run server
```

## 📖 Full Documentation

- Detailed Guide: [docs/ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)
- Setup Instructions: [../README.md](../README.md)
- API Documentation: Check individual service files

## 🔒 Security Reminders

✅ **DO:**
- Keep `.env` file local (never commit)
- Use `.env.example` as template
- Rotate exposed keys immediately

❌ **DON'T:**
- Commit `.env` to git
- Share API keys publicly
- Use production keys in development

## 💡 Pro Tips

1. **Multiple Environments**: Use different `.env` files
   - `.env.development` for local dev
   - `.env.production` for production
   - `.env.test` for testing

2. **Validation**: Use the validation utility
   ```typescript
   import { validateAllEnv } from './utils/envValidation';
   validateAllEnv(true);
   ```

3. **Fallback Data**: Most services work without API keys (demo mode)

4. **Backend vs Frontend**: Remember the pattern!
   - Frontend: `VITE_` prefix required
   - Backend: No `VITE_` prefix

---

Need help? Check the [full documentation](ENVIRONMENT_VARIABLES.md) or open an issue!
