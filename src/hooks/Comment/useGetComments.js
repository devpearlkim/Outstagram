import useShowToast from '../useShowToast';
import { useAuthStore } from '../../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../api/Comment/apiComment';

const useGetComments = (postId) => {
  const showToast = useShowToast();
  const { data, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: fetchComments,
    onError: () => {
      showToast(
        'Error',
        '댓글 조회 중 오류 발생, 잠시 후 시도해주세요',
        'error'
      );
    },
  });

  return { data, isLoading };
};

export default useGetComments;
