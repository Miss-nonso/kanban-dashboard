import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";

type InputAddProps = {
  inputCount?: number;
  value: string;
  type: "add" | "edit";
  taskOrBoard: "task" | "board";
  setShouldRender: React.Dispatch<React.SetStateAction<React.ReactElement[]>>;
  shouldRender: React.ReactElement[];
};

const InputAdd = ({
  inputCount,
  id,
  value,
  type,
  taskOrBoard,
  setShouldRender,
  shouldRender,
  handleDeleteInput
}: InputAddProps) => {
  const [inputText, setInputText] = useState(type === "edit" ? value : "");
  const [cancelImgs, setCancelImgs] = useState(
    document.querySelectorAll(".cancel-input")
  );

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
        onChange={(e) => setInputText(e.target.value)}
      />
      <p className="input-error absolute right-14 text-red-500 text-[14px] hidden">
        Can&apos;t be empty
      </p>

      <Image
        className="cursor-pointer cancel-input"
        src="/assets/icons/icon-cross.svg"
        alt="cancel"
        width={14.48}
        height={14.48}
        onClick={() => handleDeleteInput(id)}
      />
    </div>
  );
};

export default InputAdd;
