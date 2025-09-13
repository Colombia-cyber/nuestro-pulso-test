import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare const app: FirebaseApp;
declare const analytics: Analytics | null;
declare const auth: Auth;
declare const db: Firestore;

export interface SaveFavoriteItem {
  type: 'news' | 'search';
  title: string;
  description?: string;
  url: string;
  source?: string;
  publishedAt?: string;
  snippet?: string;
}

export interface SaveFavoriteResult {
  success: boolean;
  id?: string;
  message?: string;
  error?: string;
}

declare const saveFavorite: (item: SaveFavoriteItem) => Promise<SaveFavoriteResult>;
declare const getFavorites: (userId?: string) => Promise<any[]>;

export { app, analytics, auth, db, saveFavorite, getFavorites };