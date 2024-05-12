import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from './useShowToast';
import { createEditPost } from '../api/Profile/apiPosts';

function useEditPost(userId) {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  const { mutate: editPost, isLoading: isEditing } = useMutation({
    mutationFn: ({ newData: editPost, id }) =>
      createEditPost(userId, editPost.caption, editPost.selectedFile, id),
    onSuccess: () => {
      showToast('Success', '포스트를 수정했습니다', 'success');
      queryClient.invalidateQueries({ queryKey: ['posts', 'profile', userId] });
    },
    onError: () => {
      showToast('Error', '포스트 수정 실패, 잠시 후 시도해주세요', 'error');
    },
  });

  return { editPost, isEditing };
}

export default useEditPost;
