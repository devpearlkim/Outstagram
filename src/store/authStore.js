import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  user: JSON.parse(localStorage.getItem('user-info')),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
});

export const useAuthStore = create(
  persist(devtools(store), { name: 'authStore' })
);
