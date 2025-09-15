import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div>
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      {/* Universal fallback: visible on all routes */}
      <GoogleWebSearchBar />
      {/* ...rest of your app, routes, sections... */}
    </div>
  );
}

export default App;