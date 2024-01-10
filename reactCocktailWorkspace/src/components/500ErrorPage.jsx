import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅이나 서버에 에러 보고 등 추가 작업을 수행할 수 있습니다.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>500 Internal Server Error</h1>
          <p>죄송합니다. 서버에서 오류가 발생했습니다.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;