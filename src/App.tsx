import React from "react";
import Navbar from "./components/NavBar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";

function App() {
  return (
    <div>
      <Navbar />
      {/* Universal fallback: visible on all routes */}
      <GoogleWebSearchBar />
      {/* ...rest of your app, routes, sections... */}
    </div>
  );
}

export default App;