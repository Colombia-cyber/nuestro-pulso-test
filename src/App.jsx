import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CivicEngagementProvider } from './context/CivicEngagementContext';
import Navbar from './components/Navigation';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import NewsPage from './pages/NewsPage';
import LegislationPage from './pages/LegislationPage';
import CongressPage from './pages/CongressPage';
import PollsPage from './pages/PollsPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <CivicEngagementProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/legislation" element={<LegislationPage />} />
              <Route path="/congress" element={<CongressPage />} />
              <Route path="/polls" element={<PollsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </CivicEngagementProvider>
  );
}

export default App;