import React from "react";
import Button from "./Button";

import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import { useBoards } from "../context/BoardContext";
import { useParams } from "next/navigation";

const NoColumn = () => {
  const params = useParams();
  const { id } = params;

  const { handleModalOpen } = useModal();
  const { getCurrentBoard } = useBoards();

  return (
    <div
      className={`h-[100vh] px-4 flex flex-col w-full gap-4 justify-center items-center `}
    >
      <p>This board is empty. Create a new column to get started.</p>
      <Button
        btnClass="primary"
        btnType="button"
        type="add"
        text="Add New Column"
        fn={() =>
          handleModalOpen(
            <BoardModal type="addColumn" />,
            0,
            getCurrentBoard(`${id}`)
          )
        }
      />
    </div>
  );
};

export default NoColumn;
