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

## Configuration Setup

1. **Environment Configuration**  
   Create a `.env` file in the project root and configure your API keys and integrations. Use `.env.example` as a comprehensive template that includes:
   - **Firebase Authentication** (required for user authentication)
   - **Google News API** (for news aggregation)
   - **Supabase** (database and real-time features)
   - **Social Media APIs** (YouTube, Facebook, Twitter integrations)
   - **Search and Performance** settings
   - **App Environment** and feature flags

2. **Firebase Authentication Setup**  
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
   - Never commit your real `.env` file, only `.env.example.

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