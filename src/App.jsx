import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MediaManager from './components/MediaManager';
import { dbService } from './services/dbService';
import { INITIAL_USERS, INITIAL_TASKS, INITIAL_MEDIA, INITIAL_HISTORY } from './data/initialData';
import { Users, CheckCircle2, Clock, Plus, Trash2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  
  // ESTADOS DO BANCO DE DADOS LOCAL
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [media, setMedia] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeUserId, setActiveUserId] = useState('u1');

  // CARREGAR OU INICIALIZAR DADOS
  useEffect(() => {
    let savedTasks = dbService.get('TASKS', null);
    if (!savedTasks) {
      dbService.reset({ users: INITIAL_USERS, tasks: INITIAL_TASKS, media: INITIAL_MEDIA, history: INITIAL_HISTORY });
      savedTasks = INITIAL_TASKS;
    }
    setTasks(savedTasks);
    setUsers(dbService.get('USERS', INITIAL_USERS));
    setMedia(dbService.get('MEDIA', INITIAL_MEDIA));
    setHistory(dbService.get('HISTORY', INITIAL_HISTORY));
  }, []);

  const activeUser = users.find(u => u.id === activeUserId) || users[0] || {};

  // ATUALIZAR STATUS DE TAREFA
  const moveTask = (taskId, newStatus) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
    setTasks(updated);
    dbService.set('TASKS', updated);

    // Adicionar Histórico
    const task = tasks.find(t => t.id === taskId);
    const newHistory = [
      { id: 'h_' + Date.now(), userId: activeUserId, action: `Moveu "${task?.title}" para ${newStatus}`, date: new Date().toLocaleString('pt-BR') },
      ...history
    ];
    setHistory(newHistory);
    dbService.set('HISTORY', newHistory);
  };

  // ADICIONAR MÍDIA
  const handleAddMedia = (newItem) => {
    const updated = [newItem, ...media];
    setMedia(updated);
    dbService.set('MEDIA', updated);
  };

  // DELETAR MÍDIA
  const handleDeleteMedia = (id) => {
    const updated = media.filter(m => m.id !== id);
    setMedia(updated);
    dbService.set('MEDIA', updated);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 pb-16">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* HERO BANNER INSTITUCIONAL EMPIRE */}
      <section className="bg-gradient-to-b from-[#111] to-[#080808] border-b border-neutral-800/80 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">
              • BRASÍLIA E ENTORNO, GOIÂNIA.
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Seu evento. <br />
              <span className="gold-gradient-text">Nossa equipe.</span> Juntos na entrega.
            </h2>
          </div>

          {/* SELETOR DE COLABORADOR */}
          <div className="bg-[#121212] p-4 rounded-2xl border border-neutral-800 w-full md:w-auto">
            <label className="block text-xs font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Selecionar Colaborador Ativo:
            </label>
            <div className="flex flex-wrap gap-2">
              {users.map(u => (
                <button
                  key={u.id}
                  onClick={() => setActiveUserId(u.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${u.id === activeUserId ? 'gold-gradient-bg text-black shadow-md' : 'bg-neutral-900 text-neutral-300 hover:border-neutral-700 border border-neutral-800'}`}
                >
                  <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">{u.avatar}</span>
                  {u.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 pt-8">
        {activeTab === 'tasks' ? (
          <div className="space-y-8">
            {/* NO QUE O COLABORADOR ESTÁ TRABALHANDO */}
            <div className="bg-[#111] p-5 rounded-2xl border border-[#D4AF37]/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">Foco Atual do Colaborador</span>
                <h3 className="text-lg font-bold text-white">{activeUser.name} — <span className="text-neutral-300">{activeUser.role}</span></h3>
                <p className="text-xs text-neutral-400 mt-1">Trabalhando em: <strong className="text-white">{activeUser.activeTask}</strong></p>
              </div>
            </div>

            {/* QUADRO KANBAN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: 'todo', title: 'A Fazer', color: 'border-amber-500/40' },
                { key: 'in_progress', title: 'Em Andamento', color: 'border-blue-500/40' },
                { key: 'done', title: 'Concluído', color: 'border-emerald-500/40' }
              ].map(column => (
                <div key={column.key} className={`bg-[#0F0F0F] p-4 rounded-2xl border ${column.color}`}>
                  <h4 className="font-extrabold text-sm text-neutral-300 uppercase tracking-wider mb-4 flex justify-between items-center">
                    {column.title}
                    <span className="bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full text-xs">
                      {tasks.filter(t => t.status === column.key).length}
                    </span>
                  </h4>

                  <div className="space-y-3">
                    {tasks.filter(t => t.status === column.key).map(t => (
                      <div key={t.id} className="bg-[#161616] p-4 rounded-xl border border-neutral-800 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{t.tag}</span>
                          <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">{t.priority}</span>
                        </div>
                        <h5 className="font-bold text-sm text-white">{t.title}</h5>
                        <p className="text-xs text-neutral-400">{t.description}</p>

                        {/* MUDAR STATUS */}
                        <div className="pt-2 flex gap-1 justify-end">
                          {column.key !== 'todo' && (
                            <button onClick={() => moveTask(t.id, 'todo')} className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-300">A Fazer</button>
                          )}
                          {column.key !== 'in_progress' && (
                            <button onClick={() => moveTask(t.id, 'in_progress')} className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-300">Andamento</button>
                          )}
                          {column.key !== 'done' && (
                            <button onClick={() => moveTask(t.id, 'done')} className="text-[10px] bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded">Concluir</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <MediaManager
            media={media}
            onAddMedia={handleAddMedia}
            onDeleteMedia={handleDeleteMedia}
            activeUser={activeUser}
          />
        )}
      </main>
    </div>
  );
}