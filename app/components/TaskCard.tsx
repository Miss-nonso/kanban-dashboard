"use client";

import React from "react";
import { ColumnProps, SubtaskProps, TaskProps } from "../utils/interface";
import { useModal } from "../context/ModalContext";
import ViewTask from "./ModalContent/ViewTask";
import { useParams } from "next/navigation";
import { useBoards } from "../context/BoardContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = { task: TaskProps; index: number };

const getCompletedSubtasks = (subtasks: SubtaskProps[]) => {
  const completedSubTasks = subtasks.filter(
    (subtask: SubtaskProps) => subtask.isCompleted
  );
  return completedSubTasks.length;
};

const TaskCard = ({ task, index }: TaskCardProps) => {
  const params = useParams();
  const { id } = params;
  const { handleModalOpen } = useModal();
  const { getCurrentBoard } = useBoards();

  const currentBoard = getCurrentBoard(`${id}`);
  const ColumnsToAddTasksTo = currentBoard?.columns;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task._id, data: { type: "Task", task } });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleTaskModalOpen = (
    index: number,
    task: TaskProps,
    ColumnsToAddTasksTo?: ColumnProps[]
  ) => {
    if (ColumnsToAddTasksTo && task) {
      handleModalOpen(<ViewTask />, index, [ColumnsToAddTasksTo, task]);
    }
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="card opacity-30"></div>
    );
  }

  return (
    <>
      <div
        className="card"
        draggable
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => {
          handleTaskModalOpen(index, task, ColumnsToAddTasksTo);
        }}
      >
        <h4>{task.title}</h4>{" "}
        <p>
          {getCompletedSubtasks(task.subtasks)} of {task.subtasks.length}{" "}
          subtasks
        </p>
      </div>
    </>
  );
};

export default TaskCard;
