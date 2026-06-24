import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { FileText, Download, Eye, Plus, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function Proposals() {
  const [proposals, setProposals] = useState([
    {
      id: 1523,
      client: 'Tech Solutions Ltda',
      value: 85000,
      status: 'enviada',
      createdBy: 'Agente SDR',
      date: '2026-01-12',
      validUntil: '2026-01-26'
    },
    {
      id: 1524,
      client: 'Empresa ABC S/A',
      value: 120000,
      status: 'aprovada',
      createdBy: 'Agente SDR',
      date: '2026-01-10',
      validUntil: '2026-01-24'
    },
    {
      id: 1522,
      client: 'StartUp XYZ',
      value: 45000,
      status: 'rascunho',
      createdBy: 'Manual',
      date: '2026-01-11',
      validUntil: '2026-01-25'
    },
    {
      id: 1521,
      client: 'Corporação Delta',
      value: 250000,
      status: 'negociacao',
      createdBy: 'Agente SDR',
      date: '2026-01-08',
      validUntil: '2026-01-22'
    },
    {
      id: 1520,
      client: 'Indústria Gamma',
      value: 180000,
      status: 'enviada',
      createdBy: 'Agente SDR',
      date: '2026-01-09',
      validUntil: '2026-01-23'
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'rascunho': 'secondary',
      'enviada': 'default',
      'negociacao': 'warning',
      'aprovada': 'success',
      'rejeitada': 'destructive'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'rascunho': 'Rascunho',
      'enviada': 'Enviada',
      'negociacao': 'Em Negociação',
      'aprovada': 'Aprovada',
      'rejeitada': 'Rejeitada'
    };
    return labels[status] || status;
  };

  const generateProposal = () => {
    toast.success('Gerando proposta com Agente IA...');
    setTimeout(() => {
      const newProposal = {
        id: 1525,
        client: 'Novo Cliente',
        value: 95000,
        status: 'rascunho',
        createdBy: 'Agente SDR',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      setProposals([newProposal, ...proposals]);
      toast.success('Proposta #1525 gerada com sucesso!');
    }, 2000);
  };

  const viewProposal = (id) => {
    toast.info(`Abrindo proposta #${id}...`);
  };

  const downloadProposal = (id) => {
    toast.success(`Baixando proposta #${id}...`);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propostas Comerciais</h1>
          <p className="text-muted-foreground mt-2">Gerencie propostas criadas pelos agentes de IA</p>
        </div>
        <Button onClick={generateProposal}>
          <Plus className="h-4 w-4 mr-2" />
          Gerar com IA
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{proposals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--success))]" />
              <div>
                <p className="text-sm text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'aprovada').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--warning))]" />
              <div>
                <p className="text-sm text-muted-foreground">Em Negociação</p>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'negociacao').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">R$ {(proposals.reduce((acc, p) => acc + p.value, 0) / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposals Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Todas as Propostas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">Proposta #{proposal.id}</p>
                    <Badge variant={getStatusColor(proposal.status)}>
                      {getStatusLabel(proposal.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{proposal.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">R$ {proposal.value.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-muted-foreground">Criada por {proposal.createdBy}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{new Date(proposal.date).toLocaleDateString('pt-BR')}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Válida até {new Date(proposal.validUntil).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => viewProposal(proposal.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadProposal(proposal.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
