import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useEnvironmentalData, useUserProfile } from '@/integrations/supabase/hooks';
import { Loader2 } from 'lucide-react';

const emissionsData = [
  { month: 'Jan', scope1: 2400, scope2: 1800, scope3: 4200 },
  { month: 'Feb', scope1: 2200, scope2: 1700, scope3: 4000 },
  { month: 'Mar', scope1: 2100, scope2: 1650, scope3: 3800 },
  { month: 'Apr', scope1: 2000, scope2: 1600, scope3: 3600 },
  { month: 'May', scope1: 1900, scope2: 1550, scope3: 3400 },
  { month: 'Jun', scope1: 1850, scope2: 1500, scope3: 3200 },
];

const fleetData = [
  { type: 'Electric', count: 145 },
  { type: 'Hybrid', count: 89 },
  { type: 'Diesel', count: 234 },
  { type: 'Petrol', count: 67 },
];

const energyData = [
  { name: 'Renewable', value: 42, color: 'hsl(var(--primary))' },
  { name: 'Grid', value: 58, color: 'hsl(var(--muted))' },
];

const EnvironmentMetrics = () => {
  const { data: profile } = useUserProfile();
  const { data: envData, isLoading } = useEnvironmentalData(profile?.id);
  const latestData = envData?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-xl font-bold">Environment (E)</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Carbon Emissions by Scope</CardTitle>
            <CardDescription>Monthly emissions in tCO2e</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emissionsData}>
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
                  <Area 
                    type="monotone" 
                    dataKey="scope3" 
                    stackId="1" 
                    stroke="hsl(var(--muted))" 
                    fill="hsl(var(--muted))" 
                    name="Scope 3"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="scope2" 
                    stackId="1" 
                    stroke="hsl(var(--primary) / 0.7)" 
                    fill="hsl(var(--primary) / 0.5)" 
                    name="Scope 2"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="scope1" 
                    stackId="1" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    name="Scope 1"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Energy Mix</CardTitle>
            <CardDescription>Renewable vs grid power</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {energyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-primary" />
                <span>Renewable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-muted" />
                <span>Grid</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Fleet Composition</CardTitle>
            <CardDescription>Vehicle types in logistics fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fleetData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="type" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnvironmentMetrics;
