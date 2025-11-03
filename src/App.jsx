import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sections from './components/Sections';
import Footer from './components/Footer';

function DashboardOverlay({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    alert('Demo sign-in — connect backend to enable authentication.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 text-sm underline"
      >
        Close
      </button>
      <div className="w-full max-w-md p-8 rounded-2xl border border-black/10 bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign in to Dashboard</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-black/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="you@clinic.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-black/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="rounded-full bg-black text-white px-5 py-2 text-sm hover:opacity-90">Sign In</button>
            <button type="button" className="text-sm underline">Forgot Password?</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const onHash = () => setShowDashboard(window.location.hash === '#dashboard');
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closeDashboard = () => {
    history.replaceState(null, '', ' ');
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main>
        <Hero />
        <Sections />
      </main>
      <Footer />

      {showDashboard && <DashboardOverlay onClose={closeDashboard} />}
    </div>
  );
}
