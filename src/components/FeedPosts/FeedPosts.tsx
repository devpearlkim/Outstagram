import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/FeedPosts/useGetFeedPosts'
import useIntersect from '../../hooks/intersection/useIntersect'

function FeedPosts() {
  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetFeedPosts()

  const intersectRef: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  > = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
      observer.observe(entry.target)
    },
    { threshold: 0.45 },
  )

  if (isLoading && (hasNextPage || isFetchingNextPage)) {
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
    )
  }
  return (
    <VStack spacing={8} align="stretch">
      {posts?.pages &&
        posts.pages.map((page, i) => (
          <Box key={i}>
            {page.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </Box>
        ))}
      {hasNextPage && (
        <Box ref={intersectRef} h={'400px'} backgroundColor={'transparent'} />
      )}
      {posts?.pages.length === 0 && (
        <Text fontSize={'md'} color={'blue.400'}>
          다른 유저를 팔로우하고, 게시글을 확인해보세요 :D
        </Text>
      )}
    </VStack>
  )
}

export default FeedPosts
