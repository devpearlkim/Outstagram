import { Box, Image } from '@chakra-ui/react';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

export default function FeedPost({ img, username, avatar }) {
  return (
    <>
      <PostHeader username={username} avatar={avatar} />
      <Box>
        <Image src={img} alt={`${username}'s post img`} />
      </Box>
      <PostFooter username={username} />
    </>
  );
}
