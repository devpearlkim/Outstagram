import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react';
import ProfilePost from './ProfilePost';
import { useEffect, useState } from 'react';

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={'flex-start'} gap={4}>
            <Skeleton w={'full'} aspectRatio={1 / 1}>
              <Box h='300px'>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {[0, 1, 2, 3].map((_, idx) => (
            <ProfilePost key={idx} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;
