import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../firebase/firebase';
import Login from './Login';
import Signup from './Signup';

const focusInput = (ref) => {
  if (ref.current) {
    ref.current.focus();
  }
};

export default function AuthForm() {
  // const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const emailInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const cpwInputRef = useRef(null);

  const onChangeInput = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleAuth = () => {
  //   if (!formData.email) {
  //     alert('Please fill all the fields');
  //     focusInput(emailInputRef);
  //     return;
  //   }

  //   if (!formData.password) {
  //     alert('Please fill all the fields');
  //     focusInput(pwInputRef);
  //     return;
  //   }

  //   if (!isLogin && !formData.confirmPassword) {
  //     alert('Please fill all the fields');
  //     focusInput(cpwInputRef);
  //     return;
  //   }

  //   // NOTE 로그인, 회원가입 로직
  //   nav('/');
  // };

  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Text fontSize={'2xl'} fontWeight={'bold'} cursor={'pointer'}>
            Outstagram
          </Text>
          {isLogin ? <Login /> : <Signup />}

          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            my={4}
            gap={1}
            w={'full'}
          >
            <Box flex={2} h={'1px'} bg={'gray.400'} />
            <Text mx={1} color={'white'}>
              OR
            </Text>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
          </Flex>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            cursor={'pointer'}
          >
            <Image
              src='/google.png'
              alt='Google logo'
              w={5}
              onClick={googleLogin}
            />
            <Text mx={2} color={'blue.500'}>
              Log in with Google
            </Text>
          </Flex>
        </VStack>
      </Box>

      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Dont't have an accout" : 'Already have an account?'}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={'blue.500'}
            cursor={'pointer'}
          >
            {isLogin ? 'Sign Up' : 'Log in'}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
