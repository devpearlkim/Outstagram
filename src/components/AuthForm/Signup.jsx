import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { focusInput, updateFormData } from '../../util/form';
import { useNavigate } from 'react-router-dom';
import { checkUsernameExists, isValidPassword } from '../../util/validation';
import useSignupWithEmail from '../../hooks/useSignupWithEmail';
import useShowToast from '../../hooks/useShowToast';

export default function Signup() {
  const nav = useNavigate();
  const { signUpWithEmail, loading, error } = useSignupWithEmail();
  const showToast = useShowToast();
  console.log(loading);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => updateFormData(prevFormData, name, value));
  };

  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const handleSignup = async () => {
    const email = emailInputRef.current.value;
    const password = pwInputRef.current.value;
    const username = usernameInputRef.current.value;

    if (!email) {
      focusInput(emailInputRef);
      showToast('Error', '이메일을 입력해주세요', 'error');

      return;
    }
    if (!username) {
      focusInput(usernameInputRef);
      showToast('Error', '닉네임을 입력해주세요', 'error');
      return;
    }

    if (!password) {
      focusInput(pwInputRef);
      showToast('Error', '비밀번호를 입력해주세요', 'error');
      return;
    }
    if (!isValidPassword(password)) {
      focusInput(pwInputRef);
      showToast(
        'Error',
        '비밀번호는 숫자와 특수문자 포함, 6글자 이상이어야 합니다',
        'error'
      );
      return;
    }

    const duplicatedNickname = await checkUsernameExists(formData.username);
    if (duplicatedNickname) {
      showToast(
        'Error',
        '이미 있는 닉네임입니다. 다른 닉네임을 사용해주세요',
        'error'
      );
      return;
    }
    try {
      await signUpWithEmail(formData);
    } catch {
      showToast('Error', error, 'error');
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
        placeholder='Username'
        fontSize={14}
        type='text'
        name='username'
        value={formData.username}
        onChange={onChangeInput}
        size={'sm'}
        ref={usernameInputRef}
      />
      <InputGroup>
        <Input
          placeholder='Password'
          fontSize={14}
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={formData.password}
          onChange={onChangeInput}
          size={'sm'}
          ref={pwInputRef}
        />
        <InputRightElement h={'full'}>
          <Button
            variant={'gost'}
            size={'sm'}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        w={'full'}
        colorScheme='blue'
        size={'sm'}
        fontSize={14}
        isLoading={loading}
        onClick={handleSignup}
      >
        Signup
      </Button>
    </>
  );
}
