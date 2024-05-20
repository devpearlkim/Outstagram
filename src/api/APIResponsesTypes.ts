import {
  FetchNextPageOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'

export interface User {
  uid: string
  email: string
  username: string
  bio: string
  profilePicURL: string
  posts: string[]
  followers: string[]
  following: string[]
  createdAt: number
}

export interface Post {
  createdBy: string
  caption: string
  imageURL: string
  comments: string[]
  likes: string[]
  createdAt: number
}

export interface Comment {
  createdBy: string
  comment: string
  postId: string
  createdAt: number
}

export interface UserAPIResponse {
  data: User[]
  isLoading: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<UseInfiniteQueryResult>
  hasNextPage: boolean
  isFetchingNextPage: boolean
}
