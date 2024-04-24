import { Button } from '@chakra-ui/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  // 에러가 있을때마다 이 함수 호출, state 변경
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // LifeCycle
  componentDidCatch(error, info) {
    console.error('ErrorBoundary component caught an error', error, info);
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError && error) {
      return (
        <h2>
          {error.message.toString()}
          잠시 후 다시 시도해주세요.
          <Link to='/'>
            <Button>홈으로 이동하기</Button>
          </Link>
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
