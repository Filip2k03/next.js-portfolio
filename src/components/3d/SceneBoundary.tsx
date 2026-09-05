'use client';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered instead of the failed subtree; omit to render nothing and let the DOM fallback show. */
  fallback?: ReactNode;
}

/** A WebGL or asset failure must never take the page down; the static composition underneath stays. */
export class SceneBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
