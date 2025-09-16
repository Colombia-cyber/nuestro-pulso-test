import React from "react";
import LocalSearchBar from "../components/LocalSearchBar";

const SearchPage: React.FC = () => {
  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Colombian-focused search header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🇨🇴</span>
            <div>
              <h1 className="text-3xl font-bold">Búsqueda Colombia</h1>
              <p className="text-white/90">Contenido exclusivo de Colombia: noticias, debates y discusiones cívicas</p>
            </div>
            <span className="text-4xl ml-auto">🔍</span>
          </div>
        </div>

        <LocalSearchBar 
          initialQuery={initialQuery}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

export default SearchPage;