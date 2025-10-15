# Environment Variables Guide

This document explains how environment variables are used in the Nuestro Pulso application.

## Overview

The application uses two different patterns for environment variables:

1. **Frontend (Vite/React)**: Uses `import.meta.env.VITE_*`
2. **Backend (Node.js/Express)**: Uses `process.env.*` (NO VITE_ prefix)

## Frontend Environment Variables

### Pattern
All frontend environment variables **MUST** start with `VITE_` prefix.

```typescript
// ✅ Correct - Frontend code
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

// ❌ Wrong - Will not work in frontend
const apiKey = process.env.YOUTUBE_API_KEY;
```

### Why VITE_ Prefix?

Vite (our build tool) only exposes environment variables that start with `VITE_` to the browser for security reasons. This prevents accidentally exposing server-side secrets to the client.

### Location
- Source files: `src/`, `components/`, `pages/`
- Access via: `import.meta.env.VITE_*`
- Examples: `src/services/youtubeService.ts`, `src/services/newsAPIService.ts`

## Backend Environment Variables

### Pattern
Backend code uses standard Node.js environment variables **WITHOUT** the `VITE_` prefix.

```javascript
// ✅ Correct - Backend code
const apiKey = process.env.YOUTUBE_API_KEY;

// ❌ Wrong - Inconsistent naming
const apiKey = process.env.VITE_YOUTUBE_API_KEY;
```

### Why No VITE_ Prefix?

The backend runs in Node.js, not the browser. The VITE_ prefix is only needed for frontend code. Using the prefix in backend code creates confusion and inconsistency.

### Location
- Source files: `server/`
- Access via: `process.env.*`
- Examples: `server/index.js`, `server/services/YouTubeIntegrationService.js`

## Configuration File

All environment variables are defined in the `.env` file (copy from `.env.example`):

```bash
# Frontend variables (with VITE_ prefix)
VITE_YOUTUBE_API_KEY=your_key_here
VITE_NEWSAPI_KEY=your_key_here
VITE_FIREBASE_API_KEY=your_key_here

# Backend variables (without VITE_ prefix)
YOUTUBE_API_KEY=your_key_here
NEWSAPI_KEY=your_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Required vs Optional Variables

### Required for Basic Functionality

**Frontend:**
- `VITE_FIREBASE_API_KEY` - Firebase authentication
- `VITE_FIREBASE_PROJECT_ID` - Firebase project
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain

**Backend:**
- `FRONTEND_URL` - Frontend URL for CORS
- `PORT` - Server port (default: 3001)

### Optional (Feature-Specific)

**API Keys:**
- `VITE_YOUTUBE_API_KEY` / `YOUTUBE_API_KEY` - YouTube video content
- `VITE_NEWSAPI_KEY` / `NEWSAPI_KEY` - News articles
- `VITE_GOOGLE_API_KEY` - Google Custom Search
- `VITE_GUARDIAN_KEY` / `GUARDIAN_KEY` - Guardian news

**Social Media:**
- `VITE_TIKTOK_CLIENT_KEY` - TikTok integration
- `VITE_INSTAGRAM_ACCESS_TOKEN` - Instagram content
- `VITE_FACEBOOK_ACCESS_TOKEN` - Facebook content
- `VITE_TWITTER_BEARER_TOKEN` - Twitter/X content

**Configuration:**
- `VITE_SEARCH_PROXY_URL` - Search API endpoint
- `VITE_API_URL` - Backend API URL
- `VITE_PAGING_CAP` - Max results per search

## Backward Compatibility

Some services support both patterns for backward compatibility:

```typescript
// Example from apiManager.ts
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || 
               import.meta.env.YOUTUBE_API_KEY || 
               '';
```

This allows the code to work with both naming conventions during migration.

## Error Handling

All services include error handling for missing API keys:

```typescript
if (!apiKey) {
  console.warn('⚠️ API key not configured. Using demo data.');
  console.info('💡 Set VITE_YOUR_API_KEY in .env to enable real data.');
}
```

When API keys are missing, services automatically fall back to:
1. Mock/demo data for testing
2. Limited functionality mode
3. Error messages guiding configuration

## Validation

Use the environment validation utility to check configuration:

```typescript
import { validateAllEnv } from './utils/envValidation';

// Validate all environment variables
const result = validateAllEnv(true); // true = verbose logging

if (!result.overallValid) {
  console.error('Configuration issues detected');
}
```

## Best Practices

### ✅ DO

1. Use `VITE_` prefix for all frontend variables
2. Use plain names (no prefix) for backend variables
3. Add error handling for missing keys
4. Provide helpful console messages
5. Fall back to demo data when possible
6. Document required vs optional variables

### ❌ DON'T

1. Mix `VITE_` and non-`VITE_` in same environment
2. Commit `.env` file to version control
3. Expose sensitive keys in frontend code
4. Use `process.env` in frontend code
5. Use `import.meta.env` in backend code

## Examples

### Frontend Service

```typescript
// src/services/youtubeService.ts
class YouTubeService {
  private apiKey: string | null = null;
  
  constructor() {
    // ✅ Correct: Uses VITE_ prefix
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || null;
    
    if (!this.apiKey) {
      console.warn('⚠️ YouTube API key not configured');
    }
  }
}
```

### Backend Service

```javascript
// server/services/YouTubeIntegrationService.js
class YouTubeIntegrationService {
  constructor() {
    // ✅ Correct: No VITE_ prefix in backend
    this.apiKey = process.env.YOUTUBE_API_KEY || null;
    
    if (!this.apiKey) {
      console.warn('⚠️ Backend YouTube API key not configured');
    }
  }
}
```

### Backend Server

```javascript
// server/index.js
dotenv.config(); // Load .env file

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL;

// ✅ Correct: Backend variables without VITE_ prefix
const optionalEnvVars = {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  NEWSAPI_KEY: process.env.NEWSAPI_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
```

## Testing

To test your configuration:

1. Copy `.env.example` to `.env`
2. Fill in your API keys
3. Run `npm run dev` for frontend
4. Run `npm run server` for backend
5. Check console for configuration warnings

## Troubleshooting

### "API key not configured" warnings

**Solution:** Check your `.env` file and ensure:
- Frontend keys have `VITE_` prefix
- Backend keys don't have `VITE_` prefix
- No typos in variable names
- File is named exactly `.env` (not `.env.local` or `.env.txt`)

### Variables not updating

**Solution:**
- Restart dev server after changing `.env`
- For Vite frontend: `npm run dev`
- For Node backend: `npm run server`

### CORS errors

**Solution:**
- Set `FRONTEND_URL=http://localhost:5173` in `.env`
- Restart backend server

## Security Notes

1. **Never commit `.env` file** - It contains sensitive API keys
2. **Use `.env.example`** - This template is safe to commit
3. **Rotate exposed keys** - If you accidentally commit keys, rotate them immediately
4. **Frontend variables are public** - Don't put secrets in `VITE_` variables
5. **Backend variables are private** - Safe for sensitive API keys

## Support

For questions or issues:
1. Check `.env.example` for variable names
2. Review console warnings for specific guidance
3. See individual service files for usage examples
4. Consult this guide for patterns and best practices
