import React from "react";
import { SubtaskProps, TaskProps } from "../utils/interface";

type TaskType = { task: TaskProps };

const getCompletedSubtasks = (subtasks: SubtaskProps[]) => {
  const completedSubTasks = subtasks.filter(
    (subtask: SubtaskProps) => subtask.isCompleted
  );
  return completedSubTasks.length;
};

const TaskCard = ({ task }: TaskType) => {
  //   console.log({ task: task.subtasks });

  return (
    <div className="card">
      <h4>{task.title}</h4>{" "}
      <p>
        {getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
