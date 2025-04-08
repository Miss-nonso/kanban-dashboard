export interface BoardProps {
  name: string;
  _id: string;
  columns: ColumnProps[] | [];
}

export interface ColumnProps {
  name: string;
  tasks: TaskProps[] | [];
}

export interface TaskProps {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskProps[];
}

export interface SubtaskProps {
  title: string;
  isCompleted: boolean;
}
