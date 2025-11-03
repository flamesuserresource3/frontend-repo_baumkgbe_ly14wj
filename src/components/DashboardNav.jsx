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
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-black/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="font-semibold tracking-tight">Velodent CRM</div>
        <nav className="flex gap-2 overflow-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`relative px-3 py-2 rounded-full text-sm transition-colors ${active === t.key ? 'bg-black text-white' : 'hover:bg-black/5'}`}
            >
              {t.label}
              {active === t.key && (
                <motion.span layoutId="pill" className="absolute inset-0 rounded-full -z-10" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
