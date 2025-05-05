import React, { Ref, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBoards } from "../context/BoardContext";
import { useParams } from "next/navigation";
import { useModal } from "../context/ModalContext";
import { BoardProps } from "../utils/interface";
import BoardModal from "./ModalContent/BoardModal";
import Toggle from "./Toggle";

const MobileBoards = ({
  dropdownRef
}: {
  dropdownRef: Ref<HTMLDivElement>;
}) => {
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
      const currentBoard = boards.find((board: BoardProps) => board._id === id);
      handleModalOpen(<BoardModal type="add" />, 0, currentBoard);
    }
  };

  console.log({ dropdownRef });

  return (
    <div ref={dropdownRef} className="mobile-boards-container">
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
  );
};

export default MobileBoards;
