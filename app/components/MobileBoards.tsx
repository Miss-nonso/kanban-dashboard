import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBoards } from "../context/BoardContext";
import { useParams } from "next/navigation";
import { useModal } from "../context/ModalContext";
import BoardModal from "./ModalContent/BoardModal";
import Toggle from "./Toggle";

const MobileBoards = () => {
  const { boards } = useBoards();
  const { handleModalOpen } = useModal();
  const params = useParams();
  const { id } = params;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenModal = () => {
    if (boards) {
      handleModalOpen(<BoardModal type="add" />);
    }
  };

  return (
    <>
      <div className="mobile-boards-container">
        <div className="boards-wrapper mobile-boards-wrapper ">
          <ul>
            <h6 className="board-length">
              ALL BOARDS <span>({isClient && boards.length})</span>
            </h6>
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
                    width={20}
                    height={12}
                  />
                  <li>{name}</li>
                </Link>
              ))}
          </ul>
          <button onClick={handleOpenModal}>
            <Image
              src="/assets/icons/purple-icon-board.png"
              alt="purple icon board"
              height={16}
              width={16}
            />

            <span className="text-[var(--darkpurple)] pl-1 flex items-center gap-1">
              <b className="font-extrabold text-xl"> +</b> Create New Board
            </span>
          </button>
        </div>
        <div className="pt-3">
          <Toggle />
        </div>
      </div>
      <div className="dropdown-bg  w-screen h-screen fixed inset-0 z-[9] bg-transparent"></div>
    </>
  );
};

export default MobileBoards;
