import { useCallbackRef } from "@layer-lib/react-use-callback-ref";
import React from "react";

const useEscapeKeyDown = (onEscapeKeyDown?: (event: KeyboardEvent) => void, ownerDocument: Document = globalThis?.document ?? document) => {
  const onEscapeKeyDownRef = useCallbackRef(onEscapeKeyDown);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeKeyDownRef?.(event);
      }
    };

    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [onEscapeKeyDown, ownerDocument]);
};

export { useEscapeKeyDown };
