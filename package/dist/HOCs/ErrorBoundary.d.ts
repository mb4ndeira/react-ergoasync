import React from "react";
declare class ErrorBoundary extends React.Component<{
    fallback: React.ReactNode;
    children: React.ReactNode;
}, {
    hasError: boolean;
}> {
    state: {
        hasError: boolean;
        error: null;
    };
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        error: Error;
    };
    render(): React.ReactNode;
}
export default ErrorBoundary;
