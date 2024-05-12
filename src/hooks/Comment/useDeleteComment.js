import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../useShowToast';
import { deleteComment as deleteCommentAPI } from '../../api/Comment/apiComment';

function useDeleteComment() {
  const showToast = useShowToast();

  const queryClient = useQueryClient();

  const { mutate: deleteComment, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      showToast('Success', '댓글을 삭제했습니다', 'success');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      showToast('Error', '댓글 삭제 실패, 잠시 후 시도해주세요', 'error');
    },
  });

  return { deleteComment, isDeleting };
}

export default useDeleteComment;
