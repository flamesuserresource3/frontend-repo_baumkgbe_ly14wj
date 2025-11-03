import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardNav from './DashboardNav';
import KpiCard from './KpiCard';
import Counter from './Counter';
import { StackedBarChart, LineChart, PieChart, DonutChart, Heatmap, ProgressBar } from './SimpleCharts';

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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <KpiCard label="Today" value={<Counter to={12} />} delta={8} deltaLabel="vs yesterday" tone="neutral" />
                <KpiCard label="This Week" value={<Counter to={64} />} delta={12} deltaLabel="vs last week" />
                <KpiCard label="Cancellation Rate" value={<span><Counter to={7} />%</span>} delta={-3} deltaLabel="improvement" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Booked / Rescheduled / Cancelled">
                  <StackedBarChart data={[
                    { label: 'Mon', values: [9, 2, 1], colors: ['#111', '#666', '#e11d48'] },
                    { label: 'Tue', values: [11, 1, 1], colors: ['#111', '#666', '#e11d48'] },
                    { label: 'Wed', values: [10, 2, 2], colors: ['#111', '#666', '#e11d48'] },
                    { label: 'Thu', values: [13, 1, 0], colors: ['#111', '#666', '#e11d48'] },
                    { label: 'Fri', values: [12, 2, 1], colors: ['#111', '#666', '#e11d48'] },
                  ]} />
                </Card>
                <Card title="Trend">
                  <LineChart color="#111" data={[{ y: 10 }, { y: 12 }, { y: 11 }, { y: 14 }, { y: 15 }, { y: 13 }, { y: 16 }]} />
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
                        <tr key={p.name} className="border-t border-black/10">
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
