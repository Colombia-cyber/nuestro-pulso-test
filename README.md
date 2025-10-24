# Nuestro Pulso - Colombian Civic Engagement Platform

A modern, world-class civic engagement platform for Colombia, featuring instant category switching, robust content feeds, Colombian branding, and graceful offline fallbacks. Built with React 18, TypeScript, and Vite.

## 🇨🇴 Overview

Nuestro Pulso (Our Pulse) is a comprehensive platform designed to keep Colombian citizens informed and engaged with their democracy. The platform features:

- **Colombian Design System** - Beautiful UI with Colombian flag colors (Yellow #FFCE00, Blue #003087, Red #C8102E)
- **Instant Category Switching** - Sub-300ms perceived navigation with client-side caching and optimistic UI
- **Robust Feed Handling** - Never stuck in perpetual loading; automatic fallbacks to sample data
- **Anonymous Authentication** - Seamless Firebase anonymous auth with local fallback when offline
- **Mobile-First Responsive** - Three-column layout on desktop, single-column on mobile
- **Glassmorphism Effects** - Modern UI with backdrop blur and Colombian gradient overlays
- **Accessibility** - WCAG 2.1 compliant with keyboard navigation and ARIA labels

## 🌟 Features

### Core Sections
- 🏠 **Home** - Hero section with featured topics and quick navigation cards
- 🎞️ **Reels** - Short-form video content from Colombian creators
- 📰 **News Hub** - Verified news from trusted Colombian sources (El Tiempo, El Espectador, Semana)
- 💬 **Debates** - Constructive discussions on important civic topics
- 📊 **Surveys** - Voice your opinion through community polls
- 📈 **Tendencies** - Real-time trending topics and analytics

### Technical Features
- ⚡ **Lightning Fast** - Vite build system, optimized chunks, lazy loading
- 🎨 **Colombian Branding** - Custom color palette, flag-inspired gradients, cultural motifs
- 🔄 **Smart Caching** - Client-side content caching with 5-minute TTL
- 🌐 **Multi-Source Aggregation** - News from backend, NewsAPI, YouTube, with fallbacks
- 📱 **PWA Support** - Installable, offline-ready progressive web app
- 🔐 **Secure** - No API keys in source code, environment-based configuration
- ♿ **Accessible** - Screen reader friendly, keyboard navigable, high contrast support

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- (Optional) Firebase project for authentication
- (Optional) API keys for NewsAPI, YouTube

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or use the setup script
   bash setup.sh
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys (all optional - app works with fallback data):
   - `VITE_FIREBASE_*` - Firebase configuration for authentication
   - `VITE_NEWSAPI_KEY` - NewsAPI key for additional news sources
   - `VITE_YOUTUBE_API_KEY` - YouTube API for video integration
   - `VITE_API_URL` - Backend API URL (defaults to `/api`)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bash dev.sh
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server (ready in ~200ms)
- `npm run build` - Build for production (~5s)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (must pass before commit)
- `npm run server` - Start backend server (optional)
- `npm run dev:full` - Run both frontend and backend concurrently

## 🎨 Colombian Design System

### Color Palette

```css
/* Primary Colors - Colombian Flag */
--colombia-yellow: #FFCE00
--colombia-blue: #003087
--colombia-red: #C8102E

/* Extended Palette */
--colombia-yellow-light: #FFF4CC
--colombia-yellow-dark: #E6B800
--colombia-blue-light: #CCE0FF
--colombia-blue-dark: #002366
--colombia-red-light: #FFE6EA
--colombia-red-dark: #A00D26
```

### Key UI Components

- **ColombianLayout** - Main layout with sticky navigation and Colombian branding
- **ColombianLoader** - Animated loader with Colombian flag colors
- **ColombianHome** - Hero section with feature cards and quick navigation
- **EnhancedNewsHub** - News aggregator with instant category switching
- **EnhancedReelsHub** - Video feed with infinite scroll and lazy loading
- **Enhanced Sections** - Debates, Surveys, Tendencies with optimistic UI

### Glassmorphism & Effects

```css
.glass-card - Frosted glass effect with backdrop blur
.text-colombia-gradient - Gradient text with flag colors
.bg-colombia-animated - Animated gradient background
.card-3d - 3D transform hover effects
.spinner-colombia - Loading spinner with flag colors
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for your local development (never commit this):

```env
# Firebase Configuration (optional - app works without)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# News API (optional - app has fallback demo data)
VITE_NEWSAPI_KEY=your-newsapi-key

# YouTube API (optional - app has fallback demo data)
VITE_YOUTUBE_API_KEY=your-youtube-api-key

# Backend API (optional - defaults to /api)
VITE_API_URL=http://localhost:3000/api

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Getting API Keys

1. **Firebase** (Optional - for user authentication)
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a project → Add web app → Copy config values
   - If not configured, app uses local anonymous user fallback

2. **NewsAPI** (Optional - for additional news sources)
   - Sign up at [newsapi.org](https://newsapi.org/)
   - Free tier: 100 requests/day
   - App uses backend + demo data if not available

3. **YouTube API** (Optional - for video content)
   - [Google Cloud Console](https://console.cloud.google.com/)
   - Enable YouTube Data API v3 → Create API key
   - App uses demo videos if not available

## 🚀 Deployment

### GitHub Pages (Automatic CI/CD)

This repository includes automatic deployment:

1. Push to `main` branch
2. GitHub Actions runs: lint → build → deploy
3. Live at `https://colombia-cyber.github.io/nuestro-pulso-test`

The CI/CD pipeline:
- Tests on Node.js 18.x and 20.x
- Runs ESLint (max 5 warnings)
- Builds production bundle
- Deploys to GitHub Pages

### Vercel (Recommended for production)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Colombia-cyber/nuestro-pulso-test)

1. Click the button above
2. Add environment variables in Vercel dashboard
3. Deploy in seconds

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Manual/Self-Hosted

```bash
# Build for production
npm run build

# Output in dist/ directory
# Serve with any static hosting (nginx, Apache, etc.)
```

## 🏗️ Architecture

### Project Structure

```
nuestro-pulso-test/
├── src/
│   ├── components/          # React components
│   │   ├── ColombianLayout.tsx
│   │   ├── ColombianLoader.tsx
│   │   ├── ColombianHome.tsx
│   │   ├── Enhanced*.tsx    # Enhanced section components
│   │   └── AuthContext.tsx  # Authentication context
│   ├── services/           # API & data services
│   │   ├── newsService.ts  # News aggregation
│   │   ├── realNewsService.ts
│   │   ├── colombiaHubService.ts
│   │   └── youtubeService.ts
│   ├── types/              # TypeScript definitions
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles + Colombian design tokens
├── server/                 # Optional backend server
│   └── index.js           # Express API server
├── public/                 # Static assets
├── .github/
│   └── workflows/ci.yml   # CI/CD pipeline
├── tailwind.config.js     # Tailwind + Colombian palette
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies & scripts
```

### Data Flow

1. **User navigates** → Instant UI update (optimistic)
2. **Service layer** → Check cache (5min TTL)
3. **API calls** → Backend → NewsAPI → Fallback to demo data
4. **Never stuck** → Always shows content, even offline

### Caching Strategy

- **Client-side cache**: 5-minute TTL per category
- **Prefetching**: Adjacent categories loaded in background
- **Optimistic UI**: Show cached content immediately, update in background
- **Graceful degradation**: Demo data if all sources fail

## 📱 Progressive Web App (PWA)

Features:
- ✅ Installable on mobile and desktop
- ✅ Offline fallback with service worker
- ✅ App-like standalone mode
- ✅ Fast loading with optimized caching
- ✅ Colombian flag icon and theme colors

Manifest: `public/manifest.json`

## 🧪 Testing

### Smoke Tests (Planned)

```bash
# Run tests (when implemented)
npm test
```

Test coverage:
- ✓ All routes render without crashing
- ✓ Navigation between sections works
- ✓ Auth fallback functions correctly
- ✓ Feed fallback data displays
- ✓ Build succeeds without errors

### Manual Testing Checklist

- [ ] Navigate to all sections (Home, Reels, News, Debates, Surveys, Tendencies)
- [ ] Verify instant category switching (<300ms perceived)
- [ ] Test with Firebase configured and without
- [ ] Verify feeds show demo data when APIs unavailable
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify keyboard navigation works
- [ ] Test dark/light mode (prefers-color-scheme)

## 🔒 Security

- ✅ No API keys in source code
- ✅ Environment variables for all secrets
- ✅ .gitignore prevents committing .env files
- ✅ Anonymous auth fallback doesn't expose credentials
- ✅ CORS configured for backend API
- ✅ Input sanitization in all forms
- ✅ CSP headers recommended for production

## 🎯 Performance

- Build time: ~5 seconds
- Dev server startup: ~200ms
- First contentful paint: <1s
- Time to interactive: <2s
- Bundle size: 
  - CSS: 124KB (17KB gzipped)
  - JS: 745KB total (189KB gzipped)
  - Lazy loaded by route

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

**Before submitting:**
- [ ] Run `npm run lint` (must pass)
- [ ] Run `npm run build` (must succeed)
- [ ] Test manually in browser
- [ ] Update README if adding features
- [ ] No API keys in commits

## 📝 Migration Notes

### From Legacy Version

If migrating from an older version:

1. Update dependencies: `npm install`
2. Review `.env.example` for new variables
3. Colombian components replace old layout
4. Services now use class-based architecture
5. AuthContext now has Firebase fallback
6. All components support offline mode

### Breaking Changes

- `newsService` is now a class instance (was functions)
- `realNewsService` exports object with methods
- `RealNewsArticle` interface updated with new fields
- Colombian design tokens replace old color scheme

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) ⚡
- UI powered by [React 18](https://react.dev/) ⚛️
- Type-safe with [TypeScript](https://www.typescriptlang.org/) 📘
- Styled with [Tailwind CSS](https://tailwindcss.com/) 🎨
- Icons from [React Icons](https://react-icons.github.io/react-icons/) 🎭
- Firebase for [authentication](https://firebase.google.com/) 🔐

## 📞 Support

- Open an issue on GitHub
- Check existing issues and discussions
- Review documentation and examples

---

**Hecho con ❤️ en Colombia** 🇨🇴

*Empowering Colombian democracy through technology and civic engagement.*
