// API configuration for the application

// Safely get environment variable with fallback
const getEnvVar = (key: string, fallback = ''): string => {
  if (typeof window !== 'undefined') {
    // In browser, use import.meta.env for Vite
    return (import.meta.env as any)[key] || fallback;
  }
  return fallback;
};

// API endpoints configuration
export const API_CONFIG = {
  TRENDS_API: getEnvVar('REACT_APP_TRENDS_API', 'https://api.nuestropulso.com/trends'),
} as const;

// Utility function to check if trends API is configured
export const isTrendsApiConfigured = (): boolean => {
  return Boolean(API_CONFIG.TRENDS_API && API_CONFIG.TRENDS_API !== '');
};

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('API Configuration:', {
    TRENDS_API: API_CONFIG.TRENDS_API,
    isTrendsConfigured: isTrendsApiConfigured(),
  });
}