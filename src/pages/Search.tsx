import React from "react";
import GoogleWebSearchBar from "../components/GoogleWebSearchBar";

const SearchPage: React.FC = () => (
  <div>
    <h1>Búsqueda Universal</h1>
    <GoogleWebSearchBar />
    {/* Optionally add filters, advanced options, etc. */}
  </div>
);

export default SearchPage;