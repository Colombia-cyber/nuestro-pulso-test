import React from "react";
import GoogleWebSearchBar from "../components/GoogleWebSearchBar";

const SearchPage: React.FC = () => (
  <main style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Búsqueda Universal</h1>
    <GoogleWebSearchBar />
    {/* Room for future: filters, history, trending, etc. */}
  </main>
);

export default SearchPage;