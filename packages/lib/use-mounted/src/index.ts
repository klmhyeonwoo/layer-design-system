import * as React from "react";
import { useBrowserLayoutEffect } from "../../use-browser-layout-effect/src";

export const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  useBrowserLayoutEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
