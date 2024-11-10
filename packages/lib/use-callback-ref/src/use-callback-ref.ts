import React from "react";

const useCallbackRef = <CallbackType extends (...args: any[]) => any>(callback?: CallbackType) => {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as CallbackType, []);
};

export { useCallbackRef };
