import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../useShowToast';
import { createEditPost } from '../../api/Profile/apiPosts';

function useCreatePost(userId) {
  const showToast = useShowToast();

  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: (data) =>
      createEditPost(userId, data.caption, data.selectedFile),
    onSuccess: () => {
      showToast('Success', '포스트를 추가했습니다', 'success');
      queryClient.invalidateQueries({ queryKey: ['posts', 'profile', userId] });
    },
    onError: () => {
      showToast('Error', '포스트 추가 실패, 잠시 후 시도해주세요', 'error');
    },
  });

  return { createPost, isCreating };
}

export default useCreatePost;
