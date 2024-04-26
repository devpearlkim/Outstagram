import { Button, Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { updateFormData } from '../../util/form';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => updateFormData(prevFormData, name, value));
  };

  const emailInputRef = useRef(null);
  const pwInputRef = useRef(null);
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
      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}>
        Log in
      </Button>
    </>
  );
}
