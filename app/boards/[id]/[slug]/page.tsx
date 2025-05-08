"use client";

import Board from "@/app/components/Board";
import Header from "@/app/components/Header";
import InvalidURL from "@/app/components/InvalidURL";
import Modal from "@/app/components/Modal";
import NoColumn from "@/app/components/NoColumn";
import Sidebar from "@/app/components/Sidebar";
import { useBoards } from "@/app/context/BoardContext";
import { useModal } from "@/app/context/ModalContext";
import { BoardProps, ColumnProps, TaskProps } from "@/app/utils/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";

import SkeletonCard from "@/app/components/Skeleton/SkeletonCard";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import TaskCard from "@/app/components/TaskCard";
import { arrayMove } from "@dnd-kit/sortable";

const LazyComponent = lazy(
  () => import("@/app/components/Skeleton/SkeletonCard")
);

const Main = () => {
  const [invalidURL, setInvalidURL] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [board, setBoard] = useState<BoardProps | null>(null);
  const params = useParams();
  const { id } = params;
  const { openModal, modalValue } = useModal();
  const { getCurrentBoard, boards, editBoard } = useBoards();
  const { isLoading, setIsLoadingTrue, setIsLoadingFalse } = useBoards();
  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);
  const [activeTask, setActiveTask] = useState<TaskProps | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );

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

  function extractHeaderName(board: BoardProps | null) {
    if (!board) {
      return "";
    }
    return board.name.toString();
  }

  function onDragStart(event: DragStartEvent) {
    // if (event.active.data.current?.type === "Column") {
    //   setActiveColumn(event.active.data.current.column);
    //   return;
    // }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    // const isOverAColumn = over.data.current?.type === "Column";

    // console.log({ isOverAColumn: over.data.current });
    if (!isActiveTask) return;

    if (isActiveTask && isOverATask) {
      const currentBoard = getCurrentBoard(`${id}`);

      if (!currentBoard) return;

      const activeColumnItem = currentBoard.columns.find((col) => {
        if (active.data.current) {
          if (active.data.current.task.status.length < 1) {
            return (
              col.name.toLowerCase() ===
              currentBoard.columns[0].name.toLowerCase()
            );
          } else {
            return (
              col.name.toLowerCase() ===
              active.data.current?.task.status.toLowerCase()
            );
          }
        }
      });

      if (!activeColumnItem) return;

      const overColumnItem = currentBoard.columns.find((col) => {
        if (over.data.current?.task) {
          if (over.data.current?.task.status.length < 1) {
            return (
              col.name.toLowerCase() ===
              currentBoard.columns[0].name.toLowerCase()
            );
          } else {
            return (
              col.name.toLowerCase() ===
              over.data.current?.task.status.toLowerCase()
            );
          }
        }
      });

      if (!overColumnItem) return;

      const activeTaskIndex = activeColumnItem.tasks.findIndex(
        (task) => task.title === activeId
      );

      const overTaskIndex = overColumnItem.tasks.findIndex(
        (task) => task.title === overId
      );

      if (active.data.current?.task && over.data.current?.task) {
        const activeStatus =
          active.data.current.task.status.toLowerCase() ||
          currentBoard.columns[0].name.toLowerCase();
        const overStatus =
          over.data.current.task.status.toLowerCase() ||
          currentBoard.columns[0].name.toLowerCase();
        if (activeStatus !== overStatus) {
          console.log({
            activeColumnItem,
            overColumnItem,
            activeTaskIndex,
            overTaskIndex
          });

          activeColumnItem.tasks.splice(activeTaskIndex, 1);
          if (activeTask) {
            activeTask.status = overStatus;
            overColumnItem.tasks.splice(overTaskIndex, 0, activeTask);
          }
        } else {
          const updatedTasks = arrayMove(
            overColumnItem.tasks,
            activeTaskIndex,
            overTaskIndex
          );

          overColumnItem.tasks = updatedTasks;
        }
      }
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { over } = event;
    if (!over) return;
    editBoard(boards);
    // const activeColumnId = active.id;
    // const overColumnId = over.id;

    // if (activeColumnId === overColumnId) return;

    // const currentBoard = getCurrentBoard(`${id}`);

    // if (!currentBoard) return;

    // const activeColumnIndex = currentBoard.columns.findIndex(
    //   (col) => col.name === activeColumnId
    // );

    // if (!activeColumnIndex) return;

    // const overColumnIndex = currentBoard.columns.findIndex(
    //   (col) => col.name === overColumnId
    // );

    // if (!overColumnIndex) return;

    // return arrayMove(currentBoard.columns, activeColumnIndex, overColumnIndex);
  }

  return (
    <>
      {openModal && <Modal ModalContent={modalValue?.modalContent} />}

      {isLoading || !isClient ? (
        <Suspense fallback={<SkeletonCard />}>
          <LazyComponent />
        </Suspense>
      ) : invalidURL ? (
        <InvalidURL />
      ) : board?.columns && board?.columns.length > 0 ? (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex flex-1">
            <Sidebar />
            <div className="grid w-full h-full">
              {" "}
              <Header boardName={headerName} />
              <Board columns={board.columns} />
            </div>
          </div>

          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} index={0} />}
          </DragOverlay>
        </DndContext>
      ) : (
        <NoColumn />
      )}
    </>
  );
};

export default Main;
