import useShowToast from './useShowToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/Comment/apiComment';

const usePostComment = (userId) => {
  const showToast = useShowToast();

  const queryClient = useQueryClient();

  const { mutate: createComment, isLoading: isCommenting } = useMutation({
    mutationFn: ({ postId, comment }) =>
      addComment({ userId, postId, comment }),
    onSuccess: () => {
      showToast('Success', '댓글을 추가했습니다', 'success');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error(error);
      showToast('Error', '댓글 추가 실패, 잠시 후 시도해주세요', 'error');
    },
  });

  return { createComment, isCommenting };
};

export default usePostComment;
