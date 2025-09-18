/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Google News API
  readonly VITE_GOOGLE_NEWS_API_KEY: string
  readonly VITE_GOOGLE_NEWS_API_URL: string

  // Supabase Integration
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string

  // Firebase Integration
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string

  // Social Media APIs
  readonly VITE_YOUTUBE_API_KEY: string
  readonly VITE_FACEBOOK_APP_ID: string
  readonly VITE_TWITTER_BEARER_TOKEN: string

  // News API Configuration (Legacy support)
  readonly VITE_NEWS_API_KEY: string

  // Real-time and fallback configs
  readonly VITE_ENABLE_REALTIME: string
  readonly VITE_MOCK_DATA_MODE: string

  // App Environment
  readonly VITE_APP_ENV: string
}