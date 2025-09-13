import React from "react";
import NavBar from "./components/NavBar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";

function App() {
  return (
    <div>
      <NavBar />
      {/* Universal fallback: visible on all routes */}
      <GoogleWebSearchBar />
      {/* ...rest of your app, routes, sections... */}
    </div>
  );
}

export default App;