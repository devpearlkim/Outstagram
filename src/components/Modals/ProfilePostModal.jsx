import {
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import { useAuthStore } from '../../store/authStore';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import CreatePostForm from './CreatePostForm';
import useDeletePost from '../../hooks/ProfilePost/useDeletePost';
import useGetComments from '../../hooks/Comment/useGetComments';

const ProfilePostModal = ({ isOpen, onClose, post }) => {
  const { user } = useAuthStore();
  const { userProfile } = useUserProfileStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: comments } = useGetComments(post.id);

  const handleEditPost = () => {
    setIsEditModalOpen(true);
    onClose();
  };

  const { deletePost, isDeleting } = useDeletePost(user?.uid);

  const handleDeletePost = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    deletePost(post.id);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: '3xl', md: '5xl' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={'black'} pb={5}>
            <Flex
              gap='4'
              w={{ base: '90%', sm: '70%', md: 'full' }}
              mx={'auto'}
              maxH={'90vh'}
              minH={'50vh'}
            >
              <Flex
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                flex={1.5}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Image src={post.imageURL} alt='profile post' />
              </Flex>
              <Flex
                flex={1}
                flexDir={'column'}
                px={10}
                display={{ base: 'none', md: 'flex' }}
              >
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'} gap={4}>
                    <Avatar
                      src={userProfile.profilePicURL || '/none.jpg'}
                      size={'sm'}
                      name={userProfile.username}
                    />
                    <Text fontWeight={'bold'} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {user?.uid === userProfile.uid && (
                    <Flex gap={4}>
                      <Button
                        size={'sm'}
                        bg={'transparent'}
                        _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
                        borderRadius={4}
                        p={1}
                        onClick={handleEditPost}
                      >
                        <LuPencil size={20} cursor='pointer' />
                      </Button>
                      <Button
                        size={'sm'}
                        bg={'transparent'}
                        _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
                        borderRadius={4}
                        p={1}
                        onClick={handleDeletePost}
                        isLoading={isDeleting}
                      >
                        <MdDelete size={20} cursor='pointer' />
                      </Button>
                    </Flex>
                  )}
                </Flex>
                <Divider my={4} bg={'gray.500'} />
                <Text mb={4}>{post.caption && post.caption}</Text>
                <Divider my={4} bg={'gray.8000'} />
                <VStack
                  w='full'
                  alignItems={'start'}
                  maxH={'350px'}
                  overflowY={'auto'}
                >
                  {comments &&
                    comments.map((comment) => (
                      <Comment key={comment.id} comment={comment} />
                    ))}
                </VStack>
                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <CreatePostForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        postToEdit={post}
      />
    </>
  );
};

export default ProfilePostModal;
