import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const base = "w-full cursor-pointer px-4 py-2 rounded-lg font-medium transition ease-in-out duration-150";
  const variantClass =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
      : variant === "secondary"
      ? "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300"
      : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-60";

  return (
    <button
      {...rest}
      disabled={disabled}
      className={`${base} ${variantClass} ${className}`}
      suppressHydrationWarning={true}
    >
      {children}
    </button>
  );
}
