import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare const app: FirebaseApp;
declare const analytics: Analytics | null;
declare const auth: Auth;
declare const db: Firestore;

export { app, analytics, auth, db };