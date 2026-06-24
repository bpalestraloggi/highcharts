# SalesHub - Dashboard de Vendas com IA

Um dashboard de vendas completo com integração Monday.com e agentes de IA para automatizar processos de vendas.

## 🚀 Funcionalidades

### 1. **Dashboard Principal**
- Métricas de vendas em tempo real (Receita Total, Taxa de Conversão, Leads Ativos, Ticket Médio)
- Gráficos interativos (Receita de Vendas, Funil de Vendas)
- Atividades recentes do sistema
- Interface em Português (BR)

### 2. **Gestão de Tarefas**
- Criação e gerenciamento de tarefas diárias
- Sincronização com Monday.com
- Categorização por prioridade (Alta, Média, Baixa)
- Status de tarefas (Pendente, Em Progresso, Concluída)
- Datas de vencimento

### 3. **Sistema de Anotações**
- Criação rápida de notas
- Categorização personalizável
- Organização por data
- Interface tipo cards para visualização

### 4. **Agentes de IA**
Quatro agentes especializados para automação:
- **Agente SDR**: Qualifica leads automaticamente e agenda reuniões
- **Gerador de Propostas**: Cria propostas comerciais personalizadas
- **Assistente de Follow-up**: Gerencia follow-ups e mantém leads engajados
- **Analisador de Leads**: Analisa e pontua leads baseado em critérios

Cada agente possui:
- Status (Ativo/Pausado)
- Métricas de performance
- Histórico de execuções
- Controles de execução manual

### 5. **Gestão de Propostas**
- Geração automática de propostas com IA
- Status tracking (Rascunho, Enviada, Em Negociação, Aprovada, Rejeitada)
- Informações de validade
- Visualização e download de propostas
- Dashboard de métricas (Total, Aprovadas, Em Negociação, Valor Total)

### 6. **Integrações**
Suporte para múltiplas integrações:
- **Monday.com**: Sincronização de tarefas e projetos
- **Email (SMTP)**: Envio de propostas e follow-ups
- **Google Calendar**: Agendamento automático de reuniões
- **CRM Personalizado**: Integração com CRM existente

Cada integração possui:
- Toggle de ativação/desativação
- Configuração personalizada
- Teste de conexão
- Status de conectividade

### 7. **Configurações**
- **Perfil**: Gerenciamento de informações pessoais
- **Notificações**: Preferências de email, push e alertas
- **Aparência**: Tema (Claro/Escuro/Sistema) e idioma
- **Segurança**: Alteração de senha

## 🎨 Design System

