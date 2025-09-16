# Nuestro Pulso - Red Cívica de Colombia

A modern civic engagement platform built with React, TypeScript, and Firebase.

## Features

- **Universal Search**: Comprehensive search across political, civic, and news content
- **Community Hub**: Real-time discussions and civic engagement
- **Polls & Surveys**: Interactive polling system for public opinion
- **News Feed**: Curated news and political updates
- **Debates**: Structured political debates and discussions

## Quick Start

### Prerequisites

- Node.js 18+ (automatically installed by setup script)
- Git

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   ```

2. **Run setup script**:
   ```bash
   bash setup.sh
   ```
   ⚠️ **Note**: Firebase CLI installation takes 30+ minutes. Do not cancel the process.

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase and search API credentials
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # or
   bash dev.sh
   ```

### Build Commands

```bash
# Development
npm run dev              # Start dev server (200ms startup)

# Production
npm run build           # Build for production (5s)
npm run preview         # Preview production build

# Code Quality
npm run lint            # ESLint check (2s, max 5 warnings)

# Testing
npm run test            # Run tests
npm run test:simple     # Run basic search tests
```

## Universal Search

The Universal Search feature has been significantly enhanced to address issue #104:

### ✅ Fixed Issues
- **Facebook search now returns 12+ results** (was returning only 1)
- **Comprehensive pagination** with URL persistence
- **Real-time debounced search** for smooth UX
- **Multiple data sources** with intelligent fallback
- **Category filtering** across Política, Tecnología, Internacional, etc.

### Key Features
- 🔍 **Multi-source aggregation**: Combines curated data with external APIs
- 📄 **Smart pagination**: Numbered pages with Previous/Next navigation
- 🔗 **URL sharing**: Search state persisted in URLs for sharing
- ⚡ **Real-time search**: 300ms debounced input
- 📱 **Mobile responsive**: Works seamlessly on all devices
- 🎯 **No empty states**: Comprehensive fallback data for popular topics

### Quick Test
1. Open the app and click "🔍 Buscar"
2. Click "Facebook" suggestion button
3. Verify 12+ results appear with pagination
4. Test URL sharing: `?q=Facebook&page=2&filter=tecnología`

For detailed Universal Search documentation, see [UNIVERSAL_SEARCH.md](./UNIVERSAL_SEARCH.md).

## Firebase Authentication Setup

1. Create a `.env` file in the project root and add your Firebase credentials. Use `.env.example` as a template.

2. **Enable Auth Providers**  
   Go to [Firebase Console > Authentication > Sign-in method](https://console.firebase.google.com/) and enable Email/Password (and other providers if needed).

3. **Usage Example**  
   Import and use Firebase authentication in your app:
   ```js
   import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

   const auth = getAuth();
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       // Signed in
       const user = userCredential.user;
     })
     .catch((error) => {
       // Handle Errors
     });
   ```

4. **Security Note**
   - Never commit your real `.env` file, only `.env.example`.

### Environment Configuration

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Universal Search Configuration (Optional)
REACT_APP_GOOGLE_SEARCH_API_KEY=your_google_api_key_here
REACT_APP_GOOGLE_SEARCH_CX=your_custom_search_engine_id_here
```

## Project Structure

```
src/
├── components/          # React components
│   ├── UniversalSearchBar.tsx  # Enhanced search component
│   ├── Navbar.tsx      # Navigation with search modal
│   └── ...
├── services/           # Business logic services
│   ├── UniversalSearchService.ts  # Search aggregation service
│   └── ActivityTracker.ts         # User activity tracking
├── data/              # Static data and configurations
│   ├── searchFallbackData.ts     # Comprehensive search data
│   └── samplePolls.ts            # Poll/survey data
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── tests/             # Test files
```

## Development

### Code Quality

- **ESLint**: Configured with TypeScript support, max 5 warnings allowed
- **TypeScript**: Strict type checking enabled
- **Hot Reload**: Vite dev server with instant updates
- **Build Validation**: CI tests on Node.js 18.x and 20.x

### Performance Metrics (Validated)

- `npm install`: 1m 20s
- `npm run lint`: 2s  
- `npm run build`: 5s
- `npm run dev`: 200ms startup
- Firebase CLI install: 30+ minutes (one-time setup)

### Testing

```bash
# Run unit tests for search functionality
npm run test:simple

# Manual testing checklist in UNIVERSAL_SEARCH.md
```

## Features

- Mobile-first design
- Built with TypeScript, React, and Tailwind CSS
- Feature parity with existing civic engagement platforms
- Continuous Integration and Continuous Deployment (CI/CD) workflow
- **Enhanced Universal Search** with comprehensive results and pagination

## Deployment

The project is configured for deployment to:

- **GitHub Pages**: Automatic deployment via GitHub Actions
- **Vercel**: Using `vercel.json` configuration
- **Firebase Hosting**: Compatible with Firebase hosting

### CI/CD Pipeline

GitHub Actions automatically:
1. Installs dependencies
2. Runs ESLint (must pass with ≤5 warnings)
3. Builds project (must succeed)
4. Deploys to GitHub Pages

## Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/your-feature`
3. **Follow code standards**: Run `npm run lint` before committing
4. **Test thoroughly**: Use manual testing checklist
5. **Submit pull request** with detailed description

### Development Guidelines

- **Minimal changes**: Make surgical, focused modifications
- **Test locally**: Always run lint, build, and manual tests
- **Document changes**: Update relevant documentation
- **Follow TypeScript**: Use strict typing for new code

## Troubleshooting

### Common Issues

1. **Long setup time**: Firebase CLI takes 30+ minutes to install - this is normal
2. **Linting errors**: Fix all errors before committing, max 5 warnings allowed
3. **Build failures**: Usually TypeScript errors, check import paths and types
4. **Search issues**: See [UNIVERSAL_SEARCH.md](./UNIVERSAL_SEARCH.md) troubleshooting section

### Getting Help

- Review this README and UNIVERSAL_SEARCH.md documentation
- Check [GitHub Issues](https://github.com/Colombia-cyber/nuestro-pulso-test/issues)
- Test with the manual validation commands above

## License

This project is licensed under the terms specified in the LICENSE file.

---

## Recent Updates

### v1.1.0 - Universal Search Enhancement
- ✅ **Fixed issue #104**: Facebook search now returns 12+ results instead of 1
- 🔧 **Added comprehensive pagination** with URL persistence
- ⚡ **Implemented real-time search** with 300ms debouncing
- 📊 **Enhanced data aggregation** with fallback support
- 🎯 **Improved UX** with loading states and error handling
- 📱 **Mobile optimization** maintained across all features

**Impact**: Universal Search now provides a professional, comprehensive search experience matching user expectations for a modern civic platform.