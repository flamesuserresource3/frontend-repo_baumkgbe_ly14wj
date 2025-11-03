import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function StackedBarChart({ data = [], height = 140 }) {
  // data: [{ label, values: [a,b,c], colors: ['#','##','###'] }]
  const max = useMemo(() => Math.max(1, ...data.map(d => d.values.reduce((s, v) => s + v, 0))), [data]);
  const barW = 100 / data.length;
  return (
    <div className="w-full">
      <svg viewBox={`0 0 100 ${height}`} className="w-full" role="img" aria-label="Stacked bar chart">
        {data.map((d, i) => {
          let y = height;
          return (
            <g key={i}>
              {d.values.map((v, j) => {
                const h = (v / max) * (height - 24);
                y -= h;
                return (
                  <motion.rect
                    key={j}
                    x={i * barW + 5}
                    width={barW - 10}
                    y={y}
                    height={h}
                    rx={2}
                    fill={d.colors?.[j] || '#000'}
                    initial={{ height: 0, y: height - 24 }}
                    animate={{ height: h, y }}
                    transition={{ duration: 0.6, delay: i * 0.05 + j * 0.02 }}
                  />
                );
              })}
              <text x={i * barW + barW / 2} y={height - 6} fontSize="3" textAnchor="middle" fill="#111">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function LineChart({ data = [], height = 140, color = '#111' }) {
  const max = Math.max(1, ...data.map(d => d.y));
  const min = Math.min(0, ...data.map(d => d.y));
  const span = max - min || 1;
  const stepX = 100 / Math.max(1, data.length - 1);
  const path = data.map((d, i) => {
    const x = i * stepX;
    const y = (1 - (d.y - min) / span) * (height - 24);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" role="img" aria-label="Line chart">
      <motion.path d={path} fill="none" stroke={color} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
      {data.map((d, i) => {
        const x = i * stepX;
        const y = (1 - (d.y - min) / span) * (height - 24);
        return <circle key={i} cx={x} cy={y} r="1.3" fill={color} />
      })}
    </svg>
  );
}

export function PieChart({ values = [], colors = [] }) {
  const total = Math.max(1, values.reduce((s, v) => s + v, 0));
  let acc = 0;
  return (
    <svg viewBox="0 0 42 42" className="w-32 h-32" role="img" aria-label="Pie chart">
      {values.map((v, i) => {
        const angle = (v / total) * Math.PI * 2;
        const start = { x: 21 + 20 * Math.cos(acc), y: 21 + 20 * Math.sin(acc) };
        acc += angle;
        const end = { x: 21 + 20 * Math.cos(acc), y: 21 + 20 * Math.sin(acc) };
        const large = angle > Math.PI ? 1 : 0;
        const d = `M 21 21 L ${start.x} ${start.y} A 20 20 0 ${large} 1 ${end.x} ${end.y} Z`;
        return <motion.path key={i} d={d} fill={colors[i] || '#111'} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08 }} />
      })}
    </svg>
  );
}

export function DonutChart({ values = [], colors = [] }) {
  const total = Math.max(1, values.reduce((s, v) => s + v, 0));
  let acc = 0;
  return (
    <svg viewBox="0 0 42 42" className="w-32 h-32" role="img" aria-label="Donut chart">
      <circle cx="21" cy="21" r="14" fill="white" />
      {values.map((v, i) => {
        const angle = (v / total) * Math.PI * 2;
        const start = { x: 21 + 16 * Math.cos(acc), y: 21 + 16 * Math.sin(acc) };
        acc += angle;
        const end = { x: 21 + 16 * Math.cos(acc), y: 21 + 16 * Math.sin(acc) };
        const large = angle > Math.PI ? 1 : 0;
        const d = `M 21 21 L ${start.x} ${start.y} A 16 16 0 ${large} 1 ${end.x} ${end.y} Z`;
        return <motion.path key={i} d={d} fill={colors[i] || '#111'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} />
      })}
      <circle cx="21" cy="21" r="8" fill="white" />
    </svg>
  );
}

export function Heatmap({ matrix = [[]] }) {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  const flat = matrix.flat();
  const max = Math.max(1, ...flat);
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {matrix.map((r, i) => r.map((v, j) => (
        <motion.div key={`${i}-${j}`} className="aspect-square rounded-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (i * cols + j) * 0.02 }} style={{ backgroundColor: `rgba(0,0,0,${v / max * 0.8 + 0.1})` }} />
      )))}
    </div>
  );
}

export function ProgressBar({ value = 0, color = '#111' }) {
  return (
    <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
      <motion.div className="h-full" style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }} />
    </div>
  );
}

// New: Grouped Bar with Line overlay and interactive tooltips for Appointments
export function GroupedBarWithLine({
  data = [], // [{ label: 'Mon', booked: 10, rescheduled: 2, cancelled: 1, trend: 11 }]
  height = 160,
  colors = { booked: '#16a34a', rescheduled: '#f59e0b', cancelled: '#e11d48', line: '#111' },
}) {
  const containerRef = useRef(null);
  const [tip, setTip] = useState(null);

  const maxBar = useMemo(
    () => Math.max(1, ...data.map(d => d.booked + d.rescheduled + d.cancelled, 0)),
    [data]
  );
  const maxLine = useMemo(() => Math.max(1, ...data.map(d => d.trend || 0)), [data]);
  const max = Math.max(maxBar, maxLine);
  const groups = data.length;
  const groupW = 100 / groups;
  const innerPad = 3; // svg units
  const barWidth = (groupW - innerPad * 2) / 3;

  const handleEnter = (evt, payload) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
      ...payload,
    });
  };

  const handleLeave = () => setTip(null);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <svg viewBox={`0 0 100 ${height}`} className="w-full" role="img" aria-label="Appointments chart">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((g, i) => (
          <line key={i} x1={0} x2={100} y1={(height - 24) * g} y2={(height - 24) * g} stroke="#e5e7eb" strokeWidth="0.3" />
        ))}

        {data.map((d, i) => {
          const baseY = height - 24;
          const vals = [
            { key: 'booked', v: d.booked, c: colors.booked, label: 'Booked' },
            { key: 'rescheduled', v: d.rescheduled, c: colors.rescheduled, label: 'Rescheduled' },
            { key: 'cancelled', v: d.cancelled, c: colors.cancelled, label: 'Cancelled' },
          ];
          return (
            <g key={d.label}>
              {vals.map((b, j) => {
                const h = (b.v / max) * baseY;
                const x = i * groupW + innerPad + j * barWidth;
                const y = baseY - h;
                return (
                  <motion.rect
                    key={b.key}
                    x={x}
                    y={y}
                    width={barWidth - 1}
                    height={h}
                    rx={2}
                    fill={b.c}
                    initial={{ height: 0, y: baseY }}
                    animate={{ height: h, y }}
                    transition={{ duration: 0.6, delay: i * 0.05 + j * 0.03 }}
                    onMouseMove={(e) => handleEnter(e, { title: `${d.label} • ${b.label}`, value: b.v, color: b.c })}
                    onMouseLeave={handleLeave}
                    style={{ cursor: 'pointer' }}
                  />
                );
              })}
              {/* label */}
              <text x={i * groupW + groupW / 2} y={height - 6} fontSize="3" textAnchor="middle" fill="#111">{d.label}</text>
            </g>
          );
        })}

        {/* Line overlay for trend */}
        {(() => {
          const points = data.map((d, i) => {
            const x = i * groupW + groupW / 2;
            const y = (1 - (d.trend || 0) / max) * (height - 24);
            return { x, y };
          });
          const dAttr = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
          return (
            <g>
              <motion.path d={dAttr} fill="none" stroke={colors.line} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="1.4" fill={colors.line}
                  onMouseMove={(e) => handleEnter(e, { title: `${data[i].label} • Trend`, value: data[i].trend, color: colors.line })}
                  onMouseLeave={handleLeave}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </g>
          );
        })()}
      </svg>

      {/* Tooltip */}
      {tip && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-3 rounded-md border border-black/10 bg-white px-2 py-1 text-xs shadow-sm"
          style={{ left: tip.x, top: tip.y }}
          role="tooltip"
        >
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: tip.color }} />
            <span className="font-medium">{tip.title}</span>
            <span className="opacity-70">· {tip.value}</span>
          </div>
        </div>
      )}
    </div>
  );
}
