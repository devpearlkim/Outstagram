import { Flex, Image, Text } from '@chakra-ui/react';
import { googleLogin } from '../../firebase/firebase';
import useSignupWithGoogle from '../../hooks/useSignupWithGoogle';
import useShowToast from '../../hooks/useShowToast';

export default function GoogleAuth({ prefix }) {
  const { signupWithGoogle, error } = useSignupWithGoogle();
  const showToast = useShowToast();

  const handleSignupWithGoogle = async () => {
    try {
      await signupWithGoogle();
    } catch {
      showToast('Error', error, 'error');
    }
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
