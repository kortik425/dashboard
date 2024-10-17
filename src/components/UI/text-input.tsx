import React, { useId } from "react";
import Image from "next/image";

type TextInputTypes =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "password"
  | "search"
  | "url"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: {
    img: string;
    alt: string;
  };
  iconComponent?: React.ReactElement;
  type?: TextInputTypes;
  label: string;
  isLabelHidden?: boolean;
  containerClassName?: string;
  children?: React.ReactElement;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  children,
  icon,
  iconComponent,
  isLabelHidden = false,
  type = "text",
  containerClassName,
  ...rest
}) => {
  const textId = useId();

  return (
    <div aria-hidden="true" className={containerClassName}>
      <label
        htmlFor={textId}
        className={`${isLabelHidden ? "sr-only" : "stilised-p-500 pl-2"}`}
      >
        {label}
      </label>
      <div
        className="flex h-10 pl-2 rounded-lg bg-white max-w-[100%] border border-black transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 items-center"
        aria-hidden="true"
      >
        {icon && <Image src={icon.img} alt={icon.alt} width={24} height={24} />}
        {iconComponent && iconComponent}
        <input
          {...rest}
          id={textId}
          type={type}
          placeholder={rest.placeholder || label}
          className="flex-grow border-none outline-none m-2"
        />
        {children && children}
      </div>
    </div>
  );
};

export default TextInput;
