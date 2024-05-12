import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../hooks/useGetUserPosts';
import { useUserProfileStore } from '../../store/userProfileStore';
import useIntersect from '../../hooks/useIntersect';
import React from 'react';

const ProfilePosts = () => {
  const { userProfile } = useUserProfileStore();
  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUserPosts(userProfile?.uid);

  const [intersectRef] = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
      observer.observe(entry.target);
    },
    { threshold: 0.45 }
  );

  if (isLoading || (hasNextPage && isFetchingNextPage)) {
    return (
      <React.Fragment>
        {[0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={'flex-start'} gap={4}>
            <Skeleton w={'full'} aspectRatio={1 / 1}>
              <Box h='300px'>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      </React.Fragment>
    );
  }

  return (
    <>
      <Grid
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={1}
        columnGap={1}
      >
        {!isLoading &&
          posts?.pages &&
          posts.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((post) => (
                <GridItem key={post.id}>
                  <ProfilePost post={post} />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
      </Grid>
      {hasNextPage && (
        <Box
          ref={intersectRef}
          h={'400px'}
          w={'100%'}
          backgroundColor={'transparent'}
        />
      )}
      {posts?.pages[0].length === 0 && (
        <Flex flexDir='column' textAlign={'center'} mx={'auto'} mt={10}>
          <Text fontSize={'lg'}>작성글이 없습니다</Text>
        </Flex>
      )}
    </>
  );
};

export default ProfilePosts;
