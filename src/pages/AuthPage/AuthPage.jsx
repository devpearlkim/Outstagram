import { Button, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import ErrorBoundary from '../../components/common/ErrorBoundary';

function AuthPage() {
  throw new Error('어스 에러');

  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Button>안녕하세요 어스페이지입니다</Button>
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
