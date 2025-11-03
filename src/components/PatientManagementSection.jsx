export default function PatientManagementSection() {
  const patients = [
    { name: 'Sophia Turner', plan: 'Cleaning', date: 'Tue, 10:00 AM' },
    { name: 'Daniel Rivera', plan: 'Whitening', date: 'Wed, 1:30 PM' },
    { name: 'Ava Patel', plan: 'Checkup', date: 'Fri, 11:15 AM' },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">Patient Management</h2>
      <div className="rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="p-4 border-b border-black/10">
          <h3 className="font-medium text-neutral-900">Upcoming Appointments</h3>
        </div>
        <ul className="divide-y divide-black/5">
          {patients.map((p) => (
            <li key={p.name} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-neutral-500">{p.plan}</p>
              </div>
              <div className="text-sm text-neutral-700">{p.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
