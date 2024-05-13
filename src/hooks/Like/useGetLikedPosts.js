import useShowToast from '../useShowToast';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLikedPosts } from '../../api/Like/apiLike';

const useGetLikedPosts = (userId) => {
  const showToast = useShowToast();

  const { fetchNextPage, hasNextPage, data, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['likes', 'posts', userId],
      queryFn: fetchLikedPosts,
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
          '좋아요한 게시글 조회 중 오류 발생, 잠시 후 시도해주세요',
          'error'
        );
      },
    });

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useGetLikedPosts;
