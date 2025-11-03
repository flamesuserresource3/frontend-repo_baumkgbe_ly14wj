import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sections from './components/Sections';
import SignInOverlay from './components/SignInOverlay';

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

  const handleLogout = () => {
    window.location.hash = '';
    setRoute('home');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {route === 'home' && (
        <main>
          <Hero />
          <Sections />
        </main>
      )}

      {route === 'login' && (
        <SignInOverlay onSuccess={handleLoginSuccess} />
      )}

      {route === 'dashboard' && (
        <main className="pt-24 md:pt-28">
          <section className="max-w-3xl mx-auto px-4 md:px-6 py-12">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-black/70">
              You are signed in. This view preserves the previous mock access flow and does not introduce new sections yet.
            </p>
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2.5 text-sm font-medium hover:-translate-y-px transition-transform bg-white"
              >
                Log out
              </button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
