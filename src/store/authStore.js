import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const authStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export const useAuthStore = create(
  persist(devtools(authStore), { name: 'authStore' })
);
