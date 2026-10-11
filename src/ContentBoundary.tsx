import { Component, type ReactNode } from "react";

export default class ContentBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="note" role="alert">
          <strong>The chapter could not be loaded.</strong>
          <p>
            The connection may have changed or the site may have been updated.
            Reload to fetch the current version.
          </p>
          <button className="button" onClick={() => window.location.reload()}>
            Reload documentation
          </button>
        </div>
      );
    return this.props.children;
  }
}
