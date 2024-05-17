import React from "react";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "bg-[#00467F] border border-[#00467F] transition-all transition-ease-in-out duration-250 text-white hover:bg-[white] hover:text-[#00467F]"
    : "bg-[white] text-[#00467F] border border-[#00467F] transition-all transition-ease-in-out duration-250 hover:bg-[#00467F] hover:text-[white]";
  const sizeClass =
    size === "small"
      ? "px-[28px] py-[8px] text-[17.5px]"
      : size === "large"
        ? "px-[60px] py-[16px] text-[27.125px]"
        : "px-[48px] py-[12px] text-[21.7px]";
  return (
    <button
      type="button"
      className={`rounded-full font-[600] ${mode} ${sizeClass}`}
      {...props}
    >
      {label}
    </button>
  );
};
