import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../../api/Like/apiLike';

const useLikePost = ({ post, user }) => {
  const queryClient = useQueryClient();

  const { mutate: handleLike } = useMutation({
    mutationFn: () => toggleLike({ post, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { handleLike };
};

export default useLikePost;
