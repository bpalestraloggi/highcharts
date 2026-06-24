import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  StickyNote, 
  Bot, 
  FileText, 
  Settings, 
  Plug,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tarefas', href: '/tasks', icon: CheckSquare },
  { name: 'Anotações', href: '/notes', icon: StickyNote },
  { name: 'Agentes IA', href: '/agents', icon: Bot },
  { name: 'Propostas', href: '/proposals', icon: FileText },
  { name: 'Integrações', href: '/integrations', icon: Plug },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-300 lg:relative lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">SalesHub</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "sidebar-nav-item",
                      isActive && "active"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                VS
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">Vendedor</p>
                <p className="truncate text-xs text-muted-foreground">vendedor@empresa.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-40 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
