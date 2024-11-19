import * as React from "react";
type TextTags = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "em" | "small" | "q" | "u";

type TypographyProps<T extends TextTags = TextTags> = {
  as?: T;
  children: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "color" | "as" | "variant">;

const Typography = React.forwardRef(<T extends TextTags>(props: TypographyProps<T>, ref: React.ForwardedRef<HTMLElement>) => {
  const { as: Comp = "span" as any, children, ...rest } = props;

  return (
    <Comp {...rest} ref={ref}>
      {children}
    </Comp>
  );
});

Typography.displayName = "Typography";

export { Typography };

export type { TypographyProps };
