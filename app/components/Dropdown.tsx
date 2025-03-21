import React from "react";

type DropdownProps = {
  taskOrBoard: "task" | "board";
  fn: () => void;
};

const Dropdown = ({ taskOrBoard, fn }: DropdownProps) => {
  return (
    <div className="dropdown">
      <ul>
        <li>
          <button onClick={() => fn()}>
            Edit {taskOrBoard === "task" ? "task" : "board"}
          </button>
        </li>
        <li className="delete-list-item">
          <button>Delete {taskOrBoard === "task" ? "task" : "board"}</button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
