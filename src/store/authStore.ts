import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '../api/APIResponsesTypes'

interface AuthStore {
  user: User | null
  login: (user: User) => void
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: JSON.parse(localStorage.getItem('user-info') || 'null'),
        login: (user) => set({ user }),
        logout: () => set({ user: null }),
        setUser: (user) => set({ user }),
      }),
      { name: 'authStore' },
    ),
  ),
)
