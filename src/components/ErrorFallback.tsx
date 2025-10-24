import React from 'react';

interface ErrorFallbackProps {
  error?: Error | string;
  resetError?: () => void;
  title?: string;
  message?: string;
}

/**
 * ErrorFallback - Friendly error UI component
 * 
 * Displays user-friendly error messages with optional retry functionality.
 * Used across sections when data fetching or rendering fails.
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  title = 'Algo salió mal',
  message
}) => {
  const errorMessage = message || 
    (typeof error === 'string' ? error : error?.message) ||
    'No pudimos cargar este contenido. Por favor, intenta de nuevo.';

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center p-8 bg-red-50 border-2 border-red-200 rounded-lg"
      style={{
        minHeight: '200px',
        textAlign: 'center'
      }}
    >
      <div className="text-6xl mb-4" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="text-2xl font-bold text-red-800 mb-2">
        {title}
      </h2>
      <p className="text-red-700 mb-6 max-w-md">
        {errorMessage}
      </p>
      {resetError && (
        <button
          onClick={resetError}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          aria-label="Intentar cargar de nuevo"
        >
          Intentar de nuevo
        </button>
      )}
      {!resetError && (
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          aria-label="Recargar página"
        >
          Recargar página
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;
