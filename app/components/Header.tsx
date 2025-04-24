"use client";

import Image from "next/image";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useState } from "react";
import TaskModal from "./ModalContent/TaskModal";
import { useModal } from "../context/ModalContext";
import { useParams } from "next/navigation";
import { BoardProps } from "../utils/interface";
import { useBoards } from "../context/BoardContext";
import { useSidebar } from "../context/SidebarContext";
type HeaderProps = { boardName: string };

const Header = ({ boardName }: HeaderProps) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const { handleModalOpen } = useModal();
  const params = useParams();
  const { id } = params;
  const { boards } = useBoards();
  const { showSidebar } = useSidebar();

  const handleTaskModalOpen = () => {
    const currentBoard = boards.find((board: BoardProps) => board._id === id);

    const ColumnsToAddTasksTo = currentBoard?.columns;

    if (ColumnsToAddTasksTo) {
      handleModalOpen(<TaskModal type="add" />, 0, [ColumnsToAddTasksTo]);
    }
  };

  return (
    <header className={` ${showSidebar ? "ml-[18.75rem] px-2" : "px-8"}`}>
      <h2 className={`text-[24px] font-bold tracking-[0.045em] `}>
        {boardName}
      </h2>
      <div className="flex items-center gap-4 pr-4">
        <Button
          type="add"
          text="Add New Task"
          fn={handleTaskModalOpen}
          btnClass="primary"
          btnType="button"
        />
        <div className="relative board-option-btn">
          <button onClick={() => setDisplayDropdown(!displayDropdown)}>
            <Image
              src="/assets/icons/icon-vertical-ellipsis.svg"
              alt="options"
              width={4.62}
              height={20}
            />
          </button>

          {displayDropdown && (
            <Dropdown
              taskOrBoard="board"
              setDisplayDropdown={setDisplayDropdown}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
