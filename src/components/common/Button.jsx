import React from "react";
import { FaSpinner } from "react-icons/fa";

const Button = ({
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText = "Processing...",
  children,
  className = "",
  icon = null,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses = "text-white py-2 px-3 rounded-xl cursor-pointer flex items-center justify-center gap-2";
  const gradientClasses = "bg-gradient-to-r from-primary-light to-primary-dark";
  const hoverClasses = "hover:from-primary-dark hover:to-primary-light transition duration-300";
  const disabledClasses = "disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${gradientClasses} ${hoverClasses} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;