const STORAGE_KEYS = {
  TASKS: 'empire_tasks_db',
  USERS: 'empire_users_db',
  MEDIA: 'empire_media_db',
  HISTORY: 'empire_history_db'
};

export const dbService = {
  get: (key, fallback = []) => {
    const storageKey = STORAGE_KEYS[key];
    if (!storageKey || typeof localStorage === 'undefined') return fallback;

    try {
      const data = localStorage.getItem(storageKey);
      if (!data) return fallback;

      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
      console.error('Erro ao carregar dados locais:', error);
      return fallback;
    }
  },

  set: (key, value) => {
    const storageKey = STORAGE_KEYS[key];
    if (!storageKey || typeof localStorage === 'undefined') return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar dados locais:', error);
    }
  },

  reset: (initialData) => {
    if (!initialData) return;

    Object.entries(STORAGE_KEYS).forEach(([key]) => {
      dbService.set(key, initialData[key.toLowerCase()]);
    });
  }
};
