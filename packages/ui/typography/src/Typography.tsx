import * as React from "react";
type TextTags = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "em" | "small" | "q" | "u";

type ElementType<P = any, Tag extends TextTags = TextTags> =
  | { [K in Tag]: P extends JSX.IntrinsicElements[K] ? K : never }[Tag]
  | React.ComponentType<P>;

type TypographyProps<E extends ElementType> = { as?: E };

type Props<E extends ElementType> = TypographyProps<E> & Omit<React.HTMLAttributes<HTMLElement>, "color" | "as" | "variant">;

const Typography = React.forwardRef(<T extends ElementType>(props: Props<T>, ref: React.ForwardedRef<HTMLElement>) => {
  const { as: Comp = "span", children, ...rest } = props;

  return (
    <Comp {...rest} ref={ref}>
      {children}
    </Comp>
  );
});

Typography.displayName = "Typography";

export { Typography };

export type { TypographyProps };
