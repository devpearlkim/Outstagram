import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Comment, Post } from '../api/APIResponsesTypes'

interface PostStore {
  posts: Post[]
  createPost: (post: Post) => void
  deletePost: (id: string) => void
  setPosts: (posts: Post[]) => void
  addComment: (postId: string, comment: string) => void
}

export const usePostStore = create<PostStore>()(
  devtools(
    persist(
      (set) => ({
        posts: [],
        createPost: (post) =>
          set((state) => ({ posts: [...state.posts, post] })),
        deletePost: (id) =>
          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
          })),
        setPosts: (posts) => set({ posts }),
        addComment: (postId, comment) =>
          set((state) => ({
            ...state,
            posts: state.posts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: [...post.comments, comment],
                }
              }
              return post
            }),
          })),
      }),
      { name: 'postStore' },
    ),
  ),
)
