import { TaskProps, BoardProps, ColumnProps } from "./interface";

export type DeleteModalProps = {
  taskOrBoard: "task" | "board";
};

export type ItemType =
  | TaskProps
  | BoardProps
  | [BoardProps, TaskProps]
  | [ColumnProps[]]
  | [ColumnProps[], TaskProps]
  | [string, TaskProps]
  | [ColumnProps[], number]
  | undefined;
