import React, { useState } from "react";
import Image from "next/image";

type InputAddProps = {
  inputCount?: number;
  value: string;
  type: "add" | "edit";
  taskOrBoard: "task" | "board";
  // setShouldRender: React.Dispatch<React.SetStateAction<React.ReactElement[]>>;
  // shouldRender?: React.ReactElement[];
  // index?: number;
};

const InputAdd = ({
  inputCount,
  value,
  type,
  // shouldRender,
  // setShouldRender,
  // index,
  taskOrBoard
}: InputAddProps) => {
  const [inputText, setInputText] = useState(type === "edit" ? value : "");
  // const [cancelImgs, setCancelImgs] = useState(
  //   document.querySelectorAll(".cancel-input")
  // );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setInputText(e.target.value);
  };

  // const handleDeleteInput = (e, idx: number) => {
  //   e.preventDefault();

  //   console.log({ target: e.target, idx });
  //   const newRender = shouldRender?.splice(idx, 1);
  //   setShouldRender(shouldRender);
  //   console.log({ shouldRender, newRender });
  // };

  return (
    <div className="col-input-wrapper relative">
      <input
        type="text"
        name={type}
        placeholder={
          taskOrBoard === "task"
            ? inputCount === 0
              ? "e.g. Make coffee"
              : inputCount === 1
              ? "e.g. Drink coffee & smile"
              : ""
            : ""
        }
        value={inputText}
        onChange={(e) => handleOnChange(e)}
      />
      <p className="input-error absolute right-14 text-red-500 text-[14px] hidden">
        Can&apos;t be empty
      </p>

      <button className="cancel-input">
        {" "}
        <Image
          className="cursor-pointer cancel-input"
          src="/assets/icons/icon-cross.svg"
          alt="cancel"
          width={14.48}
          height={14.48}
          // onClick={(e) => handleDeleteInput(e, index)}
        />
      </button>
    </div>
  );
};

export default InputAdd;
