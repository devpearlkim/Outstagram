import {
  Button,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { updateFormData } from '../../util/form';
import useLogin from '../../hooks/useLogin';
import { resetPassword } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';

export default function Login() {
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signIn, loading } = useLogin();
  const [formData, setFormData] = useState({
    email: 'user@test.com',
    password: 'asdf123!',
  });
  const [resetEmail, setResetEmail] = useState();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => updateFormData(prevFormData, name, value));
  };

  const emailInputRef = useRef(null);
  const pwInputRef = useRef(null);

  const handleLogin = () => {
    signIn(formData);
  };

  const handleResetPW = async () => {
    try {
      await resetPassword(resetEmail);
      showToast('Success', '이메일 발송 완료', 'success');
      setResetEmail('');
      onClose();
    } catch {
      showToast('Error', '잠시 후 시도해주세요', 'error');
    }
  };

  return (
    <>
      <Input
        placeholder='Email'
        fontSize={14}
        type='email'
        name='email'
        value={formData.email}
        onChange={onChangeInput}
        size={'sm'}
        ref={emailInputRef}
      />
      <Input
        placeholder='Password'
        fontSize={14}
        type='password'
        name='password'
        value={formData.password}
        onChange={onChangeInput}
        size={'sm'}
        ref={pwInputRef}
      />
      <Button
        w={'full'}
        colorScheme='blue'
        size={'sm'}
        fontSize={14}
        onClick={handleLogin}
        isLoading={loading}
      >
        Log in
      </Button>
      <Text
        mx={2}
        fontSize={14}
        onClick={onOpen}
        cursor={'pointer'}
        color={'blue.500'}
        fontWeight={'semibold'}
      >
        {'forget password?'}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={'black'}>
          <ModalHeader>비밀번호 재설정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='비밀번호 재설정 링크 발송할 이메일'
              size='sm'
              name='resetEmail'
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(() => e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' onClick={handleResetPW}>
              이메일 전송
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
