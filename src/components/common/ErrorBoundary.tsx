import { Button } from '@chakra-ui/react'
import { Component, ErrorInfo, ReactElement } from 'react'
import { Link } from 'react-router-dom'

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<
  { children: ReactElement },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  // 에러가 있을때마다 이 함수 호출, state 변경
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  // LifeCycle
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary component caught an error', error, info)
  }

  render() {
    const { hasError, error } = this.state
    if (hasError && error) {
      return (
        <h2>
          {error.message.toString()}
          잠시 후 다시 시도해주세요.
          <Link to="/">
            <Button>홈으로 이동하기</Button>
          </Link>
        </h2>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
