import * as React from "react";
import * as ReactDOM from "react-dom";

interface PortalProps extends React.ComponentProps<"div"> {
  container?: Element | DocumentFragment | null;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  React.useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || (mounted && globalThis?.document?.body);
  return container ? ReactDOM.createPortal(<div {...portalProps} ref={forwardedRef} />, container) : null;
});

export { Portal };
export type { PortalProps };
