import { useEffect, useState } from 'react';

export default function Counter({ from = 0, to = 0, duration = 1200, format = (v) => v.toLocaleString() }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (to - from) * eased;
      setValue(current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration]);

  return <span>{format(Math.round(value))}</span>;
}
