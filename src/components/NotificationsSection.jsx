export default function NotificationsSection() {
  const items = [
    { title: 'New lead assigned', time: '2m ago' },
    { title: 'Appointment rescheduled', time: '1h ago' },
    { title: 'Payment received', time: 'Yesterday' },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">Notifications</h2>
      <div className="rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="p-4 border-b border-black/10">
          <h3 className="font-medium text-neutral-900">Recent</h3>
        </div>
        <ul className="divide-y divide-black/5">
          {items.map((n, idx) => (
            <li key={`${n.title}-${idx}`} className="px-4 py-3 flex items-center justify-between">
              <span className="text-neutral-800">{n.title}</span>
              <span className="text-xs text-neutral-500">{n.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
