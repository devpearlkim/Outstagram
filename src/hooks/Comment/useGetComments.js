import useShowToast from '../useShowToast';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../api/Comment/apiComment';

const useGetComments = (postId) => {
  const showToast = useShowToast();
  const { data, isLoading, status } = useQuery({
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

  return { data: data || [], isLoading, status };
};

export default useGetComments;
