# Nuestro Pulso - Next.js + React + Tailwind + Firebase Project

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- Install dependencies: `npm install`
- Start development server: `npm run dev` (runs on http://localhost:3000)
- Build for production: `npm run build`
- Firebase is configured but optional for basic functionality

### Build and Development Times
- `npm install` - typically 2-3 minutes
- `npm run build` - typically 1-2 minutes  
- `npm run dev` - starts immediately, runs continuously on port 3000

### Project Configuration
- **Framework**: Next.js 13.5.x with static export capability
- **Styling**: Tailwind CSS with PostCSS processing
- **UI**: Colombian flag gradient theme (yellow→blue→red)
- **Firebase**: Pre-configured but commented out to avoid build errors
- **TypeScript**: Enabled for type safety

## Validation

### Manual Testing Requirements
- **ALWAYS** manually validate changes by running the development server
- **REQUIRED**: After making changes, test the complete user flow:
  1. Run `npm install`
  2. Run `npm run dev`
  3. Navigate to http://localhost:3000
  4. Verify the Nuestro Pulso homepage loads with Colombian flag gradient
  5. Test navigation to all routes: /chat, /debate, /survey, /app, etc.
- Take screenshots of any UI changes for verification

### Build Verification
- Always run `npm run build` to ensure static export works
- Verify all 11 routes generate successfully
- Check for zero build errors/warnings
- Confirm CSS bundle optimization (should be ~5KB, not 300KB)

## Current Project Structure

### Fully Implemented Routes
```
/                    - Homepage with HeroSection and Colombian theme
/app                 - Platform overview with feature grid
/chat               - Chat page (placeholder)
/debate             - Debates page (placeholder) 
/survey             - Surveys page (placeholder)
/news               - News page (placeholder)
/comments           - Comments page (placeholder)
/care               - Care/wellness page (placeholder)
/signin             - Sign-in page (placeholder)
/404                - Custom 404 with Colombian theme
```

### Key Files and Directories
```
/home/runner/work/nuestro-pulso-test/nuestro-pulso-test/
├── .github/
│   └── copilot-instructions.md     # This file
├── pages/                          # Next.js pages (all routes)
│   ├── index.tsx                  # Homepage
│   ├── app.tsx                    # Platform overview
│   ├── 404.tsx                    # Custom 404 page
│   ├── _app.tsx                   # Global app component
│   └── [other routes].tsx         # Chat, debate, survey, etc.
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx        # Main homepage hero component
│   │   ├── Debate.tsx            # Debate component (typed)
│   │   └── [other components]     # Various UI components
│   ├── firebase.js               # Firebase configuration
│   └── utils/                    # Utility functions
├── styles/
│   └── globals.css               # Tailwind CSS imports + custom styles
├── next.config.js                # Next.js configuration for static export
├── tailwind.config.js            # Tailwind CSS configuration (purge optimized)
├── postcss.config.js             # PostCSS configuration for Tailwind
└── package.json                  # Next.js scripts and dependencies
```

### Build Configuration
- **Static Export**: Configured for deployment to static hosting
- **CSS Optimization**: Tailwind purge reduces CSS from 298KB → 5KB
- **Route Pre-rendering**: All 11 routes pre-render to static HTML
- **Performance**: Total JS bundle ~84KB shared across all routes

### Styling System
- **Colombian Theme**: Uses yellow (#FBBF24) → blue (#3B82F6) → red (#EF4444) gradient
- **Glassmorphism**: White backdrop with blur effects
- **Interactive Elements**: Hover states and click animations
- **Responsive**: Mobile-first design with Tailwind responsive classes
- **Icons**: Emoji-based iconography for accessibility

## Key Features Implemented

### Homepage (HeroSection)
- ✅ Colombian flag gradient background
- ✅ Glassmorphism content overlay
- ✅ Interactive navigation buttons with hover effects
- ✅ Click animations and state management
- ✅ Responsive design for all screen sizes
- ✅ Spanish language content

### Platform App Page (/app)
- ✅ Feature grid showcasing all platform capabilities
- ✅ Navigation links to all sections
- ✅ Consistent Colombian theme styling
- ✅ Call-to-action buttons

### Error Handling
- ✅ Custom 404 page with Colombian theme
- ✅ Graceful fallbacks for missing components
- ✅ TypeScript error prevention

## Deployment Ready
- ✅ Clean production build with zero errors
- ✅ All routes export as static HTML
- ✅ Optimized CSS bundle (98% size reduction)
- ✅ No build warnings or TypeScript errors
- ✅ Firebase configuration ready but optional

## Development Workflow
1. Make code changes
2. Test in development: `npm run dev`
3. Validate build: `npm run build`
4. Verify all routes work properly
5. Check for styling/performance regressions
6. Commit changes

## Troubleshooting
- If CSS doesn't load: Restart dev server (`npm run dev`)
- If build fails: Check TypeScript errors in components
- If routes don't work: Verify they exist in /pages directory
- If styling is broken: Check Tailwind content paths in config
├── .gitignore              # Standard Node.js/Vite ignores
├── README.md               # Basic setup instructions
├── dev.sh                  # Development server launcher
├── index.html              # HTML entry point
├── package.json            # Minimal scripts only (no dependencies listed)
├── setup.sh                # Automated environment setup
├── src/
│   ├── App.jsx            # Main React component
│   ├── firebase.js        # Firebase configuration
│   └── main.jsx           # React entry point
└── vite.config.js         # Vite configuration
```

### Key Files to Monitor
- `src/firebase.js` - Firebase configuration and authentication setup
- `src/App.jsx` - Main application component  
- `package.json` - Contains only script definitions
- `vite.config.js` - Vite build configuration

### Frequent Command Outputs

#### package.json content
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "preview": "vite preview"
  }
}
```

#### Firebase configuration structure
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBV4g50dUdMJ6-a2R6MFqzL1JElgG51d8g",
  authDomain: "nuestro-pulso-chat.firebaseapp.com",
  projectId: "nuestro-pulso-chat",
  // ... additional config
};
```

## Critical Warnings

- **NEVER CANCEL** the `bash setup.sh` command - Firebase CLI installation requires 15+ minutes minimum
- **ALWAYS** use timeouts of 30+ minutes for initial setup commands
- **ALWAYS** run the complete setup process before making code changes
- **ALWAYS** test changes manually in the browser - there are no automated tests
- Dependencies are managed entirely through the setup script, not listed in package.json
- Firebase project credentials are already configured - do not modify unless intentionally changing projects

## Troubleshooting

- If setup fails, rerun `bash setup.sh` completely
- If dev server won't start, ensure setup completed successfully
- If Firebase errors appear in console, verify configuration in `src/firebase.js`
- No build tools or linters are configured - rely on Vite's built-in capabilities