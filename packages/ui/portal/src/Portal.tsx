import * as React from "react";
import * as ReactDOM from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { useMounted } from "@layer-lib/react-use-mounted";

const PortalPrimitive = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div"> & { asChild?: boolean }>((props, forwardedRef) => {
  const { asChild, ...portalProps } = props;
  const Component = asChild ? Slot : "div";

  return <Component {...portalProps} ref={forwardedRef} />;
});

PortalPrimitive.displayName = "PortalPrimitive";

interface PortalProps extends React.ComponentProps<"div"> {
  container?: Element | DocumentFragment | null;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const mounted = useMounted();

  const container = containerProp || (mounted && globalThis?.document?.body);
  return container ? ReactDOM.createPortal(<PortalPrimitive asChild {...portalProps} ref={forwardedRef} />, container) : null;
});

export { Portal };
export type { PortalProps };
