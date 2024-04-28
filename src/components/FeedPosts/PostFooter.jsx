import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

export default function PostFooter({ username }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(100);
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} my={2}>
        <Box onClick={handleLike} cursor={'pointer'}>
          {liked ? (
            <IoMdHeartEmpty size={25} />
          ) : (
            <IoMdHeart size={25} color='red' />
          )}
        </Box>
        <Box cursor={'pointer'}>
          <FaRegComment size={20} />
        </Box>
      </Flex>
      <Text fontSize={'sm'} fontWeight={600}>
        {likes} likes
      </Text>
      <Text fontSize={'sm'} fontWeight={700}>
        {username}{' '}
        <Text as={'sapn'} fontWeight={400}>
          날씨 좋다
        </Text>
      </Text>
      <Text fontSize={'sm'} color={'gray.700'}>
        View all comments
      </Text>
    </>
  );
}
