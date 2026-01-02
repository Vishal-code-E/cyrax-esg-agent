import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, Shield, TrendingDown, TrendingUp } from 'lucide-react';

const summaryCards = [
  {
    title: 'Environment Score',
    value: '78',
    suffix: '/100',
    change: '+5%',
    trend: 'up',
    icon: Leaf,
    color: 'text-primary',
  },
  {
    title: 'Social Score',
    value: '82',
    suffix: '/100',
    change: '+3%',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
  },
  {
    title: 'Governance Score',
    value: '91',
    suffix: '/100',
    change: '+2%',
    trend: 'up',
    icon: Shield,
    color: 'text-primary',
  },
  {
    title: 'Carbon Emissions',
    value: '12.4k',
    suffix: ' tCO2e',
    change: '-12%',
    trend: 'down',
    icon: TrendingDown,
    color: 'text-primary',
  },
];

const DashboardSummary = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {card.title}
              </span>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{card.value}</span>
              <span className="text-sm text-muted-foreground">{card.suffix}</span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {card.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-primary" />
              )}
              <span className="text-sm text-primary">{card.change}</span>
              <span className="text-sm text-muted-foreground">vs last quarter</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;
