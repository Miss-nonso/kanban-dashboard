import { TaskProps, BoardProps, ColumnProps } from './interface';

export type DeleteModalProps = {
  taskOrBoard: 'task' | 'board';
};

export type ItemType = TaskProps | BoardProps | string | ColumnProps[] | undefined;
