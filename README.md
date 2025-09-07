# Nuestro Pulso Test

## Cloud Setup & Quick Start

**No computer needed! Run these commands in GitHub Codespaces, Replit, or any online shell.**

### 1. Install everything (Node, Firebase CLI, dependencies)

```bash
bash setup.sh
```

### 2. Start the development server

```bash
bash dev.sh
```

### 3. Firebase Setup

Edit `src/firebase.js` and add your Firebase config.

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};
```

## Troubleshooting

- If you see errors about missing Node/npm/Firebase, rerun `setup.sh`.
- If you need to deploy to Firebase Hosting, request a `deploy.sh` script.

---

**Full collaboration and automation enabled. If you need more scripts (deployment, database setup, etc.), just ask!**