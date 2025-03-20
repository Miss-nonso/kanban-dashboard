import React from "react";
import TaskCard from "./TaskCard";
import { ColumnProps } from "../utils/interface";

type ColumnType = { column: ColumnProps };

const Column = ({ column }: ColumnType) => {
  return (
    <div className="column-wrapper">
      {column.tasks.map((task, index) => (
        <div key={index}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};

export default Column;
