"use client";
import React from "react";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import TaskModal from "./ModalContent/TaskModal";
import DeleteModal from "./ModalContent/DeleteModal";
import { getCurrentBoard } from "../utils/helpers/FindBoard";
import { useParams } from "next/navigation";

type DropdownProps = {
  taskOrBoard: "task" | "board";
  fn: () => void;
  setDisplayDropdown: IntrinsicAttributes & DropdownProps;
};

const Dropdown = ({
  taskOrBoard,
  fn,
  setDisplayDropdown,
  taskItem
}: DropdownProps) => {
  const { handleModalOpen, modalValue } = useModal();
  const params = useParams();
  const { id } = params;
  console.log({ taskItemDrop: taskItem });

  return (
    <div className="dropdown">
      <ul>
        <li>
          <button
            onClick={() => {
              setDisplayDropdown(false);
              return taskOrBoard === "task"
                ? handleModalOpen(TaskModal, "edit", "task", [
                    getCurrentBoard(id)?.columns,
                    taskItem
                  ])
                : handleModalOpen(
                    BoardModal,
                    "edit",
                    "board",
                    getCurrentBoard(id)
                  );
            }}
          >
            Edit {taskOrBoard === "task" ? "task" : "board"}
          </button>
        </li>
        <li className="delete-list-item">
          <button
            onClick={() => {
              setDisplayDropdown(false);
              return taskOrBoard === "task"
                ? handleModalOpen(DeleteModal, "task", "task")
                : handleModalOpen(DeleteModal, "task", "board");
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
