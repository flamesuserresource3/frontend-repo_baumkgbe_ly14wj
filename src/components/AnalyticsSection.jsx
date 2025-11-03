import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const GREEN = '#16a34a';
const YELLOW = '#f59e0b';
const RED = '#e11d48';

export default function AnalyticsSection() {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Performance Trends" note="Smaller, balanced proportions">
          <PerformanceLineChart />
        </ChartCard>
        <ChartCard title="Campaign Progress" note="Compact with no overflow">
          <CampaignProgress />
        </ChartCard>
      </div>
    </section>
  );
}

function ChartCard({ title, note, children }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-neutral-900">{title}</h3>
        {note ? <span className="text-xs text-neutral-400">{note}</span> : null}
      </div>
      <div className="h-72">{children}</div>
    </div>
  );
}

function PerformanceLineChart() {
  const data = useMemo(() => [12, 18, 15, 22, 28, 26, 31, 29, 35, 38, 36, 42], []);
  const [hover, setHover] = useState(null);

  const padding = 24;
  const width = 640; // intrinsic SVG width
  const height = 220; // intrinsic SVG height to keep balanced
  const max = Math.max(...data) * 1.1;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((d, i) => [padding + i * stepX, height - padding - (d / max) * (height - padding * 2)]);
  const dPath = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');

  return (
    <div className="w-full h-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.25" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        <g stroke="#e5e7eb">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={padding} x2={width - padding} y1={padding + i * ((height - padding * 2) / 4)} y2={padding + i * ((height - padding * 2) / 4)} strokeWidth="1" />
          ))}
        </g>

        {/* area under line */}
        <motion.path
          d={`${dPath} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill="url(#lineGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* line */}
        <motion.path
          d={dPath}
          fill="none"
          stroke={GREEN}
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />

        {/* points */}
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill={GREEN} onMouseEnter={() => setHover({ x, y, v: data[i] })} onMouseLeave={() => setHover(null)} />
          </g>
        ))}
      </svg>
      {hover && (
        <div className="pointer-events-none absolute" style={{ transform: `translate(${hover.x}px, ${hover.y}px)` }}>
          <div className="-translate-x-1/2 -translate-y-6 rounded-md bg-black text-white text-xs px-2 py-1 shadow">
            {hover.v}
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignProgress() {
  const items = [
    { label: 'Email', value: 78, color: GREEN },
    { label: 'Social', value: 62, color: YELLOW },
    { label: 'Ads', value: 45, color: RED },
  ];

  return (
    <div className="flex flex-col gap-4">
      {items.map((it) => (
        <div key={it.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">{it.label}</span>
            <span className="text-neutral-900 font-medium tabular-nums">{it.value}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden border border-black/5">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: it.color }}
              initial={{ width: 0 }}
              animate={{ width: `${it.value}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-neutral-400">Compact bars with no overflow. Values animate on load.</p>
    </div>
  );
}
