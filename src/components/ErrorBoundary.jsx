import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md glass-card p-8 rounded-3xl border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-2xl">
              ⚠️
            </div>
            <h1 className="text-xl font-bold text-white">Something went wrong</h1>
            <p className="text-xs text-zinc-400">
              The portfolio encountered an unexpected error. Please refresh to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
            >
              Reload Portfolio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
