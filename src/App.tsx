import React from "react";
import Navbar from "./components/Navbar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";

function App() {
  return (
    <div>
      <Navbar />
      {/* Universal fallback: visible on all routes if navbar isn't enough */}
      <div style={{ padding: "1rem", maxWidth: 600, margin: "0 auto" }}>
        <GoogleWebSearchBar />
      </div>
      {/* ...rest of your app, routes, sections... */}
    </div>
  );
}

export default App;