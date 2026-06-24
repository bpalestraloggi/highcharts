import React from 'react';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import PipelineChart from '../components/PipelineChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { DollarSign, Target, Users, TrendingUp, Clock } from 'lucide-react';

// Helper functions to avoid nested ternaries
const getActivityBadgeVariant = (status) => {
  if (status === 'success') return 'default';
  if (status === 'warning') return 'warning';
  return 'secondary';
};

const getActivityBadgeLabel = (status) => {
  if (status === 'success') return 'Concluído';
  if (status === 'warning') return 'Pendente';
  return 'Info';
};

export default function Dashboard() {
  const recentActivities = [
    { id: 1, type: 'Proposta Gerada', description: 'Proposta #1523 criada por Agente SDR', time: '5 min atrás', status: 'success' },
    { id: 2, type: 'Tarefa Concluída', description: 'Follow-up com cliente XYZ', time: '15 min atrás', status: 'info' },
    { id: 3, type: 'Lead Qualificado', description: 'Novo lead qualificado por Agente IA', time: '1h atrás', status: 'success' },
    { id: 4, type: 'Reunião Agendada', description: 'Demonstração agendada para amanhã', time: '2h atrás', status: 'warning' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Vendas</h1>
        <p className="text-muted-foreground mt-2">Bem-vindo de volta! Aqui está o resumo de suas vendas.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Receita Total"
          value="R$ 543.210"
          change="+12.5% vs mês passado"
          icon={DollarSign}
          trend="up"
        />
        <StatsCard
          title="Taxa de Conversão"
          value="32.8%"
          change="+4.3% vs mês passado"
          icon={Target}
          trend="up"
        />
        <StatsCard
          title="Leads Ativos"
          value="145"
          change="+23 novos esta semana"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Ticket Médio"
          value="R$ 12.450"
          change="+8.2% vs mês passado"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <RevenueChart />
        <PipelineChart />
      </div>

      {/* Recent Activities */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{activity.type}</p>
                    <Badge variant={getActivityBadgeVariant(activity.status)}>
                      {getActivityBadgeLabel(activity.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
