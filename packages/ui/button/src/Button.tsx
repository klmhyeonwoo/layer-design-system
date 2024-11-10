import * as React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <button {...props} ref={ref}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button };

export type { ButtonProps };
