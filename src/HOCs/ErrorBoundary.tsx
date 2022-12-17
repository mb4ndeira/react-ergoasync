import React from "react";

/**
 * A class component that acts as an error boundary in a React application.
 *
 * When a component within the boundary throws an error, this component will catch it and display a fallback UI.
 *
 * This can help prevent the entire application from crashing when an error occurs.
 */
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
