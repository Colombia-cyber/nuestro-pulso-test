import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";

interface SearchPageProps {
  initialQuery?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialQuery = '' }) => {
  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get('q') || initialQuery;
  const initialCategory = urlParams.get('category') || 'todos';

  return (
    <div className="container mx-auto px-4 py-8">
      <UniversalSearchBar 
        initialQuery={urlQuery}
        initialCategory={initialCategory}
      />
    </div>
  );
};

export default SearchPage;