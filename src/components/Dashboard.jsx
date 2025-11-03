import React from 'react';
import DashboardHeader from './DashboardHeader';

const StatCard = ({ label, value, trend }) => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
    <div className="text-sm text-neutral-500">{label}</div>
    <div className="mt-1 text-2xl font-semibold text-neutral-900">{value}</div>
    {trend && <div className="mt-2 text-xs text-emerald-600">{trend}</div>}
  </div>
);

const Dashboard = ({ onExit }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader onExit={onExit} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <h2 className="text-lg font-semibold text-neutral-900">Appointments</h2>
          <p className="text-sm text-neutral-500">Quick snapshot of this week</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Booked" value="128" trend="+8.2% WoW" />
            <StatCard label="Rescheduled" value="23" trend="-2.1% WoW" />
            <StatCard label="Cancelled" value="9" trend="-0.7% WoW" />
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-medium text-neutral-900">Weekly Overview</h3>
            <p className="mt-1 text-sm text-neutral-500">Premium-styled exit button lives in the header. Content remains unchanged.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-40 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200" />
              <div className="h-40 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
