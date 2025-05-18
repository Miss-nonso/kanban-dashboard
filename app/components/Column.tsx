import React, { useMemo } from "react";
import TaskCard from "./TaskCard";
import { ColumnProps } from "../utils/interface";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ColumnType = { column: ColumnProps };

const Column = ({ column }: ColumnType) => {
  const tasksId = useMemo(() => column.tasks.map((task) => task._id), [column]);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: column._id, data: { type: "Column", column } });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      className="column-wrapper"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <SortableContext
        items={tasksId}
        id=""
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task, index) => (
          <TaskCard task={task} index={index} key={index} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
