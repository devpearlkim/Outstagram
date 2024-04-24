import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import AuthForm from '../../components/AuthForm/AuthForm';

function AuthPage() {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Flex justify={'center'} alignItems={'center'} gap={10}>
          <Box display={{ base: 'none', md: 'block' }}>
            <Image src='/auth.png' h={350} alt='Diary img' borderRadius={20} />
          </Box>
          <VStack spacing={4} align={'stretch'}>
            <AuthForm />
            <Box textAlign={'center'}>Let your feelings out freely</Box>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

function AuthPageWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <AuthPage />
    </ErrorBoundary>
  );
}

export default AuthPageWithErrorBoundary;
