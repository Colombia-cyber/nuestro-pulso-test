import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';

// Page components
import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';
import Legislation from '../pages/Legislation';
import Congress from '../pages/Congress';
import News from '../pages/News';
import Analytics from '../pages/Analytics';
import Debate from '../pages/Debate';
import Survey from '../pages/Survey';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/legislation" element={<Legislation />} />
            <Route path="/congress" element={<Congress />} />
            <Route path="/news" element={<News />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/debate" element={<Debate />} />
            <Route path="/survey" element={<Survey />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;