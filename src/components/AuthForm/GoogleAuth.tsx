import { Flex, Image, Text } from '@chakra-ui/react'
import { googleLogin } from '../../firebase/firebase'
import useSignupWithGoogle from '../../hooks/Auth/useSignupWithGoogle'
import useShowToast from '../../hooks/useShowToast'

type GoogleAuthProps = {
  prefix: string
}

export default function GoogleAuth({ prefix }: GoogleAuthProps) {
  const { signupWithGoogle, error } = useSignupWithGoogle()
  const showToast = useShowToast()

  const handleSignupWithGoogle = async (): Promise<void> => {
    try {
      await signupWithGoogle()
    } catch {
      showToast('Error', error, 'error')
    }
  }
  return (
    <>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        onClick={handleSignupWithGoogle}
      >
        <Image
          src="/google.png"
          alt="Google logo"
          w={5}
          onClick={googleLogin}
        />
        <Text mx={2} color={'blue.500'}>
          {prefix} in with Google
        </Text>
      </Flex>
    </>
  )
}
