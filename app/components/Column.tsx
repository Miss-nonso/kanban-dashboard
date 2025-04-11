import React, { Fragment } from "react";
import TaskCard from "./TaskCard";
import { ColumnProps } from "../utils/interface";

type ColumnType = { column: ColumnProps };

const Column = ({ column }: ColumnType) => {
  return (
    <div className="column-wrapper">
      {column.tasks.map((task, index) => (
        <Fragment key={index}>
          <TaskCard task={task} />
        </Fragment>
      ))}
    </div>
  );
};

export default Column;
