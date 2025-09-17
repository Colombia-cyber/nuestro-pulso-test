import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";
import GoogleWebSearchBar from "../components/GoogleWebSearchBar";

const SearchPage: React.FC = () => {
  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('category') || 'todos';

  return (
    <div className="container mx-auto px-4 py-8">
      <UniversalSearchBar 
        initialQuery={initialQuery}
        initialCategory={initialCategory}
      />
      
      {/* Separator */}
      <div className="my-12 border-t border-gray-200"></div>
      
      {/* Google World Search */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            🌍 Google World
          </h2>
          <p className="text-gray-600">
            Busca información global y noticias internacionales con comentarios integrados
          </p>
        </div>
        <GoogleWebSearchBar />
      </div>
    </div>
  );
};

export default SearchPage;