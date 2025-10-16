# Nuestro Pulso - Modern News Dashboard

A modern, feature-rich dashboard for Colombia and the world, built with React, TypeScript, and Vite. Stay informed with international and Colombian news feeds, YouTube videos, and a beautiful dark/light theme.

## 🌟 Features

- 🌍 **Expanded International & Colombian News Feeds** - Access news from BBC, CNN, Reuters, El Tiempo, El Espectador, Semana, and more
- 📺 **YouTube Video Integration** - Search and browse videos with live YouTube API integration
- 📰 **RSS Feed Reader** - Real-time news from multiple sources worldwide
- 🌓 **Dark/Light Theme Toggle** - Beautiful app-wide theme switching with persistence
- ⚡ **Skeleton Loaders** - Professional loading states for fast perceived performance
- 🔄 **One-Click Refresh** - Refresh all feeds instantly with a single button
- 📱 **PWA Support** - Install as a Progressive Web App on any device
- 🔍 **SEO Optimized** - Open Graph tags, structured data, and meta tags for excellent discoverability
- ♿ **Accessible** - Built with accessibility best practices
- 🚀 **Fast & Modern** - Built with Vite for lightning-fast development and production builds

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn

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
   
   Edit `.env` and add your API keys:
   - `VITE_YOUTUBE_API_KEY` - Get from [Google Cloud Console](https://console.cloud.google.com/)
   - `VITE_FIREBASE_*` - Firebase configuration (optional)

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

## 🎨 Components

### Core Components

- **Layout** - Main layout wrapper with header, footer, and theme toggle
- **FeedSelector** - Dropdown to select from 15+ international and Colombian news sources
- **YouTubeFeed** - Display YouTube videos from a channel or search query
- **RSSFeed** - Parse and display RSS feeds from any source
- **ThemeToggle** - Switch between dark and light themes
- **SearchBar** - Search YouTube videos
- **RefreshButton** - One-click refresh for all feeds
- **SkeletonList** / **SkeletonLoader** - Professional loading states
- **Status** - Display loading and error states

### Pages

- **Home** (`src/App.tsx`) - Main dashboard with all feeds
- **404** (`src/pages/404.tsx`) - Not found page

## 🌐 News Sources

### International
- Google News (World)
- BBC Top Stories
- CNN World
- Reuters Top News
- Al Jazeera
- The Guardian World
- New York Times World
- TechCrunch
- Wired

### Colombian
- El Tiempo - Colombia
- El Espectador
- Semana
- Portafolio (Economía)
- El Colombiano
- La República
- Caracol Noticias

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# YouTube API
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here

# Firebase (Optional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# News API (Optional)
VITE_NEWSAPI_KEY=your_newsapi_key
```

### Getting API Keys

1. **YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API Key)
   - Copy the key to your `.env` file

2. **Firebase** (Optional)
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add a web app
   - Copy the config values to your `.env` file

## 🚀 Deployment

### GitHub Pages (Automatic)

This repository includes automatic deployment via GitHub Actions:

1. Fork the repository
2. Enable GitHub Pages in Settings → Pages
3. Set Source to "gh-pages" branch
4. Push any change to main branch
5. Your site will be live at `https://yourusername.github.io/nuestro-pulso-test`

### Vercel (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Colombia-cyber/nuestro-pulso-test)

### Netlify

1. Build locally: `npm run build`
2. Drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

### Manual Deployment

```bash
npm run build
```

The built files will be in the `dist/` directory. Deploy this directory to any static hosting service.

## 📱 Progressive Web App (PWA)

This app includes full PWA support:

- **Installable** - Add to home screen on mobile and desktop
- **Offline-ready** - Service worker for offline functionality
- **App-like experience** - Standalone display mode
- **Fast loading** - Optimized assets and caching

The PWA manifest is located at `public/manifest.json`.

## 🎨 Customization

### Adding More News Sources

Edit `src/components/FeedSelector.tsx` and add to the `feeds` array:

```typescript
const feeds = [
  // ... existing feeds
  { label: "Your Source Name", url: "https://example.com/rss.xml" },
];
```

### Changing Theme Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #003087;
  --background-color: #ffffff;
  /* ... more variables */
}

body.dark {
  --background-color: #1a1a1a;
  /* ... dark theme variables */
}
```

### Modifying Layout

The main layout is in `src/components/Layout.tsx`. Customize the header, footer, or overall structure there.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
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

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ in Colombia** 🇨🇴
