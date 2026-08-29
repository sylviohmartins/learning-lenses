import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: "primary" | "secondary" | "quiet" | "danger";
  }
>(function Button({ children, variant = "primary", className = "", ...props }, ref) {
  return (
    <button ref={ref} className={`button button--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
});
