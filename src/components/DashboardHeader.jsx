import { LayoutDashboard, Activity, PhoneCall, Calendar } from 'lucide-react';

export default function DashboardHeader() {
  const booked = 248;
  const calls = 132;
  const conversions = 58;

  return (
    <header className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-black text-white flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Velodent CRM — Dashboard</h1>
            <p className="text-sm text-neutral-500">Minimalist theme • Stable build</p>
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
          </div>
        </div>
        <div className={`h-10 w-10 rounded-lg border border-black/10 flex items-center justify-center ${badgeBg}`}>
          <Icon className={color} size={18} />
        </div>
      </div>
    </div>
  );
}
