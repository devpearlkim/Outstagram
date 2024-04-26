import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

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
          <GoogleAuth />
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
