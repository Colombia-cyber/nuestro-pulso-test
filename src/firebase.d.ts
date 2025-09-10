import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';

declare const app: FirebaseApp;
declare const analytics: Analytics | null;
declare const auth: Auth;

export { app, analytics, auth };