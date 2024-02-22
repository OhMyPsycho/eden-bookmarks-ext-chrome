import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useArchiveStore = create(
  persist(
    (set, get) => ({
      archives: [],
      enableSync: false,
      syncJson: (data) => {
        set({ archives: get().archives.concat(data) });
      },
      add: async (data) => {
        set({ archives: get().archives.concat(data) });
      },
      update: (id, data) => {
        set({
          archives: get().archives.map((archive) =>
            archive.id === id ? { ...archive, ...data } : archive
          ),
        });
      },
      remove: (id) => {
        set({ archives: get().archives.filter((archive) => archive.id !== id)});
      },
      removeAll: () => {
        set({ archives: [] });
      }
    }),
    {
      name: 'archives-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useArchiveStore;