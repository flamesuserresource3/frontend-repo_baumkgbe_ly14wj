import React from 'react';
import ExitButton from './ExitButton';

const DashboardHeader = ({ onExit }) => {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">V</div>
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-semibold text-neutral-900">Velodent CRM</h1>
            <p className="text-xs text-neutral-500 leading-none">Dashboard</p>
          </div>
        </div>
        <ExitButton onClick={onExit} />
      </div>
    </header>
  );
};

export default DashboardHeader;
