import React from 'react';
import { LogOut } from 'lucide-react';

const ExitButton = ({ onClick, label = 'Exit Dashboard' }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={label}
      className="group inline-flex items-center gap-2 rounded-full bg-black text-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_6px_20px_rgba(0,0,0,0.25)] ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60 focus-visible:ring-offset-white active:scale-[0.99]"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.0))' }}
    >
      <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 group-hover:text-white transition-colors" />
      <span className="text-sm sm:text-base font-medium tracking-tight">{label}</span>
    </button>
  );
};

export default ExitButton;
