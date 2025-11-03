import { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClasses =
    'px-3 py-2 text-sm md:text-base hover:opacity-70 transition-opacity';

  const openDashboard = (e) => {
    e.preventDefault();
    window.location.hash = '#dashboard';
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur bg-white/70 border-b border-black/5' : 'bg-white'
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
        <a href="#home" className="font-semibold tracking-tight text-lg">
          Velodent
        </a>
        <div className="hidden md:flex items-center gap-1">
          <a href="#home" className={linkClasses}>Home</a>
          <a href="#about" className={linkClasses}>About</a>
          <a href="#services" className={linkClasses}>Services</a>
          <a href="#case-studies" className={linkClasses}>Case Studies</a>
          <a href="#testimonials" className={linkClasses}>Testimonials</a>
          <a href="#faq" className={linkClasses}>FAQ</a>
          <a href="https://cal.com/velodent-ogbkfv/20min" target="_blank" rel="noreferrer" className={linkClasses}>Contact / Book Now</a>
        </div>
        <div className="flex items-center gap-2">
          {/* Premium Dashboard Button */}
          <a
            href="#dashboard"
            onClick={openDashboard}
            aria-label="Open Dashboard"
            className="group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-black/5 to-black/10" aria-hidden />
            <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 group-hover:ring-black/20 transition" aria-hidden />
            <span className="absolute -inset-px rounded-full shadow-sm group-hover:shadow-md transition-shadow" aria-hidden />
            <LogIn size={16} className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 hidden sm:inline">Open Dashboard</span>
          </a>

          <a
            href="https://cal.com/velodent-ogbkfv/20min"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Book Now
          </a>
        </div>
      </nav>
    </header>
  );
}
