'use client';

import Board from '@/app/components/Board';
import Header from '@/app/components/Header';
import InvalidURL from '@/app/components/InvalidURL';
import Modal from '@/app/components/Modal';
import Sidebar from '@/app/components/Sidebar';
import { useBoards } from '@/app/context/BoardContext';
import { useModal } from '@/app/context/ModalContext';
import { BoardProps, ColumnProps, TaskProps } from '@/app/utils/interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';

import SkeletonCard from '@/app/components/Skeleton/SkeletonCard';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import TaskCard from '@/app/components/TaskCard';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import NoBoards from '@/app/components/NoBoards';

const LazyComponent = lazy(() => import('@/app/components/Skeleton/SkeletonCard'));

const Main = () => {
  const [invalidURL, setInvalidURL] = useState(false);
  const [board, setBoard] = useState<BoardProps | null>(null);
  const params = useParams();
  const { id } = params;
  const { openModal, modalValue } = useModal();
  const { getCurrentBoard, boards, updateBoard } = useBoards();
  const { isLoading, setIsLoadingTrue, setIsLoadingFalse } = useBoards();
  const [isClient, setIsClient] = useState(false);
  const [, setActiveColumn] = useState<ColumnProps | null>(null);
  const [activeTask, setActiveTask] = useState<TaskProps | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  // const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (id) {
      const foundBoard = getCurrentBoard(`${id}`);

      if (!foundBoard) {
        setInvalidURL(true);
        return;
      }

      setBoard(foundBoard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, boards]);

  useEffect(() => {
    setIsLoadingTrue();

    const timeout = setTimeout(() => {
      setIsClient(true);
      setIsLoadingFalse();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !board) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    console.log({ active, over, board });

    const overContainerId =
      over.data.current?.type === 'Task'
        ? over.data.current?.sortable.containerId
        : over.data.current?.column._id;
    const activeContainerId = active.data.current?.sortable.containerId;

    const columnsCopy = structuredClone(board.columns);
    const overColumnIndex = columnsCopy.findIndex(column => column._id === overContainerId);

    const overColumn = columnsCopy[overColumnIndex];

    if (!overColumn) return;

    if (overContainerId === activeContainerId) {
      const oldIndex = overColumn.tasks.findIndex(item => item?._id === active.id);
      const newIndex = overColumn.tasks.findIndex(item => item?._id === over.id);

      // replace with new array containing the updated positions of the items
      columnsCopy[overColumnIndex].tasks = arrayMove(overColumn.tasks, oldIndex, newIndex);

      updateBoard(board._id, { ...board, columns: columnsCopy });
    } else {
      if (!activeTask) return;

      const activeColumnIndex = columnsCopy.findIndex(column => column._id === activeContainerId);
      const activeColumn = columnsCopy[activeColumnIndex];

      const activeTaskIndex = activeColumn.tasks.findIndex(task => task._id === activeId);
      const overTaskIndex = overColumn.tasks.findIndex(task => task._id === overId);

      activeColumn.tasks.splice(activeTaskIndex, 1);
      overColumn.tasks.splice(Math.max(overTaskIndex, 0), 0, activeTask);

      updateBoard(board._id, { ...board, columns: columnsCopy });
    }

    // if (activeTask && overTask) {
    //   const currentBoard = board;

    //   if (!currentBoard) return;

    //   const activeColumn = currentBoard.columns.find(
    //     col =>
    //       col.name.toLowerCase() ===
    //       (activeTask.status.toLowerCase() || currentBoard.columns[0].name.toLowerCase())
    //   );

    //   if (!activeColumn) return;

    //   const overColumn = currentBoard.columns.find(
    //     col =>
    //       col.name.toLowerCase() ===
    //       (overTask.status.toLowerCase() || currentBoard.columns[0].name.toLowerCase())
    //   );

    //   if (!overColumn) return;

    //   const activeIndex = activeColumn.tasks.findIndex(task => task._id === activeId);

    //   const overIndex = overColumn.tasks.findIndex(task => task._id === overId);

    //   if (activeColumn._id === overColumn._id) {
    //     const updatedTasks = arrayMove(overColumn.tasks, activeIndex, overIndex);

    //     overColumn.tasks = updatedTasks;
    //   } else {
    //     const activeColumnTasks = [...activeColumn.tasks];
    //     const overColumnTasks = [...overColumn.tasks];

    //     activeColumnTasks.splice(activeIndex, 1);
    //     activeTask.status = overColumn.name;
    //     overColumnTasks.splice(overIndex, 0, activeTask);

    //     activeColumn.tasks = activeColumnTasks;
    //     overColumn.tasks = overColumnTasks;
    //   }
    // } else if (activeTask && over.data.current?.column) {
    //   const overColumn = over.data.current?.column;
    //   const currentBoard = board;

    //   if (!currentBoard) return;

    //   const prevColumn = currentBoard.columns.find(
    //     col =>
    //       col.name.toLowerCase() ===
    //       (activeTask.status.toLowerCase() || currentBoard.columns[0].name.toLowerCase())
    //   );

    //   if (!prevColumn) return;

    //   const activeTaskIndex = prevColumn.tasks.findIndex(task => task._id === activeId);

    //   const newColumn = currentBoard.columns.find(col => col.name === overColumn.name);

    //   if (!newColumn) return;

    //   const overColumnTasks = newColumn.tasks;
    //   const prevColumnTasks = prevColumn.tasks;

    //   prevColumnTasks.splice(activeTaskIndex, 1);
    //   activeTask.status = newColumn.name;
    //   overColumnTasks.push(activeTask);

    //   newColumn.tasks = overColumnTasks;
    // }

    // editBoard(boards);
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
      ) : boards.length > 0 && board ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}>
          <div className="flex flex-1">
            <Sidebar />
            <div className="grid w-full h-full">
              {' '}
              <Header boardName={board.name} />
              <Board columns={board.columns} />
            </div>
          </div>

          <DragOverlay>{activeTask && <TaskCard task={activeTask} index={0} />}</DragOverlay>
        </DndContext>
      ) : (
        <NoBoards />
      )}
    </>
  );
};

export default Main;
