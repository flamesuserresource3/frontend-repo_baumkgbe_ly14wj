import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import SignInOverlay from './components/SignInOverlay';
import DashboardCRM from './components/DashboardCRM';

export default function App() {
  const [route, setRoute] = useState('home');

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'login') return setRoute('login');
      if (hash === 'dashboard') return setRoute('dashboard');
      return setRoute('home');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const handleLoginSuccess = () => {
    window.location.hash = '#dashboard';
    setRoute('dashboard');
  };

  const handleExitDashboard = () => {
    window.location.hash = '#home';
    setRoute('home');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Show main site navbar only on home and login */}
      {route !== 'dashboard' && <Navbar />}

      {route === 'home' && <Homepage />}

      {route === 'login' && (
        <SignInOverlay onSuccess={handleLoginSuccess} />
      )}

      {route === 'dashboard' && (
        <DashboardCRM onExit={handleExitDashboard} />
      )}
    </div>
  );
}
