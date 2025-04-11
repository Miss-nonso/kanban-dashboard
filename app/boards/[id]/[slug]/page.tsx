"use client";

import Board from "@/app/components/Board";
import Header from "@/app/components/Header";
import InvalidURL from "@/app/components/InvalidURL";
import Modal from "@/app/components/Modal";
import { useModal } from "@/app/context/ModalContext";
import { getCurrentBoard } from "@/app/utils/helpers/FindBoard";
import { BoardProps } from "@/app/utils/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Main = () => {
  const [invalidURL, setInvalidURL] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [board, setBoard] = useState<BoardProps | null>(null);
  const params = useParams();
  const { id } = params;
  const { openModal, modalValue } = useModal();

  const extractHeaderName = (board: BoardProps | null) => {
    if (!board) {
      return "";
    }
    return board.name.toString();
  };

  useEffect(() => {
    if (id) {
      const foundBoard = getCurrentBoard(id);
      if (!foundBoard) {
        setInvalidURL(true);
        return;
      }
      setHeaderName(extractHeaderName(foundBoard));
      setBoard(foundBoard);
    }
  }, [id]);

  return (
    <div>
      {openModal && <Modal ModalContent={modalValue?.modalContent} />}

      {!invalidURL && <Header boardName={headerName} />}

      {!invalidURL ? (
        board?.columns ? (
          <Board columns={board.columns} />
        ) : (
          ""
        )
      ) : (
        <InvalidURL />
      )}
    </div>
  );
};

export default Main;
