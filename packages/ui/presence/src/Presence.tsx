import * as React from "react";
import { useComposedRef } from "@layer-lib/react-use-composed-ref";
interface PresenceProps {
  children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
  present: boolean;
}

const Presence = (props: PresenceProps) => {
  const { present, children } = props;
  const { isPresent, ref: PresentRef } = usePresence(present);
  const child = typeof children === "function" ? children({ present }) : React.Children.only(children);

  const ref = useComposedRef(PresentRef, getElementRef(child));

  return isPresent ? React.cloneElement(child, { ref }) : null;
};

/**
 * @TODO 애니메이션 상태에 따라 마운트 상태 변경하기
 *
 * @param present
 * @returns
 */
function usePresence(present: boolean) {
  const [_, setNode] = React.useState<HTMLElement>();
  const stylesRef = React.useRef<CSSStyleDeclaration>({} as any);
  console.log(stylesRef.current.animationName);

  return {
    isPresent: present,
    ref: React.useCallback((node: HTMLElement) => {
      if (node) stylesRef.current = getComputedStyle(node);
      setNode(node);
    }, []),
  };
}

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }

  // Not DEV
  return element.props.ref || (element as any).ref;
}

export { Presence };
