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

function FeedPosts() {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
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
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={'md'} color={'blue.400'}>
            다른 유저를 팔로우하고, 게시글을 확인해보세요 :D
          </Text>
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
