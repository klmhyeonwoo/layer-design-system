import * as React from "react";
import { useBrowserLayoutEffect } from "@layer-lib/react-use-browser-layout-effect";

export const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  useBrowserLayoutEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
