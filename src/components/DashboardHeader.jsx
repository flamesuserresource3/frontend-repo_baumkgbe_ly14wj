import { useEffect, useRef, useState } from 'react';
import { LayoutDashboard, Activity, PhoneCall, Calendar } from 'lucide-react';

function useCountUp(target = 0, duration = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const start = performance.now();
    startRef.current = start;

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function DashboardHeader() {
  const booked = useCountUp(248);
  const calls = useCountUp(132);
  const conversions = useCountUp(58);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-black text-white flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Velodent CRM — Dashboard</h1>
            <p className="text-sm text-neutral-500">Premium minimalist theme • Data is simulated for demo</p>
          </div>
        </div>
        <a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Exit</a>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard icon={Calendar} label="Appointments Booked" value={booked} color="text-green-600" badgeBg="bg-green-50" />
        <KpiCard icon={PhoneCall} label="Calls / Follow-ups" value={calls} color="text-yellow-600" badgeBg="bg-yellow-50" />
        <KpiCard icon={Activity} label="Conversions" value={conversions} color="text-rose-600" badgeBg="bg-rose-50" />
      </div>
    </header>
  );
}

function KpiCard({ icon: Icon, label, value, color = 'text-green-600', badgeBg = 'bg-green-50' }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl font-semibold tabular-nums ${color}`}>{value}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${badgeBg} ${color}`}>live</span>
          </div>
        </div>
        <div className={`h-10 w-10 rounded-lg border border-black/10 flex items-center justify-center ${badgeBg}`}>
          <Icon className={color} size={18} />
        </div>
      </div>
    </div>
  );
}
