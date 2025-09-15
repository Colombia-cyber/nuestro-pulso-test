# Nuestro Pulso Test - Vite + React + TypeScript + Firebase Project

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- **CRITICAL**: Firebase CLI installation takes 30+ minutes. NEVER CANCEL. Set timeout to 60+ minutes.
- Run setup: `bash setup.sh` 
  - Installs Node.js 18.x if not present (usually pre-installed)
  - Installs Firebase CLI globally (**LONG RUNNING**: 30+ minutes minimum)
  - Installs npm dependencies via `npm install` (1-2 minutes)
  - Creates `.env` file from `.env.example` if missing
- Start development server: `bash dev.sh` or `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

### Build and Development Times - VALIDATED
- **NEVER CANCEL**: Firebase CLI installation takes 30+ minutes minimum. Set timeout to 60+ minutes.
- `npm install` - 1 minute 20 seconds (validated)
- `npm run lint` - 2 seconds (validated)
- `npm run build` - 5 seconds including TypeScript compilation (validated)
- `npm run dev` - starts in 200ms, runs continuously (validated)

### Dependencies and Configuration
- React 18.2.0 with TypeScript
- Vite 5.x for build tooling
- Firebase 10.x for authentication and analytics
- Tailwind CSS for styling
- ESLint for linting (configured with TypeScript support)

### Firebase Configuration
- Firebase config is in `src/firebase.js`
- Uses environment variables from `.env` file
- Authentication, Firestore, and analytics are configured
- Copy `.env.example` to `.env` and configure with your Firebase project credentials

## Validation

### Manual Testing Requirements
- **ALWAYS** manually validate changes by running the development server
- **REQUIRED**: After making changes, test the complete user flow:
  1. Run `npm install` (skip Firebase CLI install if not needed - takes 30+ minutes)
  2. Run `npm run lint` (must pass - 2 seconds)
  3. Run `npm run build` (must succeed - 5 seconds)
  4. Run `npm run dev` (starts in 200ms)
  5. Navigate to http://localhost:5173
  6. Verify the React app loads and displays the home page
  7. Check browser console for any Firebase-related errors
  8. Test authentication flow if modified
- Take screenshots of any UI changes for verification

### CI/CD Pipeline Requirements
- **ALWAYS** run `npm run lint` before committing - CI will fail if linting errors exist
- **ALWAYS** run `npm run build` before committing - CI tests both Node 18.x and 20.x
- CI pipeline runs: install, lint, build, and deploy to GitHub Pages
- Linting must pass with max 5 warnings (currently configured)

## Common Tasks

### Repository Structure
```
/home/runner/work/nuestro-pulso-test/nuestro-pulso-test/
├── .env.example             # Firebase configuration template
├── .eslintrc.cjs           # ESLint configuration
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/ci.yml    # CI/CD pipeline
├── README.md               # Basic setup instructions
├── dev.sh                  # Development server launcher
├── setup.sh                # Automated environment setup
├── index.html              # HTML entry point
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
├── src/
│   ├── App.tsx             # Main application component
│   ├── main.jsx            # React entry point
│   ├── firebase.js         # Firebase configuration
│   ├── hooks/
│   │   └── useAuth.ts      # Authentication hook
│   ├── components/         # React components
│   ├── pages/              # Page components
│   └── types/              # TypeScript type definitions
└── dist/                   # Build output (generated)
```

### Key Files to Monitor
- `src/firebase.js` - Firebase configuration and authentication setup
- `src/App.tsx` - Main application component
- `src/hooks/useAuth.ts` - Authentication hook (exported separately for react-refresh)
- `package.json` - Scripts and dependency definitions
- `vite.config.js` - Vite build configuration
- `.eslintrc.cjs` - ESLint rules (max 5 warnings allowed)
- `.github/workflows/ci.yml` - CI/CD pipeline configuration

### Frequent Command Outputs

#### npm install output
```
added 350 packages, and audited 351 packages in 1m
68 packages are looking for funding
12 moderate severity vulnerabilities
```

#### npm run lint success
```
> eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 5
[TypeScript version warning - safe to ignore]
[completes with exit code 0]
```

#### npm run build success
```
> tsc && vite build
vite v5.4.20 building for production...
✓ 40 modules transformed.
dist/index.html                    1.57 kB │ gzip:  0.66 kB
dist/assets/index-BSYGTbdl.css     35.83 kB │ gzip:  6.08 kB
dist/assets/index-BjRvGS8A.js      73.87 kB │ gzip: 18.49 kB
dist/assets/react-vendor.js       140.87 kB │ gzip: 45.26 kB
✓ built in 1.59s
```

#### npm run dev success
```
> vite
VITE v5.4.20  ready in 214 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Environment Configuration
```bash
# .env file structure (copy from .env.example)
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Critical Warnings

- **NEVER CANCEL** the `bash setup.sh` command - Firebase CLI installation requires 30+ minutes minimum
- **ALWAYS** use timeouts of 60+ minutes for Firebase CLI installation
- **ALWAYS** run `npm run lint` before committing - CI will fail otherwise
- **ALWAYS** run `npm run build` to verify TypeScript compilation
- **ALWAYS** test changes manually in the browser after running dev server
- Dependencies are mixed between package.json and global installation (Firebase CLI)
- ESLint is configured with max 5 warnings - keep warnings under this limit
- TypeScript version 5.9.2 generates warnings but works correctly
- React components and hooks must be in separate files for react-refresh to work

## Troubleshooting

### Common Issues
- **Linting fails**: Check ESLint errors, most common are:
  - Interface name conflicts (use specific names like `DebateComment` instead of `Comment`)
  - React hooks exported from component files (move to separate files)
- **Build fails**: Usually TypeScript errors - check import paths and type definitions
- **Dev server fails**: Run `npm install` first, ensure dependencies are installed
- **Firebase errors in console**: Check `.env` file configuration and Firebase project settings

### Build and Test Validation Commands
```bash
# Complete validation sequence (run in this order):
npm install                    # 1m 20s
npm run lint                   # 2s - must pass
npm run build                  # 5s - must succeed  
npm run dev                    # starts in 200ms
# Navigate to http://localhost:5173 and test functionality
```

### Quick Setup for New Clones
```bash
# Skip Firebase CLI if not needed for your changes:
npm install                    # Fast setup - 1m 20s
cp .env.example .env          # Configure if needed
npm run dev                    # Start development - 200ms
```