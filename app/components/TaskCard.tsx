import React from "react";
import { SubtaskProps, TaskProps } from "../utils/interface";
import { useModal } from "../context/ModalContext";
import ViewTask from "./ModalContent/ViewTask";
import { getCurrentBoard } from "../utils/helpers/FindBoard";
import { useParams } from "next/navigation";

type TaskType = { task: TaskProps };

const getCompletedSubtasks = (subtasks: SubtaskProps[]) => {
  const completedSubTasks = subtasks.filter(
    (subtask: SubtaskProps) => subtask.isCompleted
  );
  return completedSubTasks.length;
};

const TaskCard = ({ task }: TaskType) => {
  const params = useParams();
  const { id } = params;
  const { handleModalOpen } = useModal();
  const currentBoard = getCurrentBoard(id);
  const ColumnsToAddTasksTo = currentBoard?.columns;
  return (
    <div
      className="card"
      onClick={() =>
        handleModalOpen(ViewTask, "edit", "task", [ColumnsToAddTasksTo, task])
      }
    >
      <h4>{task.title}</h4>{" "}
      <p>
        {getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
