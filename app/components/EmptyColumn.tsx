import React from "react";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import { useParams } from "next/navigation";
import { useBoards } from "../context/BoardContext";

const EmptyColumn = () => {
  const { handleModalOpen } = useModal();
  const { boards } = useBoards();
  const params = useParams();
  const { id } = params;
  const { getCurrentBoard } = useBoards();
  const board = boards.find((board) => board._id === id);

  if (!board) {
    return;
  }
  return (
    <div
      className="min-h-[75vh] cursor-pointer mt-[3.5rem] my-auto grid place-items-center min-w-[270px] bg-[var(--contrastGray)]"
      onClick={() =>
        handleModalOpen(
          <BoardModal type="addColumn" />,
          0,
          getCurrentBoard(`${id}`)
        )
      }
    >
      <p className="flex justify-center items-center text-center group-hover:text-[var(--darkpurple)]">
        <span className="font-bold text-[1.5rem] text-[var(--textcolor)] pb-[0.35rem] pr-[0.1rem]">
          +
        </span>
        New Column
      </p>
    </div>
  );
};

export default EmptyColumn;
