"use client";

import React from "react";
import {
  ColumnProps,
  // BoardProps,
  // ColumnProps,
  SubtaskProps,
  TaskProps
} from "../utils/interface";
import { useModal } from "../context/ModalContext";
import ViewTask from "./ModalContent/ViewTask";
import { useParams } from "next/navigation";
import { useBoards } from "../context/BoardContext";
// import { useParams } from "next/navigation";
// import { useBoards } from "../context/BoardContext";

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

  const handleTaskModalOpen = (
    index: number,
    task: TaskProps,
    ColumnsToAddTasksTo?: ColumnProps[]
  ) => {
    if (ColumnsToAddTasksTo && task) {
      handleModalOpen(<ViewTask />, index, [ColumnsToAddTasksTo, task]);
    }
  };

  // const handleDrag = (e, idx) => {
  //   // e.dataTransfer.setData("name", idx);
  //   console.log({ e: e.dataTransfer });
  // };

  return (
    <div
      className="card"
      draggable
      // onDragStart={(e) => handleDrag(e, index)}
      onClick={() => {
        handleTaskModalOpen(index, task, ColumnsToAddTasksTo);
      }}
    >
      <h4>{task.title}</h4>{" "}
      <p>
        {getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
