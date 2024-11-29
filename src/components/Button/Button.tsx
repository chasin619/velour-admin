import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link?: string;
  customClasses?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  label,
  link,
  customClasses,
  children,
  onClick,
}: ButtonPropTypes) => {
  return (
    <>
      <Link
        className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses}`}
        href={link ?? ""}
        onClick={onClick}
      >
        {children}
        {label}
      </Link>
    </>
  );
};

export default Button;
