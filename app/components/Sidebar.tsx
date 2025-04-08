"use client";

import Logo from "./Logo";
import { boards } from "../../public/assets/data";
import Link from "next/link";
import { JSX } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Toggle from "./Toggle";
import { useModal } from "../context/ModalContext";
import Modal from "./Modal";
import BoardModal from "./ModalContent/BoardModal";

const Sidebar = () => {
  const params = useParams();
  const { id } = params;
  const { handleModalOpen, modalValue } = useModal();

  const handleOpenModal = () => {
    const currentBoard = boards.find((board) => board._id === id);
    handleModalOpen(BoardModal, "add", "board", currentBoard);
  };

  return (
    <aside className="sidebar ">
      <div className="logo-wrapper">
        <Logo />
      </div>

      <p className="board-length">
        ALL BOARDS <span>({boards.length})</span>
      </p>

      <div className="boards-wrapper">
        <ul>
          {boards.map(({ name, _id }) => (
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
