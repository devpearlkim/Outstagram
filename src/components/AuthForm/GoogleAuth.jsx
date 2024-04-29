import { Flex, Image, Text } from '@chakra-ui/react';
import { googleLogin } from '../../firebase/firebase';
import useSignupWithGoogle from '../../hooks/useSignupWithGoogle';

export default function GoogleAuth({ prefix }) {
  const { signupWithGoogle, loading, error } = useSignupWithGoogle();
  const handleSignupWithGoogle = () => {
    signupWithGoogle();
  };
  return (
    <>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        onClick={handleSignupWithGoogle}
      >
        <Image
          src='/google.png'
          alt='Google logo'
          w={5}
          onClick={googleLogin}
        />
        <Text mx={2} color={'blue.500'}>
          {prefix} in with Google
        </Text>
      </Flex>
    </>
  );
}
