import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from '@chakra-ui/react';
import FeedPost from './FeedPost';
import { useEffect, useState } from 'react';

function FeedPosts() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
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
      {!isLoading && (
        <>
          <FeedPost username='jay' img='/auth.png' avatar='/auth.png' />
          <FeedPost username='jay' img='/google.png' avatar='/google.png' />
          <FeedPost username='jay' img='/auth.png' avatar='/auth.png' />
          <FeedPost username='jay' img='/auth.png' avatar='/auth.png' />
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
