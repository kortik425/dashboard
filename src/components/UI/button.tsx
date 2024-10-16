import React, { useId } from "react";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({}) => {
  return <div></div>;
};

export default Button;

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  src,
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
      <Image width={24} height={24} src={src} alt={alt} />
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
