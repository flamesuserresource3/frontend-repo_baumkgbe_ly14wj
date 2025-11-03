export default function LeadsSection() {
  const leads = [
    { name: 'John Carter', source: 'Website', status: 'New' },
    { name: 'Emily Smith', source: 'Referral', status: 'Contacted' },
    { name: 'Michael Lee', source: 'Ads', status: 'Qualified' },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">Leads</h2>
      <div className="rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="p-4 border-b border-black/10">
          <h3 className="font-medium text-neutral-900">Recent Leads</h3>
        </div>
        <div className="divide-y divide-black/5">
          {leads.map((l) => (
            <div key={l.name} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{l.name}</p>
                <p className="text-xs text-neutral-500">Source: {l.source}</p>
              </div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const styles = {
    New: 'bg-neutral-100 text-neutral-700',
    Contacted: 'bg-yellow-50 text-yellow-700',
    Qualified: 'bg-green-50 text-green-700',
  };
  return <span className={`text-xs px-2 py-1 rounded-md border border-black/5 ${styles[status] || 'bg-neutral-100'}`}>{status}</span>;
}
