# Nuestro Pulso Test

## Setup
To get started with the project, follow these instructions:

1. Clone the repository:
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   ```
2. Navigate into the project directory:
   ```bash
   cd nuestro-pulso-test
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

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

## Google Search Integration Setup

For the search functionality to work with real Google results, you need to configure Google Custom Search API:

1. **Get Google API Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Custom Search API"
   - Go to "APIs & Services > Credentials" and create an API key
   - Restrict the API key to only allow Custom Search API

2. **Create Custom Search Engine**:
   - Go to [Google Custom Search](https://cse.google.com/)
   - Create a new search engine
   - Add websites to search (or use "*" for the entire web)
   - Get your Search Engine ID from the control panel

3. **Configure Environment Variables**:
   In your `.env` file, add:
   ```bash
   GOOGLE_API_KEY=your_actual_google_api_key
   GOOGLE_SEARCH_ENGINE_ID=your_actual_search_engine_id
   ```

4. **Security Note**:
   - API keys are handled securely on the backend only
   - Never commit real API keys to version control
   - The frontend calls the backend `/api/search` endpoint, which handles Google API requests
   - Without API keys, the system uses intelligent fallback results

## Development

1. **Start the backend server**:
   ```bash
   npm run server
   ```

2. **Start the frontend development server** (in a new terminal):
   ```bash
   npm run dev
   ```

3. **Or run both together**:
   ```bash
   npm run dev:full
   ```

4. **Security Note**
   - Never commit your real `.env` file, only `.env.example`.
   - Google API keys are only used on the backend for security

---

## Features
- Mobile-first design
- Built with TypeScript, React, and Tailwind CSS
- Feature parity with existing civic engagement platforms
- Continuous Integration and Continuous Deployment (CI/CD) workflow
- **Search UI Example**: Ready-to-integrate mobile-first search interface (see `search-ui/` folder)

## Testing
To run tests for the project, use the following command:
```bash
npm test
```

## Search UI Example
A mobile-first search UI example is available in the `search-ui/` directory. This provides a Google-like search interface that's ready to integrate with your preferred search backend (Algolia, Typesense, Elasticsearch, or custom API).

To try it:
```bash
cd search-ui
python -m http.server 8080
# Visit http://localhost:8080/search.html?q=participación
```

See `search-ui/README.md` for complete integration documentation.