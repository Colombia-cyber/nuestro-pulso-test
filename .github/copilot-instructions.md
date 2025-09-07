# Nuestro Pulso Test - Vite + React + Firebase Project

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- **Install dependencies**: `npm install vite @vitejs/plugin-react react react-dom firebase` -- takes 30 seconds
- **Install Firebase CLI globally**: `npm install -g firebase-tools` -- takes 15-20 minutes. NEVER CANCEL. Set timeout to 30+ minutes.
- **Alternative quick setup**: Run `bash setup.sh` -- combines Node.js check, Firebase CLI install, and npm install. Takes 15-20 minutes total. NEVER CANCEL.

### Build and Development
- **Build the project**: `npm run build` -- takes 1-2 seconds
- **Start development server**: `npm run dev` -- starts instantly, runs on http://localhost:5173/
- **Alternative dev start**: `bash dev.sh` -- wrapper script that runs `npm run dev`
- **Preview production build**: `npm run preview` -- serves the built dist/ folder

### Critical Timing Information
- **npm install**: 30 seconds maximum
- **npm run build**: 1-2 seconds maximum  
- **Firebase CLI install**: 15-20 minutes. NEVER CANCEL. Set timeout to 30+ minutes minimum.
- **Dev server startup**: Instant (under 1 second)

## Validation Scenarios

### Always Test After Changes
1. **Build validation**: Run `npm run build` and verify dist/ folder is created with index.html and assets
2. **Dev server validation**: Run `npm run dev`, verify server starts on localhost:5173, and test basic React app loads
3. **Firebase integration validation**: Check that src/firebase.js imports work without errors during build

### Manual Testing Workflow
1. Start dev server with `npm run dev`
2. Open http://localhost:5173/ in browser or test with `curl http://localhost:5173/`
3. Verify "Hello Vite + React!" message displays
4. Check browser console for any Firebase errors
5. Stop server with Ctrl+C

## Firebase Configuration
- Firebase config is pre-configured in `src/firebase.js` for project "nuestro-pulso-chat"
- Edit `src/firebase.js` to change Firebase project settings if needed
- Firebase CLI commands available after global install completes

## Common Issues and Solutions
- **"vite: not found" error**: Run `npm install vite @vitejs/plugin-react react react-dom firebase` first
- **Firebase CLI install appears stuck**: This is normal - it takes 15-20 minutes. NEVER CANCEL.
- **Build fails**: Ensure all dependencies are installed with the npm install command above

## Repository Structure
```
/home/runner/work/nuestro-pulso-test/nuestro-pulso-test/
├── src/
│   ├── App.jsx         # Main React component
│   ├── main.jsx        # React app entry point
│   └── firebase.js     # Firebase configuration
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
├── setup.sh            # Automated setup script
└── dev.sh              # Development server script
```

## Key Project Details
- **Framework**: Vite + React + Firebase
- **Development Port**: 5173
- **Build Output**: dist/ directory
- **Main Dependencies**: vite, @vitejs/plugin-react, react, react-dom, firebase
- **No tests configured** - this is a basic starter project
- **No linting configured** - add if needed for your changes

## Critical Reminders
- NEVER CANCEL Firebase CLI installation - it takes 15-20 minutes
- Always run `npm run build` to verify changes don't break the build
- Test the dev server with actual HTTP requests, not just startup
- The project requires proper dependencies installation before any npm scripts work