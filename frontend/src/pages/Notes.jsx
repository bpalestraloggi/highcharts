import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Plus, Trash2, Edit, StickyNote } from 'lucide-react';
import { toast } from 'sonner';

export default function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Reunião Cliente XYZ', content: 'Discussão sobre integração API. Cliente interessado em plano enterprise.', category: 'Reunião', date: '2026-01-10' },
    { id: 2, title: 'Ideias para nova proposta', content: 'Incluir módulo de analytics avançado. Propor desconto de 15% para contrato anual.', category: 'Proposta', date: '2026-01-11' },
    { id: 3, title: 'Follow-up necessário', content: 'Cliente ABC aguardando retorno sobre customização. Ligar segunda-feira.', category: 'Follow-up', date: '2026-01-12' },
    { id: 4, title: 'Feedback da demo', content: 'Cliente gostou da interface mas pediu mais opções de relatório.', category: 'Feedback', date: '2026-01-13' },
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'Geral' });
  const [editingNote, setEditingNote] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      toast.error('Por favor, preencha título e conteúdo');
      return;
    }
    const note = {
      id: notes.length + 1,
      ...newNote,
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', category: 'Geral' });
    setDialogOpen(false);
    toast.success('Anotação criada com sucesso!');
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    toast.success('Anotação removida!');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Reunião': 'default',
      'Proposta': 'success',
      'Follow-up': 'warning',
      'Feedback': 'secondary',
      'Geral': 'outline'
    };
    return colors[category] || 'outline';
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Anotações</h1>
          <p className="text-muted-foreground mt-2">Mantenha suas ideias e lembretes organizados</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Anotação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Anotação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Digite o título"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={newNote.category}
                  onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                  placeholder="Ex: Reunião, Proposta, Follow-up"
                />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Escreva sua anotação aqui"
                  rows={6}
                />
              </div>
              <Button onClick={addNote} className="w-full">Criar Anotação</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="shadow-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{note.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={getCategoryColor(note.category)} className="text-xs">
                      {note.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => deleteNote(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
