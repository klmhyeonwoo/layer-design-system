import * as React from "react";
function useComposedRef<T>(...refs: React.Ref<T>[]) {
  return React.useCallback(composedRef(...refs), refs);
}

function composedRef<T>(...refs: React.ForwardedRef<T>[]) {
  return (element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    });
  };
}

export { useComposedRef, composedRef };
