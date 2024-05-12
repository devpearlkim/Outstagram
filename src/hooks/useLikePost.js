import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from './useShowToast';
import { toggleLike } from '../api/Like/apiLike';

const useLikePost = ({ post, userId }) => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  const { mutate: handleLike } = useMutation({
    mutationFn: () => toggleLike({ post, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { handleLike };
};

export default useLikePost;
