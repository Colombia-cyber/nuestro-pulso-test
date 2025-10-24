import React, { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/**
 * SearchBar - Consistent, accessible search bar component
 * 
 * Emits search queries to parent component with keyboard support.
 * Features:
 * - Keyboard submission (Enter key)
 * - Clear button when text is entered
 * - ARIA labels for accessibility
 * - Customizable placeholder and styling
 */
export function SearchBar({
  onSearch,
  placeholder = "Buscar contenido...",
  className = "",
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 items-center ${className}`}
      role="search"
      aria-label="Barra de búsqueda"
    >
      <div className="relative flex-1">
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus={autoFocus}
          className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label={placeholder}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label="Buscar"
      >
        🔍 Buscar
      </button>
    </form>
  );
}