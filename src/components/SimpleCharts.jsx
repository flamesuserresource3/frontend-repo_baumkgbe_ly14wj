import { useMemo } from 'react';
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
