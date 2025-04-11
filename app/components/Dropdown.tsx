"use client";
import React from "react";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import TaskModal from "./ModalContent/TaskModal";
import DeleteModal from "./ModalContent/DeleteModal";
import { getCurrentBoard } from "../utils/helpers/FindBoard";
import { useParams } from "next/navigation";
import { TaskProps } from "../utils/interface";

type DropdownProps = {
  taskOrBoard: "task" | "board";
  fn: () => void;
  setDisplayDropdown: (val: boolean) => void;
  taskItem?: TaskProps;
};

const Dropdown = ({
  taskOrBoard,
  // fn,
  setDisplayDropdown,
  taskItem
}: DropdownProps) => {
  const { handleModalOpen } = useModal();
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

              if (taskOrBoard === "task" && id && taskItem) {
                return handleModalOpen(
                  <TaskModal type="edit" />,
                  "task",
                  "edit",
                  [getCurrentBoard(id)?.columns || [], taskItem]
                );
              }

              if (taskOrBoard === "board" && id) {
                return handleModalOpen(
                  <BoardModal type="edit" />,
                  "board",
                  "edit",
                  getCurrentBoard(id) || undefined
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
              return taskOrBoard === "task"
                ? handleModalOpen(
                    <DeleteModal taskOrBoard="task" name="jhdjn" />,
                    "task",
                    "add"
                  )
                : handleModalOpen(
                    <DeleteModal taskOrBoard="board" name="ijisj" />,
                    "board",
                    "add"
                  );
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
