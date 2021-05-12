import { FC } from "react";

interface IconProps {
  className?: string;
  title: string;
}

export const IconWrapper: FC<IconProps> = ({ className, title, children }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 512 512"
    className={className}
  >
    <title>{title}</title>
    {children}
  </svg>
);
