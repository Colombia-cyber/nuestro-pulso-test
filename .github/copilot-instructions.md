# Nuestro Pulso Test - Vite + React + Firebase Project

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- **CRITICAL**: Firebase CLI installation takes 15+ minutes. NEVER CANCEL. Set timeout to 30+ minutes.
- Run setup: `bash setup.sh` 
  - Installs Node.js 18.x if not present
  - Installs Firebase CLI globally (LONG RUNNING: 15+ minutes minimum)
  - Installs npm dependencies via `npm install`
- Start development server: `bash dev.sh` or `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

### Build and Development Times
- **NEVER CANCEL**: Firebase CLI installation takes 15+ minutes minimum. Set timeout to 30+ minutes.
- `npm install` - typically 2-3 minutes
- `npm run build` - typically 1-2 minutes  
- `npm run dev` - starts immediately, runs continuously

### Firebase Configuration
- Firebase config is in `src/firebase.js`
- Project is pre-configured with "nuestro-pulso-chat" Firebase project
- Authentication and analytics are enabled
- To use a different Firebase project, update the config object in `src/firebase.js`

## Validation

### Manual Testing Requirements
- **ALWAYS** manually validate changes by running the development server
- **REQUIRED**: After making changes, test the complete user flow:
  1. Run `bash setup.sh` (wait for full completion - 15+ minutes)
  2. Run `bash dev.sh` 
  3. Navigate to the development URL (typically http://localhost:5173)
  4. Verify the React app loads and displays "Hello Vite + React!"
  5. Check browser console for any Firebase-related errors
- Take screenshots of any UI changes for verification

### No Testing Infrastructure
- This project has no unit tests, linting, or CI/CD pipelines
- Manual validation through the browser is the primary testing method
- No additional testing commands are available

## Common Tasks

### Repository Structure
```
/home/runner/work/nuestro-pulso-test/nuestro-pulso-test/
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