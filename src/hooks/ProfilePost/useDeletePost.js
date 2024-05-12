import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../useShowToast';
import { deletePost as deletePostAPI } from '../../api/Profile/apiPosts';

function useDeletePost(userId) {
  const showToast = useShowToast();

  const queryClient = useQueryClient();

  const { mutate: deletePost, isLoading: isDeleting } = useMutation({
    mutationFn: (postId) => deletePostAPI({ userId, postId }),
    onSuccess: () => {
      showToast('Success', '포스트를 삭제했습니다', 'success');
      queryClient.invalidateQueries({ queryKey: ['posts', 'profile', userId] });
    },
    onError: () => {
      showToast('Error', '포스트 삭제 실패, 잠시 후 시도해주세요', 'error');
    },
  });

  return { deletePost, isDeleting };
}

export default useDeletePost;
