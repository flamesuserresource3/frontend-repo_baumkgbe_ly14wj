import { motion } from 'framer-motion';

export default function KpiCard({ label, value, delta = 0, deltaLabel, tone = 'neutral' }) {
  const toneClasses = {
    success: 'text-green-600 bg-green-50 border-green-100',
    warning: 'text-yellow-700 bg-yellow-50 border-yellow-100',
    danger: 'text-red-600 bg-red-50 border-red-100',
    neutral: 'text-black bg-white border-black/10'
  };

  const deltaColor = delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-600' : 'text-gray-600';
  const sign = delta > 0 ? '+' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow ${toneClasses[tone]}`}
    >
      <div className="text-sm opacity-70 mb-2">{label}</div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      {deltaLabel !== undefined && (
        <div className={`mt-2 text-sm ${deltaColor}`}>{sign}{delta}% {deltaLabel}</div>
      )}
    </motion.div>
  );
}
