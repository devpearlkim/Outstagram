import useShowToast from './useShowToast';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchProfilePosts from '../api/Profile/fetchProfilePosts';

const useGetUserPosts = (userProfileId) => {
  const showToast = useShowToast();

  const { fetchNextPage, hasNextPage, data, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', 'profile', userProfileId],
      queryFn: fetchProfilePosts,
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

export default useGetUserPosts;
