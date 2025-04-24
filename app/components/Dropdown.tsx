"use client";
import React from "react";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import TaskModal from "./ModalContent/TaskModal";
import DeleteModal from "./ModalContent/DeleteModal";
import { useParams } from "next/navigation";
import { TaskProps } from "../utils/interface";
import { useBoards } from "../context/BoardContext";

type DropdownProps = {
  taskOrBoard: "task" | "board";
  // fn: () => void;
  setDisplayDropdown: (val: boolean) => void;
  taskItem?: TaskProps;
  taskIndex?: number;
};

const Dropdown = ({
  taskOrBoard,
  setDisplayDropdown,
  taskItem,
  taskIndex
}: DropdownProps) => {
  const { handleModalOpen } = useModal();
  const params = useParams();
  const { id } = params;
  const { getCurrentBoard } = useBoards();
  const currentBoard = getCurrentBoard(`${id}`);

  return (
    <div className="dropdown">
      <ul>
        <li>
          <button
            onClick={() => {
              setDisplayDropdown(false);

              if (taskOrBoard === "task" && id && taskItem) {
                return handleModalOpen(<TaskModal type="edit" />, taskIndex, [
                  getCurrentBoard(`${id}`)?.columns || [],
                  taskItem
                ]);
              }

              if (taskOrBoard === "board" && id) {
                return handleModalOpen(
                  <BoardModal type="edit" />,
                  0,
                  getCurrentBoard(`${id}`)
                );
              }
            }}
          >
            Edit {taskOrBoard === "task" ? "task" : "board"}
          </button>
        </li>
        <li className="delete-list-item">
          <button
            onClick={() => {
              setDisplayDropdown(false);

              if (
                taskOrBoard === "task" &&
                id &&
                currentBoard &&
                // modalValue?.index
                taskItem
              ) {
                handleModalOpen(<DeleteModal taskOrBoard="task" />, taskIndex, [
                  currentBoard,
                  taskItem
                ]);
              }
              if (taskOrBoard === "board" && id) {
                handleModalOpen(
                  <DeleteModal taskOrBoard="board" />,
                  0,
                  getCurrentBoard(`${id}`) || undefined
                );
              }
            }}
          >
            Delete {taskOrBoard === "task" ? "task" : "board"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
