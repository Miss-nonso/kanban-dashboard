import React from "react";
import Column from "./Column";
import { ColumnProps } from "../utils/interface";
import EmptyColumn from "./EmptyColumn";
import { indicatorColors } from "../lib/lib";

type ColumnPropsType = { columns: ColumnProps[] };

const Board = ({ columns }: ColumnPropsType) => {
  return (
    <div className="board">
      {columns &&
        columns.map(
          (col, index) =>
            col.tasks.length > 0 && (
              <div key={index}>
                <h4 className="uppercase flex items-center gap-2  tracking-[0.27rem] text-[var(--mediumgray)] mb-8 ml-2">
                  <div
                    className="h-[15px] aspect-square rounded-2xl"
                    style={{
                      backgroundColor:
                        index > indicatorColors.length - 1
                          ? indicatorColors[index % indicatorColors.length]
                          : indicatorColors[index]
                    }}
                  ></div>{" "}
                  {col.name} <span>({col.tasks.length})</span>
                </h4>

                <Column column={col} />
              </div>
            )
        )}
      <EmptyColumn />
    </div>
  );
};

export default Board;
