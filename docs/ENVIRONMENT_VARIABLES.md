# Environment Variables Guide

This document explains all environment variables used in Nuestro Pulso and how to configure them.

## Quick Start

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual API keys and configuration values in `.env`

3. Restart the development server to pick up the changes

## Environment Variable Categories

### Frontend Variables (VITE_ prefix)

All frontend environment variables **must** be prefixed with `VITE_` to be accessible in the client-side code via `import.meta.env`.

#### Firebase Configuration (Required)

Firebase is used for authentication and can optionally power real-time comments.

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGH
```

**How to get these values:**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (or create a new one)
3. Click on the gear icon ⚙️ > Project settings
4. Scroll down to "Your apps" section
5. Click on the Web app (or create one if you haven't)
6. Copy the config values from the Firebase SDK snippet

**Enabling Firestore for Comments:**

1. In Firebase Console, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose production mode or test mode (for development)
4. Select a location for your database
5. Update the code in `src/components/CommentFeed.tsx` to use `FirebaseAdapter`

#### Supabase Configuration (Optional Alternative to Firebase)

Supabase can be used as an alternative to Firebase for real-time comments.

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get these values:**

1. Go to [Supabase](https://supabase.com)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the "Project URL" and "anon/public" key

**Setting up Supabase for Comments:**

1. Create a `comments` table using the SQL provided in `src/components/CommentFeed.tsx`
2. Set up Row Level Security (RLS) policies
3. Update the code in `src/components/CommentFeed.tsx` to use `SupabaseAdapter`

#### News API (Optional)

Used for fetching news articles from various sources.

```env
VITE_NEWSAPI_KEY=your-newsapi-key-here
```

**How to get this:**

1. Go to [NewsAPI.org](https://newsapi.org)
2. Sign up for a free account
3. Copy your API key from the dashboard

**Note:** Free tier has limitations. Consider premium for production use.

#### YouTube API (Optional)

Used for YouTube video integration and reels.

```env
VITE_YOUTUBE_API_KEY=your-youtube-api-key-here
```

**How to get this:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the YouTube Data API v3
4. Go to "Credentials" and create an API key
5. Restrict the key to YouTube Data API v3 for security

### Backend Variables (NO VITE_ prefix)

These variables are used by the Node.js server and should **NOT** be prefixed with `VITE_`.

#### Server Configuration

```env
PORT=3001
NODE_ENV=development
```

- `PORT`: The port on which the backend server runs (default: 3001)
- `NODE_ENV`: Environment mode (`development`, `production`, or `test`)

#### Firebase Service Account (Server-side)

For server-side Firebase operations (admin SDK):

```env
FIREBASE_SERVICE_ACCOUNT_KEY=./path/to/service-account-key.json
```

**How to get this:**

1. Go to Firebase Console > Project Settings
2. Click on "Service Accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Store it securely (DO NOT commit to git)
6. Reference the path in this environment variable

#### Supabase Service Key (Server-side)

For server-side Supabase operations:

```env
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**How to get this:**

1. Go to Supabase Dashboard > Settings > API
2. Copy the "service_role" key (NOT the anon key)
3. Keep this secret - it has admin privileges

## Security Best Practices

### ✅ DO:
- Use `.env` for local development (already in `.gitignore`)
- Use environment-specific `.env` files (`.env.development`, `.env.production`)
- Store production secrets in your deployment platform's secret manager
- Rotate API keys regularly
- Use restricted API keys when possible (limit by domain, IP, or API)

### ❌ DON'T:
- Commit `.env` files to version control
- Share API keys in public channels
- Use the same keys for development and production
- Expose service account keys on the client side
- Use `VITE_` prefix for sensitive server-side secrets

## Validation

The app includes automatic environment variable validation:

- On development startup, frontend variables are validated
- Missing required variables will show console errors with helpful messages
- See `src/utils/envValidation.ts` for validation logic

## Deployment Platforms

### Vercel

1. Go to your project settings
2. Click on "Environment Variables"
3. Add each variable one by one
4. Specify which environments (Production, Preview, Development)

### Netlify

1. Go to Site settings > Build & deploy > Environment
2. Click "Add variable"
3. Add each VITE_ prefixed variable

### Railway/Render

1. Go to your project dashboard
2. Navigate to "Variables" or "Environment"
3. Add variables in key=value format

## Troubleshooting

### Variables not updating?

1. Restart the development server (`npm run dev`)
2. Clear browser cache
3. Check that variables are properly prefixed with `VITE_`

### "Undefined" in production?

1. Verify variables are set in your deployment platform
2. Ensure you're using `import.meta.env.VITE_*` not `process.env.*`
3. Check build logs for any errors

### Firebase/Supabase not connecting?

1. Verify all configuration values are correct
2. Check Firebase/Supabase project is active
3. Verify authentication methods are enabled
4. Check browser console for detailed error messages

## Need Help?

- Check the main [README.md](../README.md) for setup instructions
- Review component files for specific API usage
- Check Firebase/Supabase documentation for platform-specific issues

## Example .env File

```env
# Firebase (Required)
VITE_FIREBASE_API_KEY=AIzaSyBV4g50dUdMJ6-a2R6MFqZL1JE1gG51d8g
VITE_FIREBASE_AUTH_DOMAIN=nuestro-pulso-chat.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nuestro-pulso-chat
VITE_FIREBASE_STORAGE_BUCKET=nuestro-pulso-chat.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=268702824909
VITE_FIREBASE_APP_ID=1:268702824909:web:0b4f2f849201abc94cac84
VITE_FIREBASE_MEASUREMENT_ID=G-74ZBHG8TF4

# Optional APIs
VITE_NEWSAPI_KEY=your-newsapi-key
VITE_YOUTUBE_API_KEY=your-youtube-key

# Server
PORT=3001
NODE_ENV=development
```
