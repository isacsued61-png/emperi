const STORAGE_KEYS = {
  TASKS: 'empire_tasks_db',
  USERS: 'empire_users_db',
  MEDIA: 'empire_media_db',
  HISTORY: 'empire_history_db'
};

export const dbService = {
  // Ler Dados
  get: (key, fallback = []) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS[key]);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error("Erro ao carregar dados do banco:", e);
      return fallback;
    }
  },

  // Salvar Dados
  set: (key, value) => {
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
    } catch (e) {
      console.error("Erro ao salvar no banco:", e);
    }
  },

  // Resetar para dados iniciais de teste
  reset: (initialData) => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(initialData.tasks));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialData.users));
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(initialData.media));
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(initialData.history));
  }
};