# Nuestro Pulso Test

## Quick Setup

### Prerequisites
- Node.js 18+ installed
- Firebase project (for authentication)
- News API key (from [newsapi.org](https://newsapi.org/register))
- Google API credentials (optional, for search functionality)

### Local Development Setup

1. **Clone and install dependencies**:
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env and add your API keys
   nano .env  # or use your preferred editor
   ```

3. **Required Environment Variables**:
   Add these to your `.env` file:
   ```env
   # Firebase (Required)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # News API (Required)
   VITE_NEWSAPI_KEY=your_newsapi_key

   # Google Search (Optional)
   VITE_GOOGLE_API_KEY=your_google_api_key
   VITE_GOOGLE_CSE_ID=your_custom_search_engine_id
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Production Deployment (Vercel)

#### One-time Vercel Setup:

1. **Connect your repository** to Vercel dashboard
2. **Add environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN` 
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_FIREBASE_MEASUREMENT_ID`
     - `VITE_NEWSAPI_KEY`
     - `VITE_GOOGLE_API_KEY` (optional)
     - `VITE_GOOGLE_CSE_ID` (optional)

3. **Deploy**: Vercel will automatically deploy on every push to main branch

#### Alternative Deploy Methods:
```bash
# Deploy via Vercel CLI
npm install -g vercel
vercel --prod

# Or deploy via GitHub Actions (already configured)
git push origin main
```

## API Key Setup Guides

### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create/select your project
3. Go to Project Settings → General → Your apps
4. Copy the config values to your `.env` file
5. Enable Authentication → Sign-in method → Email/Password

### News API Setup  
1. Register at [NewsAPI.org](https://newsapi.org/register)
2. Get your free API key
3. Add `VITE_NEWSAPI_KEY=your_key` to `.env`

### Google Custom Search Setup (Optional)
1. Get API key from [Google Cloud Console](https://console.developers.google.com/)
2. Create Custom Search Engine at [Google CSE](https://cse.google.com/cse/)
3. Add both `VITE_GOOGLE_API_KEY` and `VITE_GOOGLE_CSE_ID` to `.env`

## Security Notes

- ✅ **NEVER** commit your `.env` file
- ✅ Environment variables are validated at startup
- ✅ Missing required keys will show clear error messages
- ✅ Google search gracefully falls back to mock data if keys are missing
- ✅ All API keys use Vite's `VITE_` prefix for proper client-side access

---

## Features
- Mobile-first design
- Built with TypeScript, React, and Tailwind CSS
- Feature parity with existing civic engagement platforms
- Continuous Integration and Continuous Deployment (CI/CD) workflow
- **Search UI Example**: Ready-to-integrate mobile-first search interface (see `search-ui/` folder)

## Testing
To run tests for the project, use the following command:
```bash
npm test
```

## Search UI Example
A mobile-first search UI example is available in the `search-ui/` directory. This provides a Google-like search interface that's ready to integrate with your preferred search backend (Algolia, Typesense, Elasticsearch, or custom API).

To try it:
```bash
cd search-ui
python -m http.server 8080
# Visit http://localhost:8080/search.html?q=participación
```

See `search-ui/README.md` for complete integration documentation.