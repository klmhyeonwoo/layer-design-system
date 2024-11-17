import { createVar, style, styleVariants } from "@vanilla-extract/css";

const dynamicSize = createVar();

const theme = styleVariants({
  vertical: {
    height: dynamicSize,
  },
  horizontal: {
    width: dynamicSize,
  },
});

export { dynamicSize, theme };
