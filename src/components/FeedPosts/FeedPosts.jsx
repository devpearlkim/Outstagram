import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react';
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';
import { useEffect, useState } from 'react';

function FeedPosts() {
  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetFeedPosts();

  const [cnt, setCnt] = useState(1);

  useEffect(() => {
    if (!isLoading && !isFetchingNextPage && hasNextPage && cnt < 2) {
      fetchNextPage();
      setCnt((prev) => prev + 1);
    }
  }, [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, cnt]);

  if (isLoading) {
    return (
      <Container maxW={'container.sm'} py={10} px={2}>
        {[0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w={'200px'} />
                <Skeleton height={'10px'} w={'200px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box height={'500px'}>content wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      </Container>
    );
  }
  return (
    posts?.pages && (
      <Container maxW={'container.sm'} py={10} px={2}>
        {posts?.pages.map((page, i) => (
          <Box key={i}>
            {page.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </Box>
        ))}
        {posts.pages.length === 0 && (
          <Text fontSize={'md'} color={'blue.400'}>
            다른 유저를 팔로우하고, 게시글을 확인해보세요 :D
          </Text>
        )}
      </Container>
    )
  );
}

export default FeedPosts;
