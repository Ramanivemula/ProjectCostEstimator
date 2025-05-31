import React from "react";
import classNames from "classnames";

export function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none";

  const variants = {
    default: "bg-cyan-600 text-white hover:bg-cyan-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-800",
    link: "text-cyan-600 hover:underline"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
