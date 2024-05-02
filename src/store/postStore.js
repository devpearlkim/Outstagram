import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
});

export const usePostStore = create(
  persist(devtools(store), { name: 'postStore' })
);
