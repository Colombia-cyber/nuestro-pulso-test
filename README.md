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
4. **Security Note**
   - Never commit your real `.env` file, only `.env.example.

---

## Features
- Mobile-first design
- Built with TypeScript, React, and Tailwind CSS
- Feature parity with existing civic engagement platforms
- Continuous Integration and Continuous Deployment (CI/CD) workflow

## Testing
To run tests for the project, use the following command:
```bash
npm test
```