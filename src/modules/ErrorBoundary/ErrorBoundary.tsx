import {APP_STATUS} from '@constants/app';
import logger from '@utils/logger';
import React, {type ReactNode} from 'react';
import useStoreApp from '@/stores/storeApp';

const log = logger.module('ErrorBoundaryCatcher');

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    log.error('ErrorBoundary caught an error', {error, errorInfo});

    const $app = useStoreApp.getState();
    $app.setStatus(APP_STATUS.error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
