import { Box, Button, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

export default function PostFooter({ isProfilePage, post, creatorProfile }) {
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
      <Box mb={10} marginTop={'auto'}>
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
          {post.likes.length} likes
        </Text>
        {!isProfilePage && (
          <>
            <Text fontSize={'sm'} fontWeight={700}>
              {creatorProfile?.username}{' '}
              <Text as={'span'} fontWeight={400}>
                {post.caption}
              </Text>
            </Text>
            <Text fontSize={'sm'} color={'gray.700'}>
              View all comments
            </Text>
          </>
        )}
        <Flex
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
          w={'full'}
        >
          <InputGroup>
            <Input placeholder={'Add a comment...'} fontSize={14} />
            <Button
              fontSize={14}
              color={'blue.500'}
              fontWeight={600}
              cursor={'pointer'}
              _hover={{ color: 'white' }}
              bg={'transparent'}
            >
              Post
            </Button>
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
}
