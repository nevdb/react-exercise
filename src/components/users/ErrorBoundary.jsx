import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return (
        <p className="mx-auto mt-4 w-full max-w-3xl rounded-xl border border-rose-300/40 bg-rose-950/40 px-4 py-3 text-sm text-rose-100">
          Something went wrong!
        </p>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
