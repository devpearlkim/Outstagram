import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  // deletePost:
  // addComment:
  // setPosts:
});

export const usePostStore = create(
  persist(devtools(store), { name: 'postStore' })
);
