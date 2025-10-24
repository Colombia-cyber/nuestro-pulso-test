/**
 * Environment Variable Validation Utilities
 * 
 * Validates required environment variables and provides helpful console guidance.
 * Frontend uses import.meta.env.VITE_* for Vite projects.
 * Backend uses process.env.* for Node.js server.
 */

interface EnvValidationResult {
  isValid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validates frontend environment variables (VITE_* prefixed)
 */
export function validateFrontendEnv(): EnvValidationResult {
  const result: EnvValidationResult = {
    isValid: true,
    missing: [],
    warnings: []
  };

  // Required Firebase variables
  const requiredFirebase = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  // Optional but recommended variables
  const optionalVars = [
    'VITE_FIREBASE_MEASUREMENT_ID',
    'VITE_NEWSAPI_KEY',
    'VITE_YOUTUBE_API_KEY',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  // Check required Firebase variables
  requiredFirebase.forEach(varName => {
    if (!import.meta.env[varName]) {
      result.isValid = false;
      result.missing.push(varName);
    }
  });

  // Check optional variables and warn if missing
  optionalVars.forEach(varName => {
    if (!import.meta.env[varName]) {
      result.warnings.push(`Optional: ${varName} not set. Some features may be limited.`);
    }
  });

  return result;
}

/**
 * Validates backend environment variables (process.env.*)
 * Note: This should only be called on the server side
 */
export function validateBackendEnv(): EnvValidationResult {
  const result: EnvValidationResult = {
    isValid: true,
    missing: [],
    warnings: []
  };

  // Check if running in Node.js environment
  if (typeof process === 'undefined') {
    result.warnings.push('Not running in Node.js environment');
    return result;
  }

  // Required backend variables
  const requiredVars = [
    'FIREBASE_SERVICE_ACCOUNT_KEY',
    'PORT'
  ];

  // Optional backend variables
  const optionalVars = [
    'NODE_ENV',
    'SUPABASE_SERVICE_KEY'
  ];

  // Access process.env safely
  // eslint-disable-next-line no-undef
  const processEnv = (process as unknown as { env: Record<string, string | undefined> }).env || {};

  requiredVars.forEach(varName => {
    if (!processEnv[varName]) {
      result.isValid = false;
      result.missing.push(varName);
    }
  });

  optionalVars.forEach(varName => {
    if (!processEnv[varName]) {
      result.warnings.push(`Optional: ${varName} not set.`);
    }
  });

  return result;
}

/**
 * Logs environment validation results to console with helpful guidance
 */
export function logEnvValidation(result: EnvValidationResult, envType: 'frontend' | 'backend'): void {
  if (result.isValid) {
    console.log(`✅ ${envType === 'frontend' ? 'Frontend' : 'Backend'} environment variables validated successfully`);
  } else {
    console.error(`❌ ${envType === 'frontend' ? 'Frontend' : 'Backend'} environment validation failed`);
    console.error('Missing required variables:', result.missing);
    console.error('\nTo fix this:');
    console.error('1. Copy .env.example to .env');
    console.error('2. Fill in the missing variables');
    console.error('3. Restart the development server');
    console.error('\nSee docs/ENVIRONMENT_VARIABLES.md for detailed setup instructions');
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    result.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
}

/**
 * Auto-validate frontend environment on import (development mode only)
 */
if (import.meta.env.DEV) {
  const result = validateFrontendEnv();
  logEnvValidation(result, 'frontend');
}