### Paleta de Cores
- **Primary**: Blue (#3B82F6) - Ações principais e navegação
- **Success**: Green (#10B981) - Métricas positivas e sucesso
- **Warning**: Orange (#F59E0B) - Alertas e atenção
- **Destructive**: Red (#EF4444) - Erros e ações críticas

### Componentes
- Baseado em **Shadcn/ui** para consistência e acessibilidade
- Cards com sombras suaves
- Gráficos com **Recharts** 
- Navegação sidebar responsiva
- Tooltips e toasts informativos

### Tipografia
- Fonte: **Inter** (Google Fonts)
- Hierarquia clara com tamanhos responsivos
- Alto contraste para legibilidade

## 🛠️ Stack Tecnológica

### Frontend
- **React** 18
- **React Router** para navegação
- **Tailwind CSS** para estilização
- **Shadcn/ui** para componentes base
- **Recharts** para visualização de dados
- **Lucide React** para ícones
- **Sonner** para notificações toast

### Backend
- **FastAPI** (Python)
- **MongoDB** com Motor (async driver)
- **Pydantic** para validação de dados
- Estrutura modular com routers

## 📁 Estrutura do Projeto

```
/app
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Componentes Shadcn
│   │   │   ├── Sidebar.jsx      # Navegação lateral
│   │   │   ├── StatsCard.jsx    # Cards de estatísticas
│   │   │   ├── RevenueChart.jsx # Gráfico de receita
│   │   │   └── PipelineChart.jsx # Gráfico de funil
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Dashboard principal
│   │   │   ├── Tasks.jsx        # Gestão de tarefas
│   │   │   ├── Notes.jsx        # Anotações
│   │   │   ├── Agents.jsx       # Agentes de IA
│   │   │   ├── Proposals.jsx    # Propostas
│   │   │   ├── Integrations.jsx # Integrações
│   │   │   └── Settings.jsx     # Configurações
│   │   ├── App.js               # Componente raiz
│   │   └── index.css            # Estilos globais e design tokens
│   └── package.json
└── backend/
    ├── models.py                # Modelos Pydantic
    ├── server.py                # FastAPI app principal
    ├── routes/
    │   ├── tasks.py             # Endpoints de tarefas
    │   ├── notes.py             # Endpoints de anotações
    │   ├── agents.py            # Endpoints de agentes
    │   ├── proposals.py         # Endpoints de propostas
    │   └── integrations.py      # Endpoints de integrações
    └── requirements.txt
```

## 🚦 APIs Disponíveis

### Tasks
- `GET /api/tasks` - Listar tarefas
- `POST /api/tasks` - Criar tarefa
- `PATCH /api/tasks/{id}/status` - Atualizar status
- `DELETE /api/tasks/{id}` - Deletar tarefa
- `POST /api/tasks/sync-monday` - Sincronizar com Monday.com

### Notes
- `GET /api/notes` - Listar anotações
- `POST /api/notes` - Criar anotação
- `DELETE /api/notes/{id}` - Deletar anotação

### Agents
- `GET /api/agents` - Listar agentes
- `PATCH /api/agents/{id}/status` - Alterar status do agente
- `POST /api/agents/{id}/run` - Executar agente

### Proposals
- `GET /api/proposals` - Listar propostas
- `POST /api/proposals` - Criar proposta
- `POST /api/proposals/generate-ai` - Gerar proposta com IA
- `PATCH /api/proposals/{id}/status` - Atualizar status

### Integrations
- `GET /api/integrations` - Listar integrações
- `PATCH /api/integrations/{id}` - Atualizar integração
- `POST /api/integrations/{id}/test` - Testar conexão

## 🔧 Configuração

### Variáveis de Ambiente

#### Frontend (.env)
```
REACT_APP_BACKEND_URL=<sua-url-backend>
```

#### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=sales_dashboard
CORS_ORIGINS=*
```

## 📊 Status Atual

### ✅ Implementado (Frontend Funcional)
- Interface completa e responsiva
- Navegação entre todas as páginas
- Formulários funcionais com validação
- Gráficos interativos
- Sistema de notificações (toasts)
- Dados mockados para demonstração
- Design system completo com tokens

### 🔄 Backend APIs (Estrutura Criada)
- Endpoints RESTful implementados
- Modelos de dados definidos
- Integração com MongoDB
- Rotas modulares organizadas
- Health checks funcionando

### 🎯 Próximos Passos para Produção

1. **Integrações Reais**
   - Implementar API do Monday.com
   - Configurar SMTP para emails
   - Integrar Google Calendar API

2. **Agentes de IA**
   - Conectar com OpenAI/Anthropic/Google
   - Implementar lógica de SDR
   - Sistema de geração de propostas com IA
   - Análise de leads com ML

3. **Autenticação**
   - Sistema de login/registro
   - JWT tokens
   - Permissões e roles

4. **Features Adicionais**
   - Upload de arquivos
   - Exportação de relatórios (PDF/Excel)
   - Webhooks do Monday.com
   - Notificações em tempo real (WebSockets)

## 🎓 Como Usar

1. **Acessar o Dashboard**
   - Abra o navegador em `http://localhost:3000`
   - Explore as diferentes seções via sidebar

2. **Criar Tarefas**
   - Vá para "Tarefas"
   - Clique em "Nova Tarefa"
   - Preencha os detalhes
   - Sincronize com Monday.com

3. **Gerenciar Agentes**
   - Acesse "Agentes IA"
   - Ative/pause agentes conforme necessário
   - Execute agentes para automatizar tarefas
   - Monitore performance

4. **Gerar Propostas**
   - Vá para "Propostas"
   - Clique em "Gerar com IA"
   - Aguarde a geração automática
   - Visualize e baixe propostas

5. **Configurar Integrações**
   - Acesse "Integrações"
   - Ative as integrações desejadas
   - Configure API keys quando necessário
   - Teste as conexões

## 📝 Notas Importantes

- **Dados Mockados**: Atualmente o frontend opera com dados mockados para demonstração. Todas as funcionalidades interativas funcionam, mas não persistem dados reais ainda.
- **APIs Backend**: As APIs backend estão implementadas e prontas para uso. A conexão frontend-backend pode ser ativada facilmente.
- **Monday.com**: Para usar a integração real do Monday.com, você precisará de uma API key válida.
- **Agentes de IA**: Os agentes atualmente simulam execuções. Para funcionalidade real, integre com provedores de IA (OpenAI, Anthropic, etc.).

## 🎨 Design Principles Aplicados

- **Token-First Development**: Todos os estilos usam design tokens
- **Semantic Colors**: Cores HSL com significado semântico
- **Component Variants**: Variações baseadas em contexto
- **Accessibility**: Contraste WCAG AA, navegação por teclado
- **Responsive**: Mobile-first com breakpoints apropriados
- **Consistency**: Espaçamento, tipografia e cores consistentes

## 💡 Destaques Técnicos

- **Zero hardcoded colors**: Todos os estilos usam tokens CSS
- **Type-safe**: Pydantic models no backend para validação
- **Modular**: Componentes e rotas reutilizáveis
- **Performance**: Gráficos otimizados, lazy loading
- **UX**: Micro-interações, feedback visual, estados de loading

---

**Desenvolvido com ❤️ usando React, FastAPI e design moderno**
