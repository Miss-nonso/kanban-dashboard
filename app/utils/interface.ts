export interface BoardProps {
  _id: string;
  name: string;
  columns: ColumnProps[];
}

export interface ColumnProps {
  _id: string;
  name: string;
  tasks: TaskProps[];
}

export interface TaskProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskProps[];
}

export interface SubtaskProps {
  _id: string;
  title: string;
  isCompleted: boolean;
}
