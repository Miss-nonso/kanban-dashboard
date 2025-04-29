"use client";

import Board from "@/app/components/Board";
import Header from "@/app/components/Header";
import InvalidURL from "@/app/components/InvalidURL";
import Loader from "@/app/components/Loader";
import Modal from "@/app/components/Modal";
import NoColumn from "@/app/components/NoColumn";
import Sidebar from "@/app/components/Sidebar";
import { useBoards } from "@/app/context/BoardContext";
import { useModal } from "@/app/context/ModalContext";
import { BoardProps } from "@/app/utils/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const LazyComponent = lazy(() => import("@/app/components/Loader"));

const Main = () => {
  const [invalidURL, setInvalidURL] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [board, setBoard] = useState<BoardProps | null>(null);
  const params = useParams();
  const { id } = params;
  const { openModal, modalValue } = useModal();
  const { getCurrentBoard, boards } = useBoards();
  const { isLoading, setIsLoadingTrue, setIsLoadingFalse } = useBoards();
  const [isClient, setIsClient] = useState(false);

  const extractHeaderName = (board: BoardProps | null) => {
    if (!board) {
      return "";
    }
    return board.name.toString();
  };

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

  useEffect(() => {
    setIsLoadingTrue();
    setTimeout(() => {
      setIsClient(true);
      setIsLoadingFalse();
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {openModal && <Modal ModalContent={modalValue?.modalContent} />}

      {isLoading || !isClient ? (
        <Suspense fallback={<Loader />}>
          <LazyComponent />
        </Suspense>
      ) : invalidURL ? (
        <InvalidURL />
      ) : board?.columns && board?.columns.length > 0 ? (
        <div className="flex flex-1">
          <Sidebar />
          <div className="grid w-full h-full">
            {" "}
            <Header boardName={headerName} />
            <Board columns={board.columns} />
          </div>
        </div>
      ) : (
        <NoColumn />
      )}
    </>
  );
};

export default Main;
