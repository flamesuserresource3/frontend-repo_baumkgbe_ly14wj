import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const GREEN = '#16a34a';
const YELLOW = '#f59e0b';
const RED = '#e11d48';

export default function AppointmentsSection() {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">Appointments</h2>
      <ChartCard title="Bookings • Reschedules • Cancellations" note="Proportional, readable layout">
        <BookingsGroupedBar />
      </ChartCard>
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
      <div className="h-80">{children}</div>
    </div>
  );
}

function BookingsGroupedBar() {
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const data = useMemo(
    () => ({
      booked: [32, 40, 38, 44],
      rescheduled: [8, 10, 7, 9],
      cancelled: [3, 5, 4, 6],
    }),
    []
  );

  const [hover, setHover] = useState(null);

  const padding = { top: 24, right: 24, bottom: 40, left: 40 };
  const width = 760;
  const height = 260;
  const max = Math.max(...data.booked, ...data.rescheduled, ...data.cancelled) * 1.3;
  const groupWidth = (width - padding.left - padding.right) / labels.length;
  const barWidth = Math.min(18, groupWidth / 4);

  const yScale = (v) => height - padding.bottom - (v / max) * (height - padding.top - padding.bottom);

  const linePoints = labels.map((_, i) => {
    const avg = data.booked[i] - data.cancelled[i];
    const x = padding.left + groupWidth * i + groupWidth / 2;
    const y = yScale(avg);
    return [x, y];
  });

  const dPath = linePoints.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');

  return (
    <div className="w-full h-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* axes */}
        <g stroke="#e5e7eb">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={padding.left} x2={width - padding.right} y1={padding.top + i * ((height - padding.top - padding.bottom) / 4)} y2={padding.top + i * ((height - padding.top - padding.bottom) / 4)} strokeWidth="1" />
          ))}
        </g>

        {/* groups */}
        {labels.map((label, i) => {
          const gx = padding.left + i * groupWidth + groupWidth / 2 - (barWidth * 1.5);
          const bars = [
            { key: 'Booked', value: data.booked[i], color: GREEN, x: gx },
            { key: 'Rescheduled', value: data.rescheduled[i], color: YELLOW, x: gx + barWidth + 8 },
            { key: 'Cancelled', value: data.cancelled[i], color: RED, x: gx + 2 * (barWidth + 8) },
          ];
          return (
            <g key={label}>
              {/* label */}
              <text x={padding.left + i * groupWidth + groupWidth / 2} y={height - 12} textAnchor="middle" fontSize="10" fill="#6b7280">{label}</text>
              {bars.map((b, bi) => {
                const y = yScale(b.value);
                const h = height - padding.bottom - y;
                return (
                  <motion.rect
                    key={`${label}-${b.key}`}
                    x={b.x}
                    y={y}
                    width={barWidth}
                    height={h}
                    rx="4"
                    fill={b.color}
                    initial={{ height: 0, y: height - padding.bottom }}
                    animate={{ height: h, y }}
                    transition={{ duration: 0.6, delay: bi * 0.05 + i * 0.05 }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHover({ x: rect.x + rect.width / 2, y: rect.y, label, key: b.key, value: b.value });
                    }}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* trend line */}
        <motion.path d={dPath} fill="none" stroke="#111827" strokeOpacity="0.6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        {linePoints.map(([x, y], idx) => (
          <circle key={idx} cx={x} cy={y} r={3} fill="#111827" fillOpacity="0.6" />
        ))}

        {/* legend */}
        <g transform={`translate(${width - padding.right - 230}, ${padding.top})`}>
          {[
            { name: 'Booked', color: GREEN },
            { name: 'Rescheduled', color: YELLOW },
            { name: 'Cancelled', color: RED },
          ].map((l, i) => (
            <g key={l.name} transform={`translate(0, ${i * 18})`}>
              <rect width="10" height="10" rx="2" fill={l.color} />
              <text x="16" y="9" fontSize="10" fill="#374151">{l.name}</text>
            </g>
          ))}
        </g>
      </svg>

      {hover && (
        <div className="pointer-events-none fixed z-50" style={{ left: hover.x, top: hover.y - 8 }}>
          <div className="-translate-x-1/2 -translate-y-full rounded-md bg-black text-white text-xs px-2 py-1 shadow">
            {hover.label} • {hover.key}: {hover.value}
          </div>
        </div>
      )}
    </div>
  );
}
