import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, RefreshCw, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow-up com Cliente A', description: 'Enviar proposta revisada', priority: 'alta', status: 'pendente', dueDate: '2026-01-15', mondaySync: true },
    { id: 2, title: 'Reunião de Discovery - Empresa B', description: 'Entender necessidades do cliente', priority: 'alta', status: 'pendente', dueDate: '2026-01-14', mondaySync: true },
    { id: 3, title: 'Atualizar CRM com novos leads', description: 'Importar lista da conferência', priority: 'média', status: 'em-progresso', dueDate: '2026-01-16', mondaySync: false },
    { id: 4, title: 'Revisar proposta com gerente', description: 'Proposta para Cliente C', priority: 'alta', status: 'pendente', dueDate: '2026-01-15', mondaySync: true },
    { id: 5, title: 'Preparar apresentação de produto', description: 'Demo para próxima semana', priority: 'média', status: 'concluída', dueDate: '2026-01-10', mondaySync: false },
  ]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'média', dueDate: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'concluída' ? 'pendente' : 'concluída';
        return { ...task, status: newStatus };
      }
      return task;
    }));
    toast.success('Status da tarefa atualizado!');
  };

  const syncWithMonday = () => {
    toast.success('Sincronizando com Monday.com...');
    setTimeout(() => {
      toast.success('Tarefas sincronizadas com sucesso!');
    }, 1500);
  };

  const addTask = () => {
    if (!newTask.title) {
      toast.error('Por favor, adicione um título para a tarefa');
      return;
    }
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pendente',
      mondaySync: false
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'média', dueDate: '' });
    setDialogOpen(false);
    toast.success('Tarefa criada com sucesso!');
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return 'destructive';
      case 'média': return 'warning';
      case 'baixa': return 'secondary';
      default: return 'default';
    }
  };

  // Memoize filtered tasks to prevent unnecessary recalculations
  const pendingTasks = useMemo(() => 
    tasks.filter(task => task.status !== 'concluída'), 
    [tasks]
  );

  const completedTasks = useMemo(() => 
    tasks.filter(task => task.status === 'concluída'), 
    [tasks]
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tarefas Diárias</h1>
          <p className="text-muted-foreground mt-2">Gerencie suas tarefas e sincronize com Monday.com</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={syncWithMonday} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar Monday.com
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Tarefa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Digite o título da tarefa"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Descreva a tarefa"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <Button onClick={addTask} className="w-full">Criar Tarefa</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Tasks */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Pendentes ({pendingTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                  <Checkbox
                    checked={false}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      {task.mondaySync && (
                        <Badge variant="outline" className="text-xs">
                          Monday.com
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Concluídas ({completedTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/50">
                  <Checkbox
                    checked={true}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm line-through text-muted-foreground">{task.title}</p>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-through">{task.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
