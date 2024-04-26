import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef, useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const onChangeInput = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const usernameInputRef = useRef(null);
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
      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}>
        Signup
      </Button>
    </>
  );
}
