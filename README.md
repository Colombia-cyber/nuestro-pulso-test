# Nuestro Pulso

The open, civic web platform for Colombia & the world — modern, extensible, Google-style UI.

## Features

- 🇨🇴/🌎 Toggle for local (Colombia) and world news
- Universal search bar
- Responsive, accessible, mobile-first layout
- API-ready (just add your keys in `.env`)
- Fully open, easily extended (add debates, voting, YouTube, etc.)
- Real-time Colombia news hub with multiple sources
- PulseReels - Vertical video content discovery
- Cross-platform content aggregation

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   Note: Firebase CLI installation may take 30+ minutes on first run.

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys. See [Environment Variables Guide](docs/ENVIRONMENT_VARIABLES.md) for details.

4. **Run the development server**
   
   Frontend only:
   ```bash
   npm run dev
   ```
   
   Full stack (frontend + backend):
   ```bash
   npm run dev:full
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Environment Configuration

### Required Variables
- `VITE_FIREBASE_API_KEY` - Firebase authentication
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `FRONTEND_URL` - Frontend URL for CORS (backend)

### Optional API Keys
- `VITE_YOUTUBE_API_KEY` - YouTube video content
- `VITE_NEWSAPI_KEY` - News articles
- `VITE_GOOGLE_API_KEY` - Google Custom Search
- Social media API keys (TikTok, Instagram, Facebook, Twitter)

**Important:** 
- Frontend variables MUST have `VITE_` prefix
- Backend variables should NOT have `VITE_` prefix
- See [Environment Variables Guide](docs/ENVIRONMENT_VARIABLES.md) for complete documentation

## Development Scripts

```bash
npm run dev          # Start frontend dev server
npm run server       # Start backend API server
npm run dev:full     # Start both frontend and backend
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── services/          # API services
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript types
├── server/                # Backend API server
│   ├── routes/           # API routes
│   ├── services/         # Backend services
│   └── providers/        # Data providers
├── docs/                 # Documentation
└── public/               # Static assets
```

## Key Features

### Colombia News Hub
Aggregates news from multiple Colombian sources:
- El Tiempo, El Espectador, Semana
- International coverage (AP News, BBC, Al Jazeera)
- Real-time updates with caching
- Category filtering and search

### PulseReels
TikTok-style vertical video discovery:
- Swipeable video interface
- Multiple content sources
- Local and global content toggle
- Responsive design

### Universal Search
Unified search across multiple platforms:
- News articles
- Wikipedia content
- Government sources
- Social media (when configured)

## API Integration

The app uses a dual-environment approach:

**Frontend (Browser)**
- Uses `import.meta.env.VITE_*`
- Variables exposed to browser
- Configured in `.env`

**Backend (Node.js)**
- Uses `process.env.*`
- Server-side only
- No VITE_ prefix needed

See [Environment Variables Guide](docs/ENVIRONMENT_VARIABLES.md) for detailed documentation.

## Customization

- **Add new features**: Create components in `src/components/`
- **Customize search**: Modify `src/services/searchService.ts`
- **Add news sources**: Update `server/services/ColombiaNewsAggregator.js`
- **Configure API endpoints**: Edit `.env` file
- **Styling**: Uses Tailwind CSS - customize in `tailwind.config.js`

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy
```

### Manual
```bash
npm run build
# Deploy the dist/ folder to your host
```

## Troubleshooting

### "API key not configured" warnings
- Check `.env` file exists and variables are set
- Ensure frontend variables have `VITE_` prefix
- Restart dev server after changing `.env`

### Build errors
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npm run build`
- Verify Node.js version: `node --version` (18.x or higher)

### CORS errors
- Set `FRONTEND_URL=http://localhost:5173` in `.env`
- Restart backend server

See [Environment Variables Guide](docs/ENVIRONMENT_VARIABLES.md) for more troubleshooting tips.

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Run `npm run lint` before committing

## Documentation

- [Environment Variables Guide](docs/ENVIRONMENT_VARIABLES.md) - Complete env var documentation
- [Colombia News Hub Guide](COLOMBIA_NEWS_HUB_GUIDE.md) - News aggregation details
- [Search Integration](COPILOT_SEARCH_AI_IMPROVEMENTS.md) - Search feature details

## License

MIT License - see LICENSE file for details

## Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check existing documentation
- Review console warnings for specific guidance

---

Built with ❤️ for Colombia and the world
