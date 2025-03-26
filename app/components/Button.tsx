import React from "react";
import Image from "next/image";

type BtnProps = {
  type?: string;
  text: string;
  fn?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  state: boolean;
  stateFn: any;
  btnClass: "primary" | "secondary" | "danger";
};

const Button = ({ type, text, state, stateFn, fn, btnClass }: BtnProps) => {
  return (
    <button
      className={`${btnClass} btn ${type !== "add" && "btnLg"}`}
      onClick={(e) => fn && fn(e)}
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
