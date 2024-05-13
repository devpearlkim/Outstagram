import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useAuthStore } from '../../store/authStore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/User/useFollowUser';
import FollowerModal from '../Modals/FollowerModal';
import { useEffect, useState } from 'react';
import useGetFollowers from '../../hooks/User/useGetFollowers';
import useGetFollowing from '../../hooks/User/useGetFollowing';
import FollowingModal from '../Modals/FollowingModal';

export default function ProfileHeader() {
  const { userProfile } = useUserProfileStore();
  const { user } = useAuthStore();
  const ownProfile = user && user.username === userProfile.username;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const { followUsers } = useGetFollowers();
  const { followingUsers } = useGetFollowing();

  const handleShowFollowers = () => {
    setOpenFollowers(true);
  };

  const handleShowFollowings = () => {
    setOpenFollowings(true);
  };

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: 'column', sm: 'row' }}
    >
      <AvatarGroup
        size={{ base: 'xl', md: '2xl' }}
        justifySelf={'center'}
        alignSelf={'flex-start'}
        mx={'auto'}
      >
        <Avatar
          src={userProfile.profilePicURL || '/none.jpg'}
          alt={`userProfile.profilePicURLprofilePic ? ${userProfile.username}의 프로필 이미지 : 기본 이미지`}
        />
      </AvatarGroup>
      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
        <Flex
          gap={4}
          direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ base: 'center', sm: 'flex-start' }}
          alignItems={'center'}
          w={'full'}
        >
          <Text fontSize={{ base: 'sm', md: 'lg' }}>
            {userProfile.username}
          </Text>

          {/* 로그인안할경우 null, 본인 프로필이면 수정버튼, 다른유저 프로필이면 follow/unfollow버튼 */}
          {!user ? null : ownProfile ? (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button
                bg={'white'}
                color={'black'}
                _hover={{ bg: 'whiteAlpha.800' }}
                size={{ base: 'xs', md: 'sm' }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          ) : (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button
                bg={'blue.500'}
                color={'black'}
                _hover={{ bg: 'whiteAlpha.800' }}
                size={{ base: 'xs', md: 'sm' }}
                isLoading={isUpdating}
                onClick={handleFollowUser}
              >
                {isFollowing ? 'unFollow' : 'Follow'}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Button
            fontSize={{ base: 'xs', md: 'sm' }}
            pointer={'hover'}
            onClick={handleShowFollowers}
          >
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Button>
          <Button
            fontSize={{ base: 'xs', md: 'sm' }}
            pointer={'hover'}
            onClick={handleShowFollowings}
          >
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Button>
        </Flex>
        <Text fontSize={'sm'}>{userProfile.bio}</Text>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      <FollowerModal
        users={followUsers}
        isOpen={openFollowers}
        onClose={() => setOpenFollowers(false)}
      />
      <FollowingModal
        users={followingUsers}
        isOpen={openFollowings}
        onClose={() => setOpenFollowings(false)}
      />
    </Flex>
  );
}
