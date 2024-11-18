import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { theme, dynamicSize } from "./computed.css";

interface SpacingProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "types"> {
  size: number;
  direction?: "vertical" | "horizontal";
}

const Spacing = forwardRef<HTMLDivElement, SpacingProps>(({ size, direction = "vertical", style, ...props }, ref) => {
  const validatedSize = Math.max(0, isNaN(size) ? 0 : size);
  const dynamicStyle = assignInlineVars({
    [dynamicSize]: `${validatedSize}px`,
  }) as CSSProperties;

  return <div ref={ref} style={{ ...dynamicStyle, ...style }} className={theme[direction]} {...props} />;
});

Spacing.displayName = "Spacing";

export { Spacing };
