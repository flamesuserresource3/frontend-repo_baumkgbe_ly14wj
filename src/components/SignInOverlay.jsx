import React, { useState } from 'react';

const isValidEmail = (email) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);

const SignInOverlay = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-gradient-to-b from-neutral-50 to-white p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-xl">
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900">Access Velodent Dashboard</h2>
          <p className="mt-1 text-sm text-neutral-500">Use any valid email and a 6+ character password to continue.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="you@example.com"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-black text-white py-2.5 font-medium shadow-[0_6px_20px_rgba(0,0,0,0.25)] ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 active:scale-[0.99]"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInOverlay;
