import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  // addPost:
});

export const useUserProfileStore = create(
  persist(devtools(store), { name: 'userProfileStore' })
);
