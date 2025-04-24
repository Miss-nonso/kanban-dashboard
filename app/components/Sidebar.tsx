"use client";

import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Toggle from "./Toggle";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import { useState, useEffect } from "react";
import { BoardProps } from "../utils/interface";
import { useBoards } from "../context/BoardContext";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const params = useParams();
  const { id } = params;
  const { handleModalOpen } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savedBoards, setSavedBoards] = useState<BoardProps[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { boards } = useBoards();
  const { showSidebar, handleSidebar } = useSidebar();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenModal = () => {
    if (boards) {
      const currentBoard = boards.find((board: BoardProps) => board._id === id);
      handleModalOpen(<BoardModal type="add" />, 0, currentBoard);
    }
  };

  return (
    <>
      {showSidebar && (
        <aside className="sidebar ">
          <div className="logo-wrapper">
            <Logo />
          </div>

          <p className="board-length">
            ALL BOARDS <span>({isClient && boards.length})</span>
          </p>

          <div className="boards-wrapper">
            <ul>
              {isClient &&
                boards.map(({ name, _id }: { name: string; _id: string }) => (
                  <Link
                    href={`/boards/${_id}/${name.replace(/ /g, "-")}`}
                    key={_id}
                    className={id === _id ? "active" : ""}
                  >
                    <Image
                      src="/assets/icons/icon-board.svg"
                      alt="board"
                      width={16}
                      height={16}
                    />
                    <li>{name}</li>
                  </Link>
                ))}

              <button onClick={handleOpenModal}>
                <Image
                  src="/assets/icons/icon-board.svg"
                  alt="board"
                  width={16}
                  height={16}
                />
                <span>+ Create New Board</span>
              </button>
            </ul>

            <div>
              <Toggle />
              <button onClick={handleSidebar}>
                <Image
                  src="/assets/icons/icon-hide-sidebar.svg"
                  alt="board"
                  width={16}
                  height={16}
                />
                <span>Hide Sidebar</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
