import React, { ButtonHTMLAttributes } from "react";

// import Image from "next/image";

type BtnProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "className"
> & {
  type?: string;
  text: string;
  // fn?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
      //   onClick={stateFn(!state)}
    >
      {type === "add" && (
        <span className="">+</span>
        // <Image
        //   src="/assets/icons/icon-add-task-mobile.svg"
        //   alt="cancel"
        //   width={14.48}
        //   height={14.48}
        // />
      )}
      {text}
    </button>
  );
};

export default Button;
