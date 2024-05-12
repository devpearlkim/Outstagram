import useShowToast from '../useShowToast';
import { useAuthStore } from '../../store/authStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchFeedPosts from '../../api/FeedPost/fetchFeedPosts';

const useGetFeedPosts = () => {
  const showToast = useShowToast();
  const { user } = useAuthStore();

  const { fetchNextPage, hasNextPage, data, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', 'main', user.following],
      queryFn: fetchFeedPosts,
      retry: false,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          return lastPage[lastPage.length - 1]?.createdAt;
        }
        return null;
      },
      onError: () => {
        showToast(
          'Error',
          '게시글 로딩 중 오류 발생, 잠시 후 시도해주세요',
          'error'
        );
      },
    });

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetFeedPosts;
