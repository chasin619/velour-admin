import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  link?: string;
  customClasses?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  props?: any;
}

const Button = ({
  label,
  link,
  customClasses,
  children,
  onClick,
  ...props
}: ButtonPropTypes) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses}`}
    >
      {link ? (
        <Link href={link}>
          {children}
          {label}
        </Link>
      ) : (
        <>
          {children}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
