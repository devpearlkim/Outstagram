import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '../api/APIResponsesTypes'

interface UserProfileStore {
  userProfile: User | null
  setUserProfile: (userProfile: User) => void
  deletePost: (postId: string) => void
}

export const useUserProfileStore = create<UserProfileStore>()(
  devtools(
    persist(
      (set) => ({
        userProfile: null,
        setUserProfile: (userProfile) => set({ userProfile }),
        deletePost: (postId) =>
          set(
            (state) =>
              ({
                userProfile: {
                  ...state.userProfile,
                  posts: state.userProfile?.posts.filter((id) => id !== postId),
                },
              } as Partial<UserProfileStore>),
          ),
      }),
      { name: 'userProfileStore' },
    ),
  ),
)
