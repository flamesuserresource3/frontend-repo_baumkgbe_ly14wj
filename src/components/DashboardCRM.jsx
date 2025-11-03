import React, { useMemo, useState } from 'react';
import { Bell, CalendarCheck, PhoneCall, Users2, BarChart3, Activity, CheckCircle2, Clock3, AlertTriangle } from 'lucide-react';
import DashboardNav from './DashboardNav';
import KpiCard from './KpiCard';
import Counter from './Counter';
import { GroupedBarWithLine, PieChart, DonutChart, Heatmap, LineChart, ProgressBar } from './SimpleCharts';
import ExitButton from './ExitButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardCRM({ onExit }) {
  const [tab, setTab] = useState('appointments');

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Dashboard top bar (separate from main site navbar) */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">V</div>
            <div className="leading-tight">
              <div className="font-semibold">Velodent CRM</div>
              <div className="text-xs text-black/60">Dashboard</div>
            </div>
          </div>
          <ExitButton onClick={onExit} label="Exit Dashboard" />
        </div>
        <DashboardNav active={tab} onChange={setTab} />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {tab === 'appointments' && (
            <motion.section key="appointments" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <SectionHeader icon={CalendarCheck} title="Appointments" subtitle="Booked, rescheduled, and cancelled with trends" />
              <div className="grid sm:grid-cols-3 gap-4">
                <KpiCard label="Booked" value={<Counter to={128} />} delta={8.2} deltaLabel="WoW" tone="success" />
                <KpiCard label="Rescheduled" value={<Counter to={23} />} delta={-2.1} deltaLabel="WoW" tone="warning" />
                <KpiCard label="Cancelled" value={<Counter to={9} />} delta={-0.7} deltaLabel="WoW" tone="danger" />
              </div>
              <div className="mt-6 rounded-2xl border border-black/10 p-5">
                <GroupedBarWithLine data={APPT_DATA} />
              </div>
            </motion.section>
          )}

          {tab === 'calls' && (
            <motion.section key="calls" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <SectionHeader icon={PhoneCall} title="Calls / Follow-ups" subtitle="Completed, pending, and no-shows" />
              <div className="grid sm:grid-cols-3 gap-4">
                <KpiCard label="Completed" value={<Counter to={286} />} delta={12} deltaLabel="MoM" tone="success" />
                <KpiCard label="Pending" value={<Counter to={64} />} delta={-4} deltaLabel="MoM" tone="warning" />
                <KpiCard label="No-shows" value={<Counter to={18} />} delta={-14} deltaLabel="since last week" tone="danger" />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-black/10 p-5 flex flex-col items-center">
                  <PieChart values={[286, 64, 18]} colors={["#16a34a", "#f59e0b", "#e11d48"]} />
                  <div className="mt-3 text-sm text-black/70">Completed / Pending / No-shows</div>
                </div>
                <div className="rounded-2xl border border-black/10 p-5">
                  <h4 className="font-medium mb-3">Weekly Heatmap</h4>
                  <Heatmap matrix={HEATMAP} />
                </div>
              </div>
            </motion.section>
          )}

          {tab === 'leads' && (
            <motion.section key="leads" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <SectionHeader icon={Users2} title="Leads" subtitle="New leads, conversion rates, and sources" />
              <div className="grid sm:grid-cols-3 gap-4">
                <KpiCard label="New Leads" value={<Counter to={74} />} delta={9} deltaLabel="WoW" tone="neutral" />
                <KpiCard label="Conversion Rate" value={<span><Counter to={32} />%</span>} delta={3.2} deltaLabel="vs last month" tone="success" />
                <KpiCard label="Cost per Lead" value={"$" + Intl.NumberFormat().format(38)} delta={-6.5} deltaLabel="vs last week" tone="success" />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-black/10 p-5 flex flex-col items-center">
                  <DonutChart values={[34, 22, 18]} colors={["#111", "#6b7280", "#d1d5db"]} />
                  <div className="mt-3 text-sm text-black/70">Lead Sources: Ads / Organic / Referrals</div>
                </div>
                <div className="rounded-2xl border border-black/10 p-5">
                  <h4 className="font-medium mb-4">Funnel</h4>
                  <div className="space-y-4">
                    {FUNNEL.map((f) => (
                      <div key={f.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{f.label}</span>
                          <span className="opacity-70">{f.value}%</span>
                        </div>
                        <ProgressBar value={f.value} color={f.color} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {tab === 'patients' && (
            <motion.section key="patients" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <SectionHeader icon={Users2} title="Patient Management" subtitle="Onboarding, insurance verification, and claims" />
              <div className="grid sm:grid-cols-3 gap-4">
                <KpiCard label="Onboarding" value={<Counter to={86} />} delta={4} deltaLabel="completion" tone="success" />
                <KpiCard label="Insurance Verified" value={<Counter to={62} />} delta={7} deltaLabel="this week" tone="success" />
                <KpiCard label="Claim Eligibility" value={<span><Counter to={91} />%</span>} delta={1.2} deltaLabel="approved" tone="neutral" />
              </div>
              <div className="mt-6 rounded-2xl border border-black/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-black/5">
                    <tr>
                      <Th>Patient</Th>
                      <Th>Status</Th>
                      <Th>Insurance</Th>
                      <Th>Claim</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {PATIENT_ROWS.map((r, i) => (
                      <tr key={i} className="border-t border-black/10">
                        <Td>{r.name}</Td>
                        <Td>
                          <Badge tone={r.status === 'Complete' ? 'green' : r.status === 'Pending' ? 'yellow' : 'red'}>{r.status}</Badge>
                        </Td>
                        <Td>
                          <ProgressBar value={r.insurance} color={r.insurance > 80 ? '#16a34a' : r.insurance > 50 ? '#f59e0b' : '#e11d48'} />
                        </Td>
                        <Td>
                          <span className="opacity-70">{r.claim}</span>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

          {tab === 'analytics' && (
            <motion.section key="analytics" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <SectionHeader icon={BarChart3} title="Analytics" subtitle="ROI and performance trends" />
              <div className="grid sm:grid-cols-4 gap-4">
                <KpiCard label="ROI" value={<span><Counter to={212} />%</span>} delta={5.4} deltaLabel="vs baseline" tone="success" />
                <KpiCard label="Utilization" value={<span><Counter to={78} />%</span>} delta={2.1} deltaLabel="7d" tone="neutral" />
                <KpiCard label="AOV" value={"$" + Intl.NumberFormat().format(327)} delta={3.9} deltaLabel="14d" tone="success" />
                <KpiCard label="CSAT" value={<span><Counter to={96} />%</span>} delta={-0.3} deltaLabel="this week" tone="warning" />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-black/10 p-5">
                  <h4 className="font-medium mb-3">Performance Trends</h4>
                  <LineChart data={TREND} color="#111" />
                </div>
                <div className="rounded-2xl border border-black/10 p-5">
                  <h4 className="font-medium mb-3">Campaign Progress</h4>
                  <div className="space-y-4">
                    {CAMPAIGNS.map((c) => (
                      <div key={c.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{c.label}</span>
                          <span className="opacity-70">{c.value}%</span>
                        </div>
                        <ProgressBar value={c.value} color={c.color} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {tab === 'notifications' && (
            <motion.section key="notifications" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <SectionHeader icon={Bell} title="Notifications" subtitle="Alerts, reminders, and pending actions" />
              <div className="space-y-3">
                {NOTICES.map((n, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between rounded-xl border border-black/10 p-4">
                    <div className="flex items-center gap-3">
                      <StatusIcon tone={n.tone} />
                      <div>
                        <div className="font-medium">{n.title}</div>
                        <div className="text-sm opacity-70">{n.subtitle}</div>
                      </div>
                    </div>
                    <Badge tone={n.tone}>{n.badge}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2">
        <Icon size={18} />
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <p className="text-sm text-black/60">{subtitle}</p>
    </div>
  );
}

function Th({ children }) {
  return <th className="text-left text-xs uppercase tracking-wide text-black/60 px-4 py-3">{children}</th>;
}
function Td({ children }) {
  return <td className="px-4 py-3 text-sm">{children}</td>;
}

function Badge({ children, tone = 'green' }) {
  const styles = {
    green: 'bg-green-50 text-green-700 border-green-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    red: 'bg-rose-50 text-rose-700 border-rose-100',
    neutral: 'bg-black/5 text-black/70 border-black/10'
  };
  return <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${styles[tone]}`}>{children}</span>;
}

function StatusIcon({ tone }) {
  const map = {
    green: CheckCircle2,
    yellow: Clock3,
    red: AlertTriangle,
  };
  const Icon = map[tone] || Activity;
  const color = tone === 'green' ? 'text-green-600' : tone === 'yellow' ? 'text-yellow-600' : 'text-rose-600';
  return <Icon className={color} size={18} />;
}

// Mock data
const APPT_DATA = [
  { label: 'Mon', booked: 18, rescheduled: 3, cancelled: 2, trend: 22 },
  { label: 'Tue', booked: 21, rescheduled: 2, cancelled: 1, trend: 24 },
  { label: 'Wed', booked: 19, rescheduled: 4, cancelled: 2, trend: 23 },
  { label: 'Thu', booked: 24, rescheduled: 5, cancelled: 1, trend: 28 },
  { label: 'Fri', booked: 22, rescheduled: 3, cancelled: 2, trend: 25 },
  { label: 'Sat', booked: 17, rescheduled: 5, cancelled: 1, trend: 20 },
  { label: 'Sun', booked: 7,  rescheduled: 1, cancelled: 0, trend: 8 },
];

const HEATMAP = [
  [2, 4, 1, 0, 3, 5, 1],
  [3, 1, 2, 5, 4, 1, 0],
  [1, 3, 4, 2, 0, 1, 5],
  [0, 1, 3, 2, 4, 5, 2],
  [2, 5, 4, 3, 1, 0, 2],
];

const FUNNEL = [
  { label: 'Visited Site', value: 100, color: '#111' },
  { label: 'Booked Consult', value: 62, color: '#6b7280' },
  { label: 'Attended', value: 48, color: '#9ca3af' },
  { label: 'Started Treatment', value: 32, color: '#d1d5db' },
];

const PATIENT_ROWS = [
  { name: 'Ava Thompson', status: 'Complete', insurance: 92, claim: 'Approved' },
  { name: 'Liam Carter', status: 'Pending', insurance: 68, claim: 'Under review' },
  { name: 'Noah Patel', status: 'Action Needed', insurance: 44, claim: 'Missing docs' },
  { name: 'Mia Rodriguez', status: 'Complete', insurance: 88, claim: 'Approved' },
  { name: 'Ethan Nguyen', status: 'Pending', insurance: 71, claim: 'Eligibility check' },
];

const TREND = Array.from({ length: 16 }, (_, i) => ({ x: i, y: 50 + Math.round(Math.sin(i / 2) * 18 + i) }));

const CAMPAIGNS = [
  { label: 'Recall Sequence', value: 78, color: '#111' },
  { label: 'PPC Leads', value: 64, color: '#6b7280' },
  { label: 'Referral Program', value: 52, color: '#9ca3af' },
  { label: 'Reactivation', value: 41, color: '#d1d5db' },
];

const NOTICES = [
  { title: '12 appointments scheduled today', subtitle: 'Review chair utilization and confirmations', badge: 'Today', tone: 'green' },
  { title: '6 follow-ups pending', subtitle: 'Assign to team before 5pm close', badge: 'Pending', tone: 'yellow' },
  { title: 'Insurance docs missing for 2 patients', subtitle: 'Upload EOBs to continue claim review', badge: 'Urgent', tone: 'red' },
];
