"use client";

import Board from "@/app/components/Board";
import Header from "@/app/components/Header";
import InvalidURL from "@/app/components/InvalidURL";
import Modal from "@/app/components/Modal";
import { useModal } from "@/app/context/ModalContext";
import { getCurrentBoard } from "@/app/utils/helpers/FindBoard";
// import Modal from "@/app/components/Modal";
// import { FindBoard } from "@/app/utils/helpers/FindBoard";
import { BoardProps } from "@/app/utils/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import BoardModal from "@/app/components/ModalContent/BoardModal";
// import TaskModal from "@/app/components/ModalContent/TaskModal";
// import DeleteModal from "@/app/components/ModalContent/DeleteModal";
// import ViewTask from "@/app/components/ModalContent/ViewTask";
// import Dropdown from "@/app/components/Dropdown";

const Main = () => {
  const [invalidURL, setInvalidURL] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [board, setBoard] = useState<BoardProps | null>(null);
  // const [openModal, setOpenModal] = useState(false);
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
      {openModal && (
        <Modal
          ModalContent={modalValue?.modalContent}
          type={modalValue?.type}
          taskOrBoard={modalValue?.taskOrBoard}
          item={modalValue?.item}
        />
      )}
      {/* {openModal && <Modal ModalContent={BoardModal} type="add" />} */}
      {/* <Modal ModalContent={TaskModal} type="add" /> */}
      {/* <Modal ModalContent={DeleteModal} taskOrBoard="task" name={headerName} /> */}
      {/* {<Modal ModalContent={ViewTask} />} */}

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
