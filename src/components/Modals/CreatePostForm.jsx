import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import {
  Textarea,
  Input,
  Flex,
  Text,
  CloseButton,
  Image,
  Button,
} from '@chakra-ui/react';
import { BsFillImageFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import useShowToast from '../../hooks/useShowToast';
import usePreviewImg from '../../hooks/usePreviewImg';
import useCreatePost from '../../hooks/useCreatePost';
import { useAuthStore } from '../../store/authStore';

const CreatePostForm = ({ isOpen, onClose, postToEdit = {} }) => {
  const [caption, setCaption] = useState('');
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { user } = useAuthStore();
  const { isCreating, createPost } = useCreatePost(user.uid);
  const { isEditing, editPost } = useCreatePost(user.uid);

  // postToEdit으로 editSession인지 확인
  const { id: editId, ...editValues } = postToEdit;
  const isEditSession = Boolean(editId);

  const onSubmit = async () => {
    if (!caption.trim(' ').length) {
      showToast('Error', '내용을 입력해주세요', 'error');
      return;
    }

    if (!selectedFile) {
      showToast('Error', '이미지를 선택해주세요', 'error');
      return;
    }

    if (isEditSession) {
      editPost({ newData: { caption, selectedFile }, id: editId });
    } else createPost({ caption, selectedFile });

    setSelectedFile(null);
    setCaption(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'}>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Textarea
            placeholder='내용 작성'
            defaultValue={postToEdit && postToEdit.caption}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            h={300}
            resize={'none'}
          />

          <Input
            type='file'
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />
          <Flex
            alignItems={'center'}
            onClick={() => imageRef.current.click()}
            cursor={'pointer'}
            mt={4}
            ml={2}
          >
            <BsFillImageFill size={16} />
            <Text fontSize={16} fontWeight={'semibold'} ml={2}>
              이미지 선택
            </Text>
          </Flex>
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
          <Button mr={3} onClick={onSubmit} isLoading={isCreating || isEditing}>
            {isEditSession ? 'Edit' : 'Post'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostForm;
