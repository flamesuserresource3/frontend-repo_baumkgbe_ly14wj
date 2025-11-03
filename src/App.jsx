import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sections from './components/Sections';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function SignInOverlay({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('signin'); // signin | dashboard
  const [error, setError] = useState('');

  const validate = () => {
    const okEmail = /.+@.+\..+/.test(email);
    const okPass = password.length >= 6;
    if (!okEmail) return 'Please enter a valid email address.';
    if (!okPass) return 'Password must be at least 6 characters.';
    return '';
  };

  const submit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
    } else {
      // Mock access granted
      setError('');
      setStep('dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white text-black">
      {step === 'signin' ? (
        <div className="min-h-full flex items-center justify-center p-6">
          <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 text-sm underline">Close</button>
          <div className="w-full max-w-md p-8 rounded-2xl border border-black/10 bg-white shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-center">Sign in to Dashboard</h2>
            <p className="text-center text-sm opacity-70 mb-6">Demo access — any valid credentials will work.</p>
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
                <div className="mt-2">
                  <button type="button" className="text-sm underline">Forgot Password?</button>
                </div>
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div className="flex items-center justify-between">
                <button type="submit" className="rounded-full bg-black text-white px-5 py-2 text-sm hover:opacity-90">Sign In</button>
                <span className="text-xs opacity-60">Demo mode</span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Dashboard onClose={onClose} />
      )}
    </div>
  );
}

export default function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const onHash = () => setShowOverlay(window.location.hash === '#dashboard');
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closeOverlay = () => {
    history.replaceState(null, '', ' ');
    setShowOverlay(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main>
        <Hero />
        <Sections />
      </main>
      <Footer />

      {showOverlay && <SignInOverlay onClose={closeOverlay} />}
    </div>
  );
}
