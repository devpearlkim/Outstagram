import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SuggestedUser({ user: suggestedUser }) {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    suggestedUser.uid
  );
  const { user } = useAuthStore();
  const [numberOfFollower, setNumberOfFollower] = useState(
    suggestedUser.followers.length
  );

  const onFollowUser = async () => {
    await handleFollowUser();

    setNumberOfFollower((prevFollower) =>
      isFollowing ? prevFollower - 1 : prevFollower + 1
    );
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${suggestedUser.username}`}>
          <Avatar
            src={suggestedUser.profilePicURL || '/none.jpg'}
            size={'md'}
          />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
          <Link to={`/${suggestedUser.username}`}>
            <Box fontSize={12} fontWeight={'bold'}>
              {suggestedUser.username}
            </Box>
          </Link>
          <Box fontSize={11} color={'gray.500'}>
            {numberOfFollower} followers
          </Box>
        </VStack>
      </Flex>
      {user.uid !== suggestedUser.uid && (
        <Button
          fontSize={13}
          bg={'transparent'}
          p={0}
          h={'max-content'}
          fontWeight={'medium'}
          color={'blue.400'}
          cursor={'pointer'}
          _hover={{ color: 'white' }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </Flex>
  );
}
