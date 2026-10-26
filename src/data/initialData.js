export const INITIAL_USERS = [
  { id: 'u1', name: 'Alex Silva', role: 'Coordenador Geral', avatar: 'AS', activeTask: 'Supervisão de Montagem no Centro de Convenções' },
  { id: 'u2', name: 'Carlos Eduardo', role: 'Chefe de Bartenders', avatar: 'CE', activeTask: 'Organização de Insumos para Bar Corporativo' },
  { id: 'u3', name: 'Elena Costa', role: 'Líder de Recepção', avatar: 'EC', activeTask: 'Credenciamento de Convidados VIP' },
  { id: 'u4', name: 'Lucas Mendes', role: 'Coordenador de Carregadores', avatar: 'LM', activeTask: 'Carga e Descarga de Palco Principal' }
];

export const INITIAL_TASKS = [
  { id: 't1', title: 'Treinamento da Equipe de Recepção', description: 'Orientação sobre padrão de atendimento VIP.', status: 'todo', assignedUser: 'u3', priority: 'Alta', tag: 'Treinamento' },
  { id: 't2', title: 'Montagem da Estrutura do Bar', description: 'Instalar bancadas e balcões iluminados.', status: 'in_progress', assignedUser: 'u2', priority: 'Urgente', tag: 'Montagem' },
  { id: 't3', title: 'Conferência de Uniformes e EPIs', description: 'Checar vestuário de todos os 45 colaboradores.', status: 'done', assignedUser: 'u1', priority: 'Média', tag: 'Logística' }
];

export const INITIAL_MEDIA = [
  { id: 'm1', type: 'image', title: 'Bastidores da Montagem - Feira de Tecnologia', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', description: 'Equipe finalizando estrutura do palco principal.', author: 'Alex Silva', date: '2026-10-20' },
  { id: 'm2', type: 'video', title: 'Treinamento Prático de Bartenders', url: 'https://assets.mixkit.co/videos/preview/mixkit-barman-preparing-a-cocktail-41381-large.mp4', description: 'Demostração de agilidade e padrão de serviço.', author: 'Carlos Eduardo', date: '2026-10-21' }
];

export const INITIAL_HISTORY = [
  { id: 'h1', userId: 'u1', action: 'Concluiu a verificação de segurança', date: '2026-10-22 14:30' },
  { id: 'h2', userId: 'u2', action: 'Iniciou a montagem do bar principal', date: '2026-10-22 15:10' }
];