import * as React from "react";
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
      className={"rt-BaseDialogContent rt-DialogContent"}
    />
  );
});

interface DialogPortalProps extends React.ComponentPropsWithoutRef<"div"> {}

const DialogPortal = ({ children, ...portalProps }: DialogPortalProps) => {
  const context = useModalContext();
  return React.Children.map(children, (child) => (
    <Presence present={context.open}>
      <Portal {...portalProps}>{child}</Portal>
    </Presence>
  ));
};

DialogPortal.displayName = "DialogPortal";

interface ModalContentProps extends React.ComponentPropsWithoutRef<"div"> {}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(({ ...contentProps }, forwardedRef) => {
  const context = useModalContext();

  return context.modal ? (
    <DialogPortal>
      <ModalContentInner {...contentProps} ref={forwardedRef} />
    </DialogPortal>
  ) : (
    <Presence present={context.open}>
      <ModalContentInner {...contentProps} ref={forwardedRef} />
    </Presence>
  );
});

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

export { Modal, ModalTrigger, ModalContent };
