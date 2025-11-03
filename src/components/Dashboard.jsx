import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardNav from './DashboardNav';
import KpiCard from './KpiCard';
import Counter from './Counter';
import { StackedBarChart, LineChart, PieChart, DonutChart, Heatmap, ProgressBar, GroupedBarWithLine } from './SimpleCharts';

export default function Dashboard({ onClose }) {
  const [tab, setTab] = useState('appointments');

  return (
    <div className="fixed inset-0 z-50 bg-white text-black overflow-y-auto">
      <DashboardNav active={tab} onChange={setTab} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Velodent CRM</h1>
          <button onClick={onClose} className="text-sm underline">Exit Dashboard</button>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'appointments' && (
            <Section key="appointments" title="Appointments">
              {/* KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <KpiCard label="Booked (Today)" value={<Counter to={48} />} delta={12} deltaLabel="vs yesterday" tone="success" />
                <KpiCard label="Rescheduled" value={<Counter to={9} />} delta={2} deltaLabel="today" tone="warning" />
                <KpiCard label="Cancelled" value={<Counter to={4} />} delta={-1} deltaLabel="today" tone="danger" />
              </div>

              {/* Chart + Legend */}
              <Card title="Weekly Overview" className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="text-sm opacity-70">Bookings, reschedules and cancellations over the last 7 days.</div>
                  <div className="flex items-center gap-3 text-xs">
                    <LegendDot color="#16a34a" label="Booked" />
                    <LegendDot color="#f59e0b" label="Rescheduled" />
                    <LegendDot color="#e11d48" label="Cancelled" />
                    <LegendDot color="#111111" label="Trend" hollow />
                  </div>
                </div>
                <GroupedBarWithLine
                  data={[
                    { label: 'Mon', booked: 10, rescheduled: 2, cancelled: 1, trend: 13 },
                    { label: 'Tue', booked: 12, rescheduled: 1, cancelled: 2, trend: 12 },
                    { label: 'Wed', booked: 11, rescheduled: 3, cancelled: 1, trend: 14 },
                    { label: 'Thu', booked: 15, rescheduled: 2, cancelled: 1, trend: 15 },
                    { label: 'Fri', booked: 14, rescheduled: 2, cancelled: 3, trend: 16 },
                    { label: 'Sat', booked: 9,  rescheduled: 1, cancelled: 1, trend: 10 },
                    { label: 'Sun', booked: 7,  rescheduled: 0, cancelled: 1, trend: 7 },
                  ]}
                />
              </Card>

              {/* Secondary split: trend line and breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Trend">
                  <LineChart color="#111" data={[{ y: 10 }, { y: 12 }, { y: 11 }, { y: 14 }, { y: 15 }, { y: 13 }, { y: 16 }]} />
                </Card>
                <Card title="Breakdown (Stacked)">
                  <StackedBarChart data={[
                    { label: 'Mon', values: [10, 2, 1], colors: ['#16a34a', '#f59e0b', '#e11d48'] },
                    { label: 'Tue', values: [12, 1, 2], colors: ['#16a34a', '#f59e0b', '#e11d48'] },
                    { label: 'Wed', values: [11, 3, 1], colors: ['#16a34a', '#f59e0b', '#e11d48'] },
                    { label: 'Thu', values: [15, 2, 1], colors: ['#16a34a', '#f59e0b', '#e11d48'] },
                    { label: 'Fri', values: [14, 2, 3], colors: ['#16a34a', '#f59e0b', '#e11d48'] },
                  ]} />
                </Card>
              </div>
            </Section>
          )}

          {tab === 'calls' && (
            <Section key="calls" title="Calls / Follow-ups">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <KpiCard label="Completed" value={<Counter to={28} />} delta={5} deltaLabel="today" tone="success" />
                <KpiCard label="Pending" value={<Counter to={11} />} delta={2} deltaLabel="awaiting" tone="warning" />
                <KpiCard label="No-shows" value={<Counter to={3} />} delta={-12} deltaLabel="reduction" tone="danger" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Outcome Mix">
                  <PieChart values={[28, 11, 3]} colors={["#16a34a", "#f59e0b", "#e11d48"]} />
                </Card>
                <Card title="Follow-up Heatmap">
                  <Heatmap matrix={[
                    [1,2,3,4,3,2,1],
                    [2,3,4,5,4,3,2],
                    [1,3,5,6,5,3,1],
                    [1,2,3,4,3,2,1],
                  ]} />
                </Card>
              </div>
            </Section>
          )}

          {tab === 'leads' && (
            <Section key="leads" title="Leads">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <KpiCard label="New Leads" value={<Counter to={42} />} delta={9} deltaLabel="this week" />
                <KpiCard label="Conversion Rate" value={<span><Counter to={27} />%</span>} delta={3} deltaLabel="vs last" tone="success" />
                <KpiCard label="Avg. Response" value={<span><Counter to={8} />m</span>} delta={-2} deltaLabel="faster" tone="success" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Funnel">
                  <DonutChart values={[120, 65, 42]} colors={["#111", "#6b7280", "#16a34a"]} />
                </Card>
                <Card title="Lead Sources">
                  <ul className="space-y-3 text-sm">
                    {[
                      { label: 'Google Ads', v: 46 },
                      { label: 'Instagram', v: 32 },
                      { label: 'Referral', v: 21 },
                      { label: 'Website', v: 15 },
                    ].map((s) => (
                      <li key={s.label} className="flex items-center gap-3">
                        <div className="w-24 shrink-0 opacity-70">{s.label}</div>
                        <ProgressBar value={s.v} color="#111" />
                        <div className="w-10 text-right">{s.v}%</div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Section>
          )}

          {tab === 'patients' && (
            <Section key="patients" title="Patient Management">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <KpiCard label="Onboarding" value={<Counter to={18} />} delta={6} deltaLabel="active" />
                <KpiCard label="Insurance Verified" value={<Counter to={12} />} tone="success" />
                <KpiCard label="Claims Pending" value={<Counter to={5} />} tone="warning" />
              </div>
              <Card title="Onboarding Progress" className="mb-6">
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Forms Completed', v: 72 },
                    { label: 'Insurance Verification', v: 58 },
                    { label: 'Claim Eligibility', v: 64 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="mb-1 opacity-80">{row.label}</div>
                      <ProgressBar value={row.v} color="#111" />
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="Patients">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left opacity-70">
                        <th className="py-2">Name</th>
                        <th>Status</th>
                        <th>Insurance</th>
                        <th>Claim</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Alex Johnson', status: 'Onboarding', ins: 'Verified', claim: 'Eligible' },
                        { name: 'Priya Patel', status: 'Active', ins: 'Pending', claim: 'Review' },
                        { name: 'Diego Rivera', status: 'Active', ins: 'Verified', claim: 'Submitted' },
                      ].map((p) => (
                        <tr key={p.name} className="border-top border-black/10">
                          <td className="py-2">{p.name}</td>
                          <td><Badge tone={p.status === 'Active' ? 'success' : 'warning'}>{p.status}</Badge></td>
                          <td><Badge tone={p.ins === 'Verified' ? 'success' : p.ins === 'Pending' ? 'warning' : 'neutral'}>{p.ins}</Badge></td>
                          <td><Badge tone={p.claim === 'Eligible' || p.claim === 'Submitted' ? 'success' : 'danger'}>{p.claim}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Section>
          )}

          {tab === 'analytics' && (
            <Section key="analytics" title="Analytics">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <KpiCard label="ROI" value={<span><Counter to={312} />%</span>} tone="success" />
                <KpiCard label="CPL" value={<span>$<Counter to={28} /></span>} />
                <KpiCard label="CTR" value={<span><Counter to={4} />.%</span>} />
                <KpiCard label="Bookings" value={<Counter to={126} />} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Performance Trends">
                  <LineChart color="#111" data={[{ y: 20 }, { y: 24 }, { y: 22 }, { y: 30 }, { y: 28 }, { y: 34 }, { y: 36 }]} />
                </Card>
                <Card title="Campaign Mix">
                  <PieChart values={[45, 30, 25]} colors={["#111", "#6b7280", "#d1d5db"]} />
                </Card>
              </div>
            </Section>
          )}

          {tab === 'notifications' && (
            <Section key="notifications" title="Notifications">
              <ul className="space-y-3">
                {[
                  { text: 'Insurance verification needed for Priya Patel', tone: 'warning' },
                  { text: 'New lead from Google Ads', tone: 'success' },
                  { text: 'Follow-up scheduled for Alex Johnson', tone: 'neutral' },
                ].map((n, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between border border-black/10 rounded-xl p-3"
                  >
                    <div className="text-sm">{n.text}</div>
                    <Badge tone={n.tone}>{n.tone === 'success' ? 'OK' : n.tone === 'warning' ? 'Pending' : 'Info'}</Badge>
                  </motion.li>
                ))}
              </ul>
            </Section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {children}
    </motion.section>
  );
}

function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-black/10 p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">{title}</div>
      </div>
      {children}
    </div>
  );
}

function Badge({ children, tone = 'neutral' }) {
  const tones = {
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-black/5 text-black border-black/10',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border ${tones[tone]}`}>{children}</span>
  );
}

function LegendDot({ color, label, hollow = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-sm ${hollow ? 'ring-1 ring-black' : ''}`}
        style={{ backgroundColor: hollow ? 'transparent' : color }}
      />
      <span className="text-xs opacity-70">{label}</span>
    </span>
  );
}
