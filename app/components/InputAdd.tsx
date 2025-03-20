import React, { useState } from "react";
import Image from "next/image";

type InputAddProps = {
  inputCount?: number;
  value: string;
  type: "add" | "edit";
  taskOrBoard: "task" | "board";
};

const InputAdd = ({ inputCount, value, type, taskOrBoard }: InputAddProps) => {
  const [inputText, setInputText] = useState(type === "edit" ? value : "");
  return (
    <div className="col-input-wrapper">
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
      <Image
        className="cursor-pointer"
        src="/assets/icons/icon-cross.svg"
        alt="cancel"
        width={14.48}
        height={14.48}
        onClick={() => setInputText("")}
      />
    </div>
  );
};

export default InputAdd;
