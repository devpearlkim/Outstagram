import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
});

export const useUserProfileStore = create(
  persist(devtools(store), { name: 'userProfileStore' })
);
