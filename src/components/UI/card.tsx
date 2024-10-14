import React from "react";

interface CardProps {
  title: string;
  content?: string;
  className: string;
  onClick?: (e: React.MouseEvent) => void;
}

interface CardContainerProps {
  children: React.ReactNode;
  className: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Card: React.FC<CardProps> = ({ title, content, className, ...rest }) => {
  return (
    <CardContainer
      className={`p-4 w-[356px] h-[148px] bg-white rounded-2xl text-left component-shadow ${className}`}
      {...rest}
    >
      <h3>{title}</h3>
      {content && <p>{content}</p>}
    </CardContainer>
  );
};

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  onClick,
  className,
}) => {
  if (!onClick) {
    return <article className={className}>{children}</article>;
  }

  return (
    <button className={className} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default Card;
