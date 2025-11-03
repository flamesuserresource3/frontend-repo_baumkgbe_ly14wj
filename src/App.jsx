import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import SignInOverlay from './components/SignInOverlay';

const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const isDash = window.location.hash === '#dashboard';
      setAuthed(isDash);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleLoginSuccess = () => {
    window.location.hash = '#dashboard';
    setAuthed(true);
  };

  const handleExit = () => {
    // Preserve existing mock/demo flow: go back to access page
    window.location.hash = '';
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {authed ? (
        <Dashboard onExit={handleExit} />
      ) : (
        <>
          <div className="relative isolate">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Velodent</h1>
              <p className="mt-3 max-w-xl text-neutral-600">
                Welcome to the Velodent CRM demo. Access the dashboard to view a sample appointments overview.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => handleLoginSuccess()}
                  className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-3 text-sm font-medium shadow-[0_6px_20px_rgba(0,0,0,0.25)] ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
                >
                  Open Dashboard
                </button>
              </div>
            </div>
          </div>
          <SignInOverlay onSuccess={handleLoginSuccess} />
        </>
      )}
    </div>
  );
};

export default App;
