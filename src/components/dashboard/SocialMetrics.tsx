import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';

const safetyData = [
  { month: 'Jan', incidents: 4, nearMisses: 12 },
  { month: 'Feb', incidents: 3, nearMisses: 10 },
  { month: 'Mar', incidents: 2, nearMisses: 8 },
  { month: 'Apr', incidents: 2, nearMisses: 7 },
  { month: 'May', incidents: 1, nearMisses: 5 },
  { month: 'Jun', incidents: 1, nearMisses: 4 },
];

const trainingData = [
  { month: 'Jan', hours: 2400 },
  { month: 'Feb', hours: 2800 },
  { month: 'Mar', hours: 3200 },
  { month: 'Apr', hours: 3600 },
  { month: 'May', hours: 4100 },
  { month: 'Jun', hours: 4800 },
];

const laborMetrics = [
  { label: 'Total Workforce', value: '2,847', status: 'neutral' },
  { label: 'Living Wage Compliance', value: '98.2%', status: 'good' },
  { label: 'Supplier Labor Audits', value: '156', status: 'neutral' },
  { label: 'Grievances Resolved', value: '94%', status: 'good' },
  { label: 'Child Labor Risk', value: 'Low', status: 'good' },
  { label: 'Forced Labor Risk', value: 'Low', status: 'good' },
];

const SocialMetrics = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-xl font-bold">Social (S)</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Health & Safety</CardTitle>
            <CardDescription>Incidents & near misses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={safetyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="incidents" fill="hsl(var(--destructive))" name="Incidents" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nearMisses" fill="hsl(var(--muted))" name="Near Misses" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Training Hours</CardTitle>
            <CardDescription>Cumulative hours YTD</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Labor & Human Rights</CardTitle>
            <CardDescription>Key compliance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {laborMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <Badge 
                    variant={metric.status === 'good' ? 'default' : 'secondary'}
                    className="font-mono"
                  >
                    {metric.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMetrics;
