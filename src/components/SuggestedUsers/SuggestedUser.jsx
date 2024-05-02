import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

export default function SuggestedUser({
  user: suggestedUser,
  setUser: setSuggestedUser,
}) {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    suggestedUser.uid
  );
  const { user } = useAuthStore();

  const onFollowUser = async () => {
    await handleFollowUser();

    // suggestedUser 화면에서 바로 업데이트
    setSuggestedUser({
      ...suggestedUser,
      followers: isFollowing
        ? suggestedUser.followers.filter(
            (follower) => follower.uid !== user.uid
          )
        : [...suggestedUser.followers, user],
    });
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${suggestedUser.username}`}>
          <Avatar src={suggestedUser.profilePicURL} size={'md'} />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
          <Link to={`/${suggestedUser.username}`}>
            <Box fontSize={12} fontWeight={'bold'}>
              {suggestedUser.username}
            </Box>
          </Link>
          <Box fontSize={11} color={'gray.500'}>
            {suggestedUser.followers.length} followers
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
