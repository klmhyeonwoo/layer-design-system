import * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { Slot } from "@radix-ui/react-slot";

import { createContext } from "@layer-lib/react-context";
import { useComposedRef } from "@layer-lib/react-use-composed-ref";
import { useEscapeKeyDown } from "@layer-lib/react-use-escape-key-down";

import { Portal } from "@layer-ui/portal";
import { Presence } from "@layer-ui/presence";

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

interface ModalTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>((props, forwardedRef) => {
  const { asChild, ...triggerProps } = props;
  const context = useModalContext();
  const triggerRef = useComposedRef(forwardedRef, context.triggerRef);
  const Component = asChild ? Slot : "button";

  return (
    <Component
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      data-state={getState(context.open)}
      onClick={composeEventHandlers(context.onOpenToggle, triggerProps.onClick ?? (() => {}))}
      {...triggerProps}
      ref={triggerRef}
    />
  );
});

ModalTrigger.displayName = "ModalTrigger";

interface ModalContentProps extends React.ComponentPropsWithoutRef<"div"> {}

const ModalContentInner = React.forwardRef<HTMLDivElement, ModalContentProps>((props, forwardedRef) => {
  const { autoFocus = true, ...contentProps } = props;
  const context = useModalContext();

  const [focusContainer, setFocusContainer] = React.useState<HTMLElement | null>();
  const previousFocus = React.useRef<HTMLElement | null>(null);

  const ref = useComposedRef(forwardedRef, context.contentRef, (node) => setFocusContainer(node));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !focusContainer) return;

    const [firstFocusable, lastFocusable] = getEdgeTabbable(focusContainer);

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable?.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable?.focus();
    }
  };

  React.useEffect(() => {
    if (!autoFocus) return;
    if (context.open && focusContainer) {
      previousFocus.current = document.activeElement as HTMLElement;
      const [firstTabbable] = getEdgeTabbable(focusContainer);
      firstTabbable?.focus({ preventScroll: true });
    } else {
      previousFocus.current?.focus();
    }
  }, [context.open, focusContainer, autoFocus]);

  useEscapeKeyDown(
    () => {
      context.onOpenToggle();
    },
    focusContainer as unknown as Document,
  );
  return (
    <div
      {...contentProps}
      ref={ref}
      autoFocus={autoFocus}
      id={context.contentId}
      aria-describedby={context.descriptionId}
      aria-labelledby={context.titleId}
      data-state={getState(context.open)}
      onKeyDown={handleKeyDown}
    />
  );
});

ModalContentInner.displayName = "ModalContentInner";

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

function getEdgeTabbable(container: HTMLElement) {
  const walker = createFocusWalker(container);

  let first: HTMLElement | null = null;
  let last: HTMLElement | null = null;

  while (walker.nextNode()) {
    const currentNode = walker.currentNode as HTMLElement;
    if (!isHidden(currentNode, { upTo: container })) {
      if (!first) first = currentNode;
      last = currentNode;
    }
  }
  return [first, last];
}

/**
 *
 * @TODO 함수 분리
 *
 *  잠재적으로 탭 이동이 가능한 후보 요소들의 목록을 반환합니다.
 *
 * 참고: 이것은 단지 근사치일 뿐입니다. 예를 들어 요소가 보이지 않는 경우와 같은 상황은
 * 고려하지 않습니다. 이는 단순히 속성을 읽는 것만으로는 쉽게 해결할 수 없으며,
 * 런타임 지식(계산된 스타일 등)이 필요합니다. 이러한 경우는 별도로 처리합니다.
 *
 * 참조: https://developer.mozilla.org/ko/docs/Web/API/TreeWalker
 * 출처: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
 */
function createFocusWalker(root: HTMLElement) {
  return document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      // `.tabIndex`는 `tabindex` 속성과 동일하지 않습니다. 이는 런타임의 탭 이동 가능성에 대한
      // 이해를 바탕으로 작동하므로, 탭 이동이 가능한 모든 종류의 요소를 자동으로 처리합니다.
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
}

function isHidden(node: HTMLElement, { upTo }: { upTo?: HTMLElement }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== undefined && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement as HTMLElement;
  }
  return false;
}

export { Modal, ModalTrigger, ModalContent, ModalPortal, ModalOverlay };
