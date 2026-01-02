import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EnvironmentMetrics from '@/components/dashboard/EnvironmentMetrics';
import SocialMetrics from '@/components/dashboard/SocialMetrics';
import GovernanceMetrics from '@/components/dashboard/GovernanceMetrics';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import ReportGenerator from '@/components/dashboard/ReportGenerator';

const Dashboard = () => {
  const { user, role } = useAuth();

  const roleLabels: Record<string, string> = {
    esg_manager: 'ESG Manager',
    auditor: 'Auditor',
    supplier: 'Supplier',
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">ESG Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.email} • {role ? roleLabels[role] : 'User'}
          </p>
        </div>

        <DashboardSummary />

        <div className="mt-8">
          <ReportGenerator />
        </div>

        <div className="grid gap-8 mt-8">
          <EnvironmentMetrics />
          <SocialMetrics />
          <GovernanceMetrics />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
