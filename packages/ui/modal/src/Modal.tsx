import * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { Slot } from "@radix-ui/react-slot";

import { createContext } from "@layer-lib/react-context";
import { Portal } from "@layer-ui/portal";
import { Presence } from "@layer-ui/presence";
import { useComposedRef } from "@layer-lib/react-use-composed-ref";

interface ModalContextType {
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  triggerId: string;
  titleId: string;
  descriptionId: string;
  contentId: string;
  onOpenToggle: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
}

const [ModalProvider, useModalContext] = createContext<ModalContextType>();

const getState = (open: boolean) => {
  return open ? "open" : "closed";
};

interface ModalProps extends React.PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}
const Modal = ({ open: openProp, onOpenChange, children, modal = true }: ModalProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(!!openProp);
  const open = openProp ?? uncontrolledOpen;

  const handleOpenChange = (state: boolean) => {
    if (openProp === undefined) {
      setUncontrolledOpen(state);
    }
    onOpenChange?.(state);
  };

  const handleOpenToggle = React.useCallback(() => {
    handleOpenChange(!open);
  }, [open, handleOpenChange]);

  return (
    <ModalProvider
      modal={modal}
      triggerId={React.useId()}
      contentId={React.useId()}
      titleId={React.useId()}
      descriptionId={React.useId()}
      triggerRef={triggerRef}
      contentRef={contentRef}
      open={open}
      onOpenToggle={handleOpenToggle}
      onOpenChange={handleOpenChange}
    >
      {children}
    </ModalProvider>
  );
};

Modal.displayName = "Modal";

interface ModalTriggerProps extends React.ComponentPropsWithoutRef<"button"> {}

const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>((props, forwaredRef) => {
  const { ...triggerProps } = props;
  const context = useModalContext();
  const triggerRef = useComposedRef(forwaredRef, context.triggerRef);

  return (
    <button
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.triggerId}
      data-state={getState(context.open)}
      onClick={composeEventHandlers(context.onOpenToggle, triggerProps.onClick ?? (() => {}))}
      {...triggerProps}
      ref={triggerRef}
    />
  );
});

ModalTrigger.displayName = "ModalTrigger";

const ModalContentInner = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>((props, forwardedRef) => {
  const { ...contentProps } = props;
  const context = useModalContext();
  const ref = useComposedRef(forwardedRef, context.contentRef);

  return (
    <div
      {...contentProps}
      ref={ref}
      id={context.contentId}
      aria-describedby={context.descriptionId}
      aria-labelledby={context.titleId}
      data-state={getState(context.open)}
    />
  );
});

ModalContentInner.displayName = "ModalContentInner";

interface ModalContentProps extends React.ComponentPropsWithoutRef<"div"> {}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(({ ...contentProps }, forwardedRef) => {
  const context = useModalContext();

  return context.modal ? (
    <ModalPortal>
      <ModalContentInner {...contentProps} ref={forwardedRef} />
    </ModalPortal>
  ) : (
    <Presence present={context.open}>
      <ModalContentInner {...contentProps} ref={forwardedRef} />
    </Presence>
  );
});

ModalContent.displayName = "ModalContent";

interface ModalPortalProps extends React.ComponentPropsWithoutRef<"div"> {}

const ModalPortal = ({ children, ...portalProps }: ModalPortalProps) => {
  const context = useModalContext();
  return React.Children.map(children, (child) => (
    <Presence present={context.open}>
      <Portal {...portalProps}>{child}</Portal>
    </Presence>
  ));
};

ModalPortal.displayName = "ModalPortal";

interface ModalOverlayInnerProps extends React.ComponentPropsWithoutRef<"div"> {}

const ModalOverlayInner = React.forwardRef<HTMLDivElement, ModalOverlayInnerProps>(({ ...overlayProps }, forwardedRef) => {
  const context = useModalContext();
  return (
    <RemoveScroll as={Slot} allowPinchZoom shards={[context.contentRef]}>
      <div
        {...overlayProps}
        ref={forwardedRef}
        data-state={getState(context.open)}
        style={{ pointerEvents: "auto", ...overlayProps.style }}
        onClick={composeEventHandlers(context.onOpenToggle, overlayProps.onClick ?? (() => {}))}
      />
    </RemoveScroll>
  );
});

ModalOverlayInner.displayName = "ModalOverlayInner";

interface ModalOverlayProps extends React.ComponentPropsWithoutRef<"div"> {}

const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(({ ...overlayProps }, forwardedRef) => {
  const context = useModalContext();
  return context.modal ? (
    <Presence present={context.open}>
      <ModalOverlayInner {...overlayProps} ref={forwardedRef} />
    </Presence>
  ) : null;
});

ModalOverlay.displayName = "ModalOverlay";

/**
 * @TODO 이벤트 핸들러 컴포지션 함수 분리
 * @param originalHandler
 * @param handlers
 * @returns
 */
function composeEventHandlers<E>(originalHandler?: (event: E) => void, ...handlers: ((event: E) => void)[]) {
  return function handleEvent(event: E) {
    originalHandler?.(event);
    handlers?.forEach((handler) => {
      if (!(event as unknown as Event).defaultPrevented) {
        return handler?.(event);
      }
    });
  };
}

ModalContent.displayName = "ModalContent";

export { Modal, ModalTrigger, ModalContent, ModalPortal, ModalOverlay };
