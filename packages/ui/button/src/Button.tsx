import * as React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <button {...props} {...ref}>
      {children}
    </button>
  );
});

export { Button };

export type { ButtonProps };
