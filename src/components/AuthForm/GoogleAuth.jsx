import { Flex, Image, Text } from '@chakra-ui/react';
import { googleLogin } from '../../firebase/firebase';

export default function GoogleAuth() {
  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'} cursor={'pointer'}>
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
    </>
  );
}
