# Nuestro Pulso - Modern News & Community Dashboard

A modern, feature-rich dashboard for Colombia and the world, built with React, TypeScript, and Vite. Stay informed with international and Colombian news feeds, video reels, real-time community comments, and a beautiful user interface.

## 🌟 Features

- 🌍 **Dual Context Navigation** - Toggle between Local (Colombia) and World content with a single click
- 📰 **Smart News Feeds** - Context-aware news from Colombian and international sources
- 📺 **Video Reels** - Integrated content from YouTube, TikTok, and news outlets
- 💬 **Real-time Community Hub** - Live comments powered by Firebase or Supabase
- 🔍 **Unified Search** - Search across news, reels, and community content
- 🎨 **Modern UI** - Clean, accessible interface with Tailwind CSS
- ⚡ **Optimistic Updates** - Fast loading with demo data while fetching real content
- 🔒 **Comment Moderation** - Built-in flagging and reporting system
- ♿ **Accessible** - WCAG compliant with ARIA labels throughout
- 🚀 **Fast & Modern** - Built with Vite for lightning-fast development and production builds

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- (Optional) Firebase or Supabase account for real-time features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your API keys. See [Environment Variables Setup](#-environment-variables-setup) below.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run server` - Start backend API server
- `npm run dev:full` - Run both frontend and backend concurrently

## 🔧 Environment Variables Setup

The app uses different environment variables for frontend and backend. All frontend variables must be prefixed with `VITE_`.

### Quick Setup

1. Copy `.env.example` to `.env`
2. Fill in your API keys (see below)
3. Restart the dev server

### Required Variables (Frontend)

```env
VITE_FIREBASE_API_KEY=your-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### Optional Variables

```env
# For News API integration
VITE_NEWSAPI_KEY=your-newsapi-key

# For YouTube integration
VITE_YOUTUBE_API_KEY=your-youtube-key

# For Supabase (alternative to Firebase)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**📖 For detailed setup instructions, see [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md)**

## 💬 Enabling Real-time Comments

The Community Hub supports multiple backends for real-time comments. By default, it runs in **demo mode** with simulated data.

### Option 1: Firebase (Recommended)

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com)
2. **Enable Firestore Database** in your project
3. **Add Firebase config** to your `.env` file (see above)
4. **Update the adapter** in `src/components/CommentFeed.tsx`:
   - Uncomment the `FirebaseAdapter` class
   - Change `const adapter = new SimulatedAdapter()` to `const adapter = new FirebaseAdapter()`

### Option 2: Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Create the comments table** using the SQL provided in `src/components/CommentFeed.tsx`
3. **Install Supabase client**:
   ```bash
   npm install @supabase/supabase-js
   ```
4. **Add Supabase config** to your `.env` file
5. **Update the adapter** in `src/components/CommentFeed.tsx`:
   - Uncomment the `SupabaseAdapter` class
   - Change `const adapter = new SimulatedAdapter()` to `const adapter = new SupabaseAdapter()`

### Demo Mode (Default)

No setup required! The app works out of the box with simulated comments stored in memory. Perfect for:
- Local development
- Testing
- Demos and presentations

## 🎨 Components

### Core UI Components

- **NavigationTabs** - Toggle between Local (Colombia) and World views
- **SearchBar** - Unified search with keyboard support and clear button
- **ErrorFallback** - User-friendly error display with retry
- **NewsSection** - Context-aware news with optimistic rendering
- **ReelsSection** - Video content from multiple platforms
- **CommentFeed** - Real-time community comments with moderation
- **CommunityHub** - Full community engagement page

### Pages

- **Home** (`src/pages/Home.tsx`) - Main dashboard composing all components
- **CommunityHub** (`src/pages/CommunityHub.tsx`) - Dedicated community page
- **404** (`src/pages/404.tsx`) - Not found page

## 🌐 News Sources

### Colombian Sources (Local Context)
- El Tiempo
- El Espectador
- Semana
- Portafolio
- RCN
- Caracol

### International Sources (World Context)
- BBC News
- CNN
- Reuters
- Associated Press
- The Guardian

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast builds and HMR
- **Tailwind CSS** for utility-first styling
- **Firebase** for authentication and real-time data
- **Modular components** for easy maintenance

### Backend (Optional)
- **Node.js + Express** server for API endpoints
- **RSS parsing** for news aggregation
- **CORS enabled** for cross-origin requests

### Real-time Features
- **Adapter pattern** for backend flexibility
- **Optimistic UI** for instant feedback
- **Subscription-based updates** for live data

## 🚀 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Colombia-cyber/nuestro-pulso-test)

### Netlify

1. Build: `npm run build`
2. Deploy the `dist/` directory
3. Add environment variables in Netlify settings

### GitHub Pages

Automatic deployment via GitHub Actions:
1. Enable GitHub Pages in repository settings
2. Push to main branch
3. Site will be live at `https://yourusername.github.io/nuestro-pulso-test`

### Environment Variables in Production

Remember to set all `VITE_*` environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- See [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md) for details

## 🔒 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use restricted API keys (limit by domain/IP)
- ✅ Store sensitive keys in deployment platform secrets
- ✅ Implement proper RLS policies in Supabase/Firebase
- ✅ Validate and sanitize user input
- ❌ Don't expose service account keys on client
- ❌ Don't use same keys for dev and production

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI powered by [React](https://react.dev/)
- Type-safe with [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Real-time powered by [Firebase](https://firebase.google.com/) / [Supabase](https://supabase.com/)

## 📞 Support

For support:
- Open an issue in the GitHub repository
- Check [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md) for configuration help
- Review component files for inline documentation

---

**Made with ❤️ in Colombia** 🇨🇴
