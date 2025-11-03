const GREEN = '#16a34a';
const YELLOW = '#f59e0b';
const RED = '#e11d48';

export default function CallsFollowupsSection() {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">Calls • Follow-ups</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Resolution Mix">
          <ResolutionDonut />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Follow-up Heatmap">
            <FollowupHeatmap />
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-neutral-900">{title}</h3>
      </div>
      <div className="h-72 relative">{children}</div>
    </div>
  );
}

function ResolutionDonut() {
  const data = [
    { label: 'Resolved', value: 62, color: GREEN },
    { label: 'Pending', value: 28, color: YELLOW },
    { label: 'Escalated', value: 10, color: RED },
  ];

  const size = 240;
  const thickness = 26;
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="w-full h-full grid place-items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="none" stroke="#f3f4f6" strokeWidth={thickness} />
          {data.map((s) => {
            const dash = (s.value / 100) * circumference;
            const gap = circumference - dash;
            const rotation = (cumulative / 100) * 360 - 90;
            cumulative += s.value;
            return (
              <circle
                key={s.label}
                r={radius}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${gap}`}
                transform={`rotate(${rotation})`}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-xs">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-neutral-600">{d.label}</span>
            <span className="text-neutral-900 tabular-nums ml-auto">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FollowupHeatmap() {
  const matrix = [
    [1, 3, 2, 0, 1],
    [2, 4, 3, 1, 2],
    [0, 1, 2, 3, 2],
    [1, 2, 4, 3, 1],
    [2, 3, 1, 0, 1],
    [3, 4, 2, 1, 2],
    [1, 2, 3, 2, 0],
  ];

  const scale = (v) => {
    const colors = ['#ecfdf5', '#a7f3d0', '#fde68a', '#fdba74', '#fecaca'];
    return colors[Math.max(0, Math.min(4, v))];
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = ['9a', '12p', '3p', '6p', '9p'];

  const cellSize = 28;
  const gap = 6;

  return (
    <div className="w-full h-full relative">
      <div className="absolute left-0 top-0 text-xs text-neutral-400">Higher intensity = more follow-ups</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="overflow-auto p-4">
          <div className="grid" style={{ gridTemplateColumns: `80px repeat(${slots.length}, ${cellSize}px)`, gap }}>
            <div />
            {slots.map((s) => (
              <div key={s} className="text-xs text-neutral-500 text-center">{s}</div>
            ))}
            {matrix.map((row, i) => (
              <>
                <div key={`d-${i}`} className="text-xs text-neutral-500 leading-[28px] h-[28px] flex items-center">{days[i]}</div>
                {row.map((v, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="rounded-md border border-black/5"
                    style={{ width: cellSize, height: cellSize, backgroundColor: scale(v) }}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
