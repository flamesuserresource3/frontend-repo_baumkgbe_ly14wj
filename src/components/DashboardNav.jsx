import { motion } from 'framer-motion';

const tabs = [
  { key: 'appointments', label: 'Appointments' },
  { key: 'calls', label: 'Calls / Follow-ups' },
  { key: 'leads', label: 'Leads' },
  { key: 'patients', label: 'Patient Management' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'notifications', label: 'Notifications' },
];

export default function DashboardNav({ active, onChange }) {
  return (
    <div className="sticky top-[80px] sm:top-[80px] z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <nav className="flex gap-1.5 overflow-auto no-scrollbar w-full">
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isActive ? 'text-white bg-black shadow-sm' : 'text-black/70 hover:text-black hover:bg-black/5'
                }`}
              >
                <span className="relative inline-flex items-center gap-1">
                  {t.label}
                  {!isActive && (
                    <motion.span
                      layoutId={`hover-${t.key}`}
                      className="absolute -bottom-0.5 left-0 right-0 mx-auto h-[2px] w-0 bg-black/40"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{ width: '100%', opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    />
                  )}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
