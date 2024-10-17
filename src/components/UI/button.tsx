import React, { useId } from "react";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, variant, ...rest }) => {
  const variantStyle =
    variant === "secondary"
      ? "bg-secondaryLight text-primaryDark border border-black hover:bg-primaryLight"
      : "";
  return (
    <button className={`custom-button-style ${variantStyle}`} {...rest}>
      {children}
    </button>
  );
};

/** @TODO: Component API should be changed to omogenize it througout the project */
export default Button;

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src?: string;
  icon?: React.ReactElement;
  alt: string;
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  src = "",
  icon,
  alt,
  tooltip,
  ...rest
}) => {
  const tooltipId = "tooltip" + useId();
  return (
    <button
      className="group relative inline-block"
      aria-describedby={tooltip && tooltipId}
      {...rest}
    >
      {icon ? icon : <Image width={24} height={24} src={src} alt={alt} />}
      {tooltip && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute invisible group-hover:visible z-10 w-[120px] bg-black text-white text-center py-1 rounded-lg bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none"
        >
          {tooltip}
        </div>
      )}
    </button>
  );
};
