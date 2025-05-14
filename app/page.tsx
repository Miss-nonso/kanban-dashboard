"use client";

import { useState, useEffect } from "react";
import Main from "./boards/[id]/[slug]/page";
import { useBoards } from "./context/BoardContext";
import { Suspense, lazy } from "react";
import SkeletonCard from "./components/Skeleton/SkeletonCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [viewBoard, setViewBoard] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { boards, isLoading, setIsLoadingTrue, setIsLoadingFalse } =
    useBoards();

  const LazyComponent = lazy(
    () => import("@/app/components/Skeleton/SkeletonCard")
  );

  useEffect(() => {
    setIsLoadingTrue();

    if (getFromLocalStorage("boards")) {
      handleViewBoard();
    }
    setTimeout(() => {
      setIsClient(true);
      setIsLoadingFalse();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewBoard = () => {
    setViewBoard(true);

    if (boards.length > 0 && isClient) {
      const firstBoardId = boards[0]._id;
      const firstBoardname = boards[0].name.replace(/ /g, "-");

      router.push(`/boards/${firstBoardId}/${firstBoardname}`);
    }
  };

  const getFromLocalStorage = (key: string): boolean => {
    if (typeof window !== "undefined") {
      const JSONBoard = localStorage.getItem(key);
      const storedBoards = JSONBoard ? JSON.parse(JSONBoard) : null;

      return storedBoards === null ? false : true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex h-full ">
      {isLoading || !isClient ? (
        <Suspense fallback={<SkeletonCard />}>
          <LazyComponent />
        </Suspense>
      ) : viewBoard ? (
        <Main />
      ) : (
        <div className="flex flex-col mx-auto gap-8 min-w-[50%] h-full  justify-center align-center">
          <h2 className="text-center text-3xl">Welcome To KANBAN</h2>
          <button
            className="bg-[var(--darkpurple)] p-4 w-1/3 mx-auto"
            onClick={handleViewBoard}
          >
            Get started
          </button>
        </div>
      )}
    </div>
  );
}
