"use client";

import Logo from "./Logo";
import Link from "next/link";
// import { JSX } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Toggle from "./Toggle";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import { useState } from "react";
import { BoardProps } from "../utils/interface";
import { useBoards } from "../context/BoardContext";

const Sidebar = () => {
  const params = useParams();
  const { id } = params;
  const { handleModalOpen } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savedBoards, setSavedBoards] = useState<BoardProps[]>([]);
  const { boards } = useBoards();

  console.log({ boards });

  // useEffect(() => {
  //   const updateBoards = () => {
  //     const storedData = getFromLocalStorage("boards") || [];
  //     setSavedBoards(storedData);
  //   };

  //   // Listen to both same-tab and other-tab changes
  //   window.addEventListener("boardsUpdated", updateBoards);
  //   window.addEventListener("storage", updateBoards); // optional for other tabs
  //   updateBoards(); // initial load

  //   return () => {
  //     window.removeEventListener("boardsUpdated", updateBoards);
  //     window.removeEventListener("storage", updateBoards);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const storedData = getFromLocalStorage("boards") || [];
  //     setSavedBoards(storedData);
  //   };

  //   window.addEventListener("boardsUpdated", handleStorageChange);
  //   window.addEventListener("storage", handleStorageChange);

  //   handleStorageChange();

  //   return () => {
  //     window.removeEventListener("boardsUpdated", handleStorageChange);
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  console.log({ localStored: boards });
  const handleOpenModal = () => {
    if (boards) {
      const currentBoard = boards.find((board: BoardProps) => board._id === id);
      handleModalOpen(<BoardModal type="add" />, 0, currentBoard);
    }
  };

  return (
    <aside className="sidebar ">
      <div className="logo-wrapper">
        <Logo />
      </div>

      <p className="board-length">
        ALL BOARDS <span>({boards && boards.length})</span>
      </p>

      <div className="boards-wrapper">
        <ul>
          {boards &&
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
          <button>
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
  );
};

export default Sidebar;
