import DashboardHeader from './components/DashboardHeader.jsx';
import AnalyticsSection from './components/AnalyticsSection.jsx';
import CallsFollowupsSection from './components/CallsFollowupsSection.jsx';
import AppointmentsSection from './components/AppointmentsSection.jsx';
import LeadsSection from './components/LeadsSection.jsx';
import PatientManagementSection from './components/PatientManagementSection.jsx';
import NotificationsSection from './components/NotificationsSection.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <DashboardHeader />
        <AnalyticsSection />
        <CallsFollowupsSection />
        <AppointmentsSection />
        <LeadsSection />
        <PatientManagementSection />
        <NotificationsSection />
      </main>
    </div>
  );
}
