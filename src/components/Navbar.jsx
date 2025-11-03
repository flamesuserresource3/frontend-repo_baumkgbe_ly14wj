import { useEffect, useState } from 'react';
import { ArrowRight, LogIn } from 'lucide-react';

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
          <a
            href="#dashboard"
            onClick={openDashboard}
            className="inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-medium hover:-translate-y-px transition-transform"
            aria-label="Open Dashboard"
          >
            <LogIn size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </a>
          <a
            href="https://cal.com/velodent-ogbkfv/20min"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Book Now
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}
