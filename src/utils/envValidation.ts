/**
 * Environment Variable Validation Utilities
 * 
 * IMPORTANT: Frontend vs Backend Environment Variables
 * 
 * Frontend (Vite/React):
 * - Uses: import.meta.env.VITE_*
 * - All variables MUST have VITE_ prefix
 * - Available in browser at runtime
 * - Configured in .env file
 * 
 * Backend (Node.js/Express):
 * - Uses: process.env.*
 * - Variables should NOT have VITE_ prefix
 * - Available in Node.js runtime only
 * - Configured in .env file
 * - Loaded via dotenv package
 * 
 * This file is for FRONTEND use only.
 */

export interface EnvVarStatus {
  key: string;
  configured: boolean;
  value?: string;
  required: boolean;
}

export interface EnvValidationResult {
  valid: boolean;
  missingRequired: string[];
  missingOptional: string[];
  configured: EnvVarStatus[];
}

/**
 * Safely get a frontend environment variable
 * @param key Variable key (should include VITE_ prefix)
 * @param fallback Optional fallback value
 * @returns Variable value or fallback
 */
export function getEnvVar(key: string, fallback: string = ''): string {
  if (typeof window === 'undefined') {
    return fallback;
  }
  
  const value = (import.meta.env as any)[key];
  
  if (!value && !fallback) {
    console.warn(`⚠️ Environment variable ${key} is not configured`);
  }
  
  return value || fallback;
}

/**
 * Check if an environment variable is configured
 * @param key Variable key (should include VITE_ prefix)
 * @returns true if variable is set and non-empty
 */
export function isEnvVarConfigured(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const value = (import.meta.env as any)[key];
  return !!(value && value.trim().length > 0);
}

/**
 * Validate required environment variables
 * @param requiredVars Array of required variable keys
 * @param optionalVars Array of optional variable keys
 * @returns Validation result with status of each variable
 */
export function validateEnvVars(
  requiredVars: string[],
  optionalVars: string[] = []
): EnvValidationResult {
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];
  const configured: EnvVarStatus[] = [];
  
  // Check required variables
  requiredVars.forEach(key => {
    const isConfigured = isEnvVarConfigured(key);
    configured.push({
      key,
      configured: isConfigured,
      value: isConfigured ? getEnvVar(key) : undefined,
      required: true
    });
    
    if (!isConfigured) {
      missingRequired.push(key);
    }
  });
  
  // Check optional variables
  optionalVars.forEach(key => {
    const isConfigured = isEnvVarConfigured(key);
    configured.push({
      key,
      configured: isConfigured,
      value: isConfigured ? getEnvVar(key) : undefined,
      required: false
    });
    
    if (!isConfigured) {
      missingOptional.push(key);
    }
  });
  
  const valid = missingRequired.length === 0;
  
  return {
    valid,
    missingRequired,
    missingOptional,
    configured
  };
}

/**
 * Log environment validation results to console
 * @param result Validation result
 * @param serviceName Name of the service being validated
 */
export function logEnvValidation(result: EnvValidationResult, serviceName: string): void {
  if (result.valid) {
    console.log(`✅ ${serviceName}: All required environment variables configured`);
  } else {
    console.error(`❌ ${serviceName}: Missing required environment variables:`, result.missingRequired);
  }
  
  if (result.missingOptional.length > 0) {
    console.warn(`⚠️ ${serviceName}: Missing optional environment variables:`, result.missingOptional);
    console.info('💡 Some features may be limited without these variables');
  }
  
  // Log configured variables (without values for security)
  const configuredKeys = result.configured
    .filter(v => v.configured)
    .map(v => v.key);
    
  if (configuredKeys.length > 0) {
    console.log(`📋 ${serviceName} configured variables:`, configuredKeys);
  }
}

/**
 * Validate Firebase environment variables
 * @returns Validation result
 */
export function validateFirebaseEnv(): EnvValidationResult {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  const optionalVars = [
    'VITE_FIREBASE_MEASUREMENT_ID'
  ];
  
  return validateEnvVars(requiredVars, optionalVars);
}

/**
 * Validate API environment variables
 * @returns Validation result
 */
export function validateAPIEnv(): EnvValidationResult {
  const requiredVars: string[] = []; // No API keys are strictly required
  
  const optionalVars = [
    'VITE_YOUTUBE_API_KEY',
    'VITE_NEWSAPI_KEY',
    'VITE_GOOGLE_API_KEY',
    'VITE_GOOGLE_CSE_ID',
    'VITE_GUARDIAN_KEY',
    'VITE_SERPAPI_KEY'
  ];
  
  return validateEnvVars(requiredVars, optionalVars);
}

/**
 * Validate search configuration environment variables
 * @returns Validation result
 */
export function validateSearchEnv(): EnvValidationResult {
  const requiredVars: string[] = []; // Search works with defaults
  
  const optionalVars = [
    'VITE_SEARCH_PROXY_URL',
    'VITE_API_URL',
    'VITE_PAGING_CAP',
    'VITE_SEARCH_RESULTS_PER_PAGE',
    'VITE_SEARCH_DEBOUNCE_MS',
    'VITE_SEARCH_TIMEOUT_MS',
    'VITE_PROVIDER_TIMEOUT_MS'
  ];
  
  return validateEnvVars(requiredVars, optionalVars);
}

/**
 * Run complete environment validation
 * @param verbose Whether to log results to console
 * @returns Combined validation result
 */
export function validateAllEnv(verbose: boolean = true): {
  firebase: EnvValidationResult;
  api: EnvValidationResult;
  search: EnvValidationResult;
  overallValid: boolean;
} {
  const firebase = validateFirebaseEnv();
  const api = validateAPIEnv();
  const search = validateSearchEnv();
  
  if (verbose) {
    logEnvValidation(firebase, 'Firebase');
    logEnvValidation(api, 'API Services');
    logEnvValidation(search, 'Search Configuration');
  }
  
  const overallValid = firebase.valid && api.valid && search.valid;
  
  if (verbose && !overallValid) {
    console.error('❌ Environment validation failed. Please check your .env file.');
    console.info('📖 See .env.example for required variables and configuration.');
  }
  
  return { firebase, api, search, overallValid };
}
