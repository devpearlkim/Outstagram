import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { BsFillImageFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePostStore } from '../../store/postStore';
import usePreviewImg from '../../hooks/usePreviewImg';
import { useUserProfileStore } from '../../store/userProfileStore';
import useShowToast from '../../hooks/useShowToast';
import { useLocation } from 'react-router-dom';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { LuPlusSquare } from 'react-icons/lu';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState('');
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption('');
      setSelectedFile(null);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={'Create'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}
        >
          <LuPlusSquare size={25} />
          <Box display={{ base: 'none', md: 'block' }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />

        <ModalContent bg={'black'} border={'1px solid gray'}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder='Post caption'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type='file'
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: '15px',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
              size={16}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={'full'}
                position={'relative'}
                justifyContent={'center'}
              >
                <Image src={selectedFile} alt='선택한 이미지파일' />
                <CloseButton
                  position={'absolute'}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { createPost } = usePostStore();
  const { addPost } = useUserProfileStore();
  const { userProfile } = useUserProfileStore();
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) {
      showToast('Error', '이미지를 선택해주세요', 'error');
      return;
    }
    setIsLoading(true);

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: user.uid,
    };

    try {
      // posts에 newPost추가, postRef 가져오기
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      const userDocRef = doc(firestore, 'users', user.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      // 유저Ref에서 posts배열에 postDocRef.id추가
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      // postDocRef에 이미지URL추가
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageURL: downloadURL });

      // newPost객체에도 이미지URL추가
      newPost.imageURL = downloadURL;

      if (userProfile.uid === user.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== '/' && userProfile.uid === user.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast('Success', '포스트 추가 성공', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error', '포스트 추가 실패, 잠시 후 시도해주세요', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
