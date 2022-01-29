import React, { PureComponent, ErrorInfo } from "react";

import "./error-boundary.css";

interface IProps {}

interface IState {
  hasError: boolean;
  error?: ErrorInfo;
}

class ErrorBoundary extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    // eslint-disable-next-line no-console
    this.setState({ hasError: true, error: errorInfo });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <h3>Something went wrong!!!</h3>
          <p>{this.state.error?.componentStack}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
