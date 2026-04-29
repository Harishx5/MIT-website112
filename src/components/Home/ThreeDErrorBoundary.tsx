
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ThreeDErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('3D Animation Error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('3D Animation Error Details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log('Rendering 3D fallback due to error');
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ThreeDErrorBoundary;
