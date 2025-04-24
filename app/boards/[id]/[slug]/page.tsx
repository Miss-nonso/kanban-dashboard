"use client";

import Board from "@/app/components/Board";
import Header from "@/app/components/Header";
import InvalidURL from "@/app/components/InvalidURL";
import Modal from "@/app/components/Modal";
import NoColumn from "@/app/components/NoColumn";
import { useBoards } from "@/app/context/BoardContext";
import { useModal } from "@/app/context/ModalContext";

import { BoardProps } from "@/app/utils/interface";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Main = () => {
  const [invalidURL, setInvalidURL] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [board, setBoard] = useState<BoardProps | null>(null);
  // const [isClient, setIsClient] = useState(false);

  const params = useParams();
  const { id } = params;
  const { openModal, modalValue } = useModal();
  const { getCurrentBoard, boards } = useBoards();

  const extractHeaderName = (board: BoardProps | null) => {
    if (!board) {
      return "";
    }
    return board.name.toString();
  };

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    if (id) {
      const foundBoard = getCurrentBoard(`${id}`);

      if (!foundBoard) {
        setInvalidURL(true);
        return;
      }
      setHeaderName(extractHeaderName(foundBoard));
      setBoard(foundBoard);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, boards]);

  return (
    <div>
      {openModal && <Modal ModalContent={modalValue?.modalContent} />}

      {!invalidURL && <Header boardName={headerName} />}

      {!invalidURL ? (
        board?.columns && board?.columns.length > 0 ? (
          <Board columns={board.columns} />
        ) : (
          <NoColumn />
        )
      ) : (
        <InvalidURL />
      )}
    </div>
  );
};

export default Main;
