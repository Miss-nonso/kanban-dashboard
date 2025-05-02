import React, { ButtonHTMLAttributes } from "react";

type BtnProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "className"
> & {
  type?: string;
  text: string;

  fn?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  btnClass: "primary" | "secondary" | "danger";
  btnType: "button" | "submit";
};

const Button = ({ type, text, fn, btnClass, btnType, ...props }: BtnProps) => {
  return (
    <button
      className={`${btnClass} btn ${
        type !== "add" && "btnLg"
      } disabled:opacity-60`}
      onClick={(e) => fn && fn(e)}
      type={btnType}
      {...props}
    >
      {type === "add" && <span className="">+</span>}
      {text}
    </button>
  );
};

export default Button;
