import React from "react";

const EmptyColumn = () => {
  return (
    <div className="min-h-[75vh] cursor-pointer mt-[3.5rem] my-auto grid place-items-center w-[300px] bg-[var(--contrastGray)] ">
      <p className="flex justify-center items-center text-center">
        <span className="font-bold text-[1.5rem] text-[var(--textcolor)] pb-[0.35rem] pr-[0.1rem]">
          +
        </span>
        New Column
      </p>
    </div>
  );
};

export default EmptyColumn;
