import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Plug, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

// Helper function to handle integration toggle
const handleToggleIntegration = (integrations, setIntegrations, id) => {
  setIntegrations(integrations.map(int => {
    if (int.id === id) {
      const newStatus = !int.connected;
      toast.success(`${int.name} ${newStatus ? 'conectado' : 'desconectado'}!`);
      return { ...int, connected: newStatus };
    }
    return int;
  }));
};

// Helper function to test connection
const handleTestConnection = (name) => {
  toast.info(`Testando conexão com ${name}...`);
  setTimeout(() => {
    toast.success('Conexão estabelecida com sucesso!');
  }, 1500);
};

// Helper function to save Monday config
const handleSaveMonday = (mondayApiKey, setShowMondayConfig, setMondayApiKey) => {
  if (!mondayApiKey) {
    toast.error('Por favor, insira a API key do Monday.com');
    return;
  }
  toast.success('Configuração do Monday.com salva com sucesso!');
  setShowMondayConfig(false);
  setMondayApiKey('');
};

export default function Integrations() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'monday',
      name: 'Monday.com',
      description: 'Sincronize tarefas e projetos automaticamente',
      connected: true,
      logo: '📊',
      config: { apiKey: '****', workspace: 'sales-team' }
    },
    {
      id: 'email',
      name: 'Email (SMTP)',
      description: 'Envie propostas e follow-ups por email',
      connected: true,
      logo: '📧',
      config: { host: 'smtp.gmail.com', port: '587' }
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Agende reuniões automaticamente',
      connected: false,
      logo: '📅',
      config: {}
    },
    {
      id: 'crm',
      name: 'CRM Personalizado',
      description: 'Integre com seu CRM existente',
      connected: false,
      logo: '💼',
      config: {}
    },
  ]);

  const [mondayApiKey, setMondayApiKey] = useState('');
  const [showMondayConfig, setShowMondayConfig] = useState(false);

  const toggleIntegration = (id) => handleToggleIntegration(integrations, setIntegrations, id);
  const testConnection = (name) => handleTestConnection(name);
  const saveMonday = () => handleSaveMonday(mondayApiKey, setShowMondayConfig, setMondayApiKey);
    setIntegrations(integrations.map(int => {
      if (int.id === id) {
        const newStatus = !int.connected;
        toast.success(`${int.name} ${newStatus ? 'conectado' : 'desconectado'}!`);
        return { ...int, connected: newStatus };
      }
      return int;
    }));
  };

  const saveMonday = () => {
    if (!mondayApiKey) {
      toast.error('Por favor, insira a API key do Monday.com');
      return;
    }
    toast.success('Configuração do Monday.com salva com sucesso!');
    setShowMondayConfig(false);
    setMondayApiKey('');
  };

  const testConnection = (name) => {
    toast.info(`Testando conexão com ${name}...`);
    setTimeout(() => {
      toast.success('Conexão estabelecida com sucesso!');
    }, 1500);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
        <p className="text-muted-foreground mt-2">Conecte suas ferramentas e automatize processos</p>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-2xl">
                    {integration.logo}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {integration.name}
                      {integration.connected && (
                        <Badge variant="success" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Conectado
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">{integration.description}</CardDescription>
                  </div>
                </div>
                <Switch
                  checked={integration.connected}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {integration.connected && Object.keys(integration.config).length > 0 && (
                <div className="space-y-3 mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Configuração Atual:</p>
                  {Object.entries(integration.config).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                {integration.id === 'monday' && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowMondayConfig(!showMondayConfig)}
                  >
                    Configurar
                  </Button>
                )}
                {integration.connected && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => testConnection(integration.name)}
                  >
                    Testar Conexão
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              {/* Monday.com Config */}
              {integration.id === 'monday' && showMondayConfig && (
                <div className="mt-4 space-y-4 p-4 border border-border rounded-lg">
                  <div>
                    <Label htmlFor="mondayApiKey">Monday.com API Key</Label>
                    <Input
                      id="mondayApiKey"
                      type="password"
                      value={mondayApiKey}
                      onChange={(e) => setMondayApiKey(e.target.value)}
                      placeholder="Cole sua API key aqui"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Obtenha sua API key em Monday.com → Admin → API
                    </p>
                  </div>
                  <Button onClick={saveMonday} className="w-full">
                    Salvar Configuração
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plug className="h-5 w-5" />
            Precisa de uma integração personalizada?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Entre em contato com nosso suporte para configurar integrações customizadas com suas ferramentas.
          </p>
          <Button variant="outline">Falar com Suporte</Button>
        </CardContent>
      </Card>
    </div>
  );
}
