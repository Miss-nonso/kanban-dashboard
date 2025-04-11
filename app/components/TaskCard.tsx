import React from "react";
import { ColumnProps, SubtaskProps, TaskProps } from "../utils/interface";
import { useModal } from "../context/ModalContext";
import ViewTask from "./ModalContent/ViewTask";
import { getCurrentBoard } from "../utils/helpers/FindBoard";
import { useParams } from "next/navigation";

type TaskCardProps = { task: TaskProps };

const getCompletedSubtasks = (subtasks: SubtaskProps[]) => {
  const completedSubTasks = subtasks.filter(
    (subtask: SubtaskProps) => subtask.isCompleted
  );
  return completedSubTasks.length;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const params = useParams();
  const { id } = params;
  const { handleModalOpen } = useModal();
  const currentBoard = getCurrentBoard(id);
  const ColumnsToAddTasksTo = currentBoard?.columns;

  const handleTaskModalOpen = (
    task: TaskProps,
    ColumnsToAddTasksTo?: ColumnProps[]
  ) => {
    if (ColumnsToAddTasksTo && task) {
      handleModalOpen(<ViewTask />, "task", "edit", [
        ColumnsToAddTasksTo,
        task
      ]);
    }
  };

  return (
    <div
      className="card"
      onClick={() => handleTaskModalOpen(task, ColumnsToAddTasksTo)}
    >
      <h4>{task.title}</h4>{" "}
      <p>
        {getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
