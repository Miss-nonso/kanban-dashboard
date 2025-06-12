'use client';

import { SubtaskProps, TaskProps } from '../utils/interface';
import { useModal } from '../context/ModalContext';
import ViewTask from './ModalContent/ViewTask';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskCardProps = { task: TaskProps; index: number };

const getCompletedSubtasks = (subtasks: SubtaskProps[]) => {
  const completedSubTasks = subtasks.filter((subtask: SubtaskProps) => subtask.isCompleted);
  return completedSubTasks.length;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { handleModalOpen } = useModal();
  const columnName = task.status;
  const taskId = task._id;

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task._id,
    data: { type: 'Task', task },
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleTaskModalOpen = (taskId: string, columnName?: string) => {
    if (taskId && columnName) {
      handleModalOpen(<ViewTask />, taskId, columnName);
    }
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="card opacity-30"></div>;
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
          handleTaskModalOpen(taskId, columnName);
        }}>
        <h4>{task.title}</h4>{' '}
        <p>
          {getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks
        </p>
      </div>
    </>
  );
};

export default TaskCard;
