import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import usePreviewImg from '../../hooks/image/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useShowToast from '../../hooks/useShowToast';
import { updateFormData } from '../../util/form';
import { checkUsernameExists } from '../../util/validation';

const EditProfile = ({ isOpen, onClose }) => {
  const showToast = useShowToast();
  const { user } = useAuthStore();
  const [formdata, setFormData] = useState({
    username: user.username,
    bio: user.bio,
  });
  const [duplicatedUsername, setDuplicateUsername] = useState(false);

  const { isUpdating, editProfile } = useEditProfile();
  const fileRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => updateFormData(prevFormData, name, value));
  };

  const handleEditProfile = async () => {
    try {
      await editProfile(formdata, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  const handleCheckUsername = async () => {
    // 이미 존재하는 닉네임 && 기존 닉네임 아닐시 경고

    const isExistsUsername = await checkUsernameExists(formdata.username);
    if (isExistsUsername && formdata.username !== user.username) {
      setDuplicateUsername(true);
    } else {
      setDuplicateUsername(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={'black'}
          boxShadow={'xl'}
          border={'1px solid gray'}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Flex bg={'black'}>
              <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={'black'}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar
                        size='xl'
                        src={selectedFile || user.profilePicURL || '/none.jpg'}
                        border={'2px solid white '}
                      />
                    </Center>
                    <Center w='full'>
                      <Button w='full' onClick={() => fileRef.current.click()}>
                        Edit Profile Picture
                      </Button>
                    </Center>
                    <Input
                      type='file'
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>

                <FormControl isInvalid={duplicatedUsername}>
                  <FormLabel fontSize={'sm'}>Username</FormLabel>
                  <Input
                    placeholder={'Username'}
                    size={'sm'}
                    type={'text'}
                    name='username'
                    value={formdata.username}
                    onChange={onChangeInput}
                    onBlur={handleCheckUsername}
                  />
                  {duplicatedUsername && (
                    <FormErrorMessage textColor={'red'}>
                      {`사용중인 닉네임입니다. 다시 입력하세요.`}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Bio</FormLabel>
                  <Input
                    placeholder={'Bio'}
                    size={'sm'}
                    type={'text'}
                    name='bio'
                    value={formdata.bio}
                    onChange={onChangeInput}
                  />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    bg={'red.400'}
                    color={'white'}
                    w='full'
                    size='sm'
                    _hover={{ bg: 'red.500' }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    size='sm'
                    w='full'
                    _hover={{ bg: 'blue.500' }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
