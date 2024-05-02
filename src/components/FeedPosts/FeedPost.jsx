import { Box, Image } from '@chakra-ui/react';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

export default function FeedPost({ post }) {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box>
        <Image src={post.imageURL} alt={`${post.createdBy}'s post img`} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
}
