import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Clock, Shield, Loader2 } from 'lucide-react';
import { useGovernanceData, useUserProfile } from '@/integrations/supabase/hooks';

const complianceItems = [
  { framework: 'GRI Standards', status: 'compliant', coverage: 94 },
  { framework: 'TCFD Recommendations', status: 'compliant', coverage: 88 },
  { framework: 'SASB Transportation', status: 'in-progress', coverage: 72 },
  { framework: 'UK Modern Slavery Act', status: 'compliant', coverage: 100 },
  { framework: 'CSRD (EU)', status: 'in-progress', coverage: 65 },
  { framework: 'SEC Climate Rules', status: 'pending', coverage: 45 },
];

const auditLog = [
  { action: 'Emissions data updated', user: 'J. Smith', time: '2 hours ago', type: 'data' },
  { action: 'Supplier audit completed', user: 'M. Johnson', time: '5 hours ago', type: 'audit' },
  { action: 'Policy document approved', user: 'S. Williams', time: '1 day ago', type: 'policy' },
  { action: 'Risk assessment filed', user: 'A. Brown', time: '2 days ago', type: 'risk' },
  { action: 'Board ESG review', user: 'C. Davis', time: '3 days ago', type: 'governance' },
];

const boardMetrics = [
  { label: 'ESG Committee Meetings', value: '12/yr' },
  { label: 'Board ESG Oversight', value: 'Yes' },
  { label: 'ESG-Linked Compensation', value: '25%' },
  { label: 'Anti-Corruption Training', value: '100%' },
];

const GovernanceMetrics = () => {
  const { data: profile } = useUserProfile();
  const { data: govData, isLoading } = useGovernanceData(profile?.id);
  const latestData = govData?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="default">Compliant</Badge>;
      case 'in-progress':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-xl font-bold">Governance (G)</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Framework Compliance</CardTitle>
            <CardDescription>Regulatory & reporting framework status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item) => (
                <div key={item.framework} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.framework}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{item.coverage}%</span>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  <Progress value={item.coverage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Board & Ethics</CardTitle>
            <CardDescription>Governance oversight metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {boardMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <span className="font-mono text-sm font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Audit Trail
            </CardTitle>
            <CardDescription>Recent governance & compliance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLog.map((log, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">by {log.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernanceMetrics;
