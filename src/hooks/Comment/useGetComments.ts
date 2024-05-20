import useShowToast from '../useShowToast'
import { useQuery } from '@tanstack/react-query'
import { fetchComments } from '../../api/Comment/apiComment'
import { Comment } from '../../api/APIResponsesTypes'

interface CommentsResponse {
  data: Comment[]
  isLoading: boolean
  status: 'error' | 'success' | 'pending'
}

const useGetComments = (postId: string): CommentsResponse => {
  const showToast = useShowToast()
  const { data, isLoading, status, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: fetchComments,
  })

  if (isError) {
    showToast('Error', '댓글 조회 중 오류 발생, 잠시 후 시도해주세요', 'error')
  }

  return { data: data || [], isLoading, status }
}

export default useGetComments
