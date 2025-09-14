import { ApiResponse, PaginatedResponse, ApiException } from '../types/api';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

/**
 * Enhanced fetch wrapper with error handling, authentication, and timeouts
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    // Get auth token (adapt this to your auth system)
    const authToken = getAuthToken();
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    };

    const config: RequestInit = {
      signal: controller.signal,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, config);

    clearTimeout(timeoutId);

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiException(
        errorData.code || `HTTP_${response.status}`,
        errorData.message || `Request failed with status ${response.status}`,
        errorData.details
      );
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    
    // Handle API error responses
    if (!data.success && data.error) {
      throw new ApiException(
        data.code || 'API_ERROR',
        data.error,
        data.details
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiException) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiException('TIMEOUT', 'Request timed out');
    }
    
    throw new ApiException(
      'NETWORK_ERROR',
      error instanceof Error ? error.message : 'Unknown network error'
    );
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request helper
 */
export async function apiPatch<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}

/**
 * Get authentication token from localStorage or your auth provider
 * Adapt this to your authentication system
 */
function getAuthToken(): string | null {
  try {
    // Example: get from localStorage
    return localStorage.getItem('authToken');
    
    // Alternative: get from Firebase Auth
    // import { auth } from '../firebase';
    // return auth.currentUser?.getIdToken() || null;
  } catch {
    return null;
  }
}

/**
 * Utility for handling paginated API responses
 */
export async function apiGetPaginated<T>(
  endpoint: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<T>> {
  const url = `${endpoint}?page=${page}&limit=${limit}`;
  return apiGet<PaginatedResponse<T>>(url);
}

/**
 * Utility for retrying failed requests
 */
export async function apiRetry<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
  
  throw lastError!;
}