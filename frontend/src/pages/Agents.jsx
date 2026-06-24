import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Bot, Zap, FileText, Users, Play, Pause, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function Agents() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Agente SDR',
      type: 'sdr',
      description: 'Qualifica leads automaticamente e agenda reuniões',
      status: 'ativo',
      tasks: 45,
      successRate: 78,
      lastRun: '2 horas atrás'
    },
    {
      id: 2,
      name: 'Gerador de Propostas',
      type: 'proposta',
      description: 'Cria propostas comerciais personalizadas',
      status: 'ativo',
      tasks: 23,
      successRate: 92,
      lastRun: '30 min atrás'
    },
    {
      id: 3,
      name: 'Assistente de Follow-up',
      type: 'followup',
      description: 'Gerencia follow-ups e mantém leads engajados',
      status: 'pausado',
      tasks: 67,
      successRate: 85,
      lastRun: '1 dia atrás'
    },
    {
      id: 4,
      name: 'Analisador de Leads',
      type: 'analise',
      description: 'Analisa e pontua leads baseado em critérios',
      status: 'ativo',
      tasks: 156,
      successRate: 88,
      lastRun: '5 min atrás'
    },
  ]);

  const toggleAgentStatus = (agentId) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        const newStatus = agent.status === 'ativo' ? 'pausado' : 'ativo';
        toast.success(`Agente ${newStatus === 'ativo' ? 'ativado' : 'pausado'} com sucesso!`);
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const runAgent = (agentName) => {
    toast.success(`${agentName} iniciado com sucesso!`);
  };

  const recentActions = [
    { id: 1, agent: 'Agente SDR', action: 'Qualificou lead: Empresa Tech Solutions', time: '5 min', status: 'success' },
    { id: 2, agent: 'Gerador de Propostas', action: 'Criou proposta #1524 para Cliente ABC', time: '12 min', status: 'success' },
    { id: 3, agent: 'Analisador de Leads', action: 'Pontuou 15 novos leads', time: '18 min', status: 'success' },
    { id: 4, agent: 'Assistente de Follow-up', action: 'Enviou 8 e-mails de follow-up', time: '25 min', status: 'info' },
    { id: 5, agent: 'Agente SDR', action: 'Agendou reunião para 15/01', time: '32 min', status: 'success' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Agentes de IA</h1>
        <p className="text-muted-foreground mt-2">Automatize processos de vendas com agentes inteligentes</p>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents">Meus Agentes</TabsTrigger>
          <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          {/* Agents Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {agents.map((agent) => (
              <Card key={agent.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription className="mt-1">{agent.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={agent.status === 'ativo' ? 'default' : 'secondary'}>
                      {agent.status === 'ativo' ? 'Ativo' : 'Pausado'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Tarefas Executadas</p>
                        <p className="text-2xl font-bold mt-1">{agent.tasks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                        <p className="text-2xl font-bold mt-1">{agent.successRate}%</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Performance</span>
                        <span className="text-sm font-medium">{agent.successRate}%</span>
                      </div>
                      <Progress value={agent.successRate} className="h-2" />
                    </div>

                    {/* Last run */}
                    <p className="text-xs text-muted-foreground">Última execução: {agent.lastRun}</p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => toggleAgentStatus(agent.id)}
                      >
                        {agent.status === 'ativo' ? (
                          <><Pause className="h-4 w-4 mr-2" /> Pausar</>
                        ) : (
                          <><Play className="h-4 w-4 mr-2" /> Ativar</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => runAgent(agent.name)}
                      >
                        <Zap className="h-4 w-4 mr-2" /> Executar
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Atividades Recentes dos Agentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{action.agent}</p>
                        <Badge variant={action.status === 'success' ? 'default' : 'secondary'} className="text-xs">
                          {action.status === 'success' ? 'Sucesso' : 'Info'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{action.action}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">há {action.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
