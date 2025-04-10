import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { useModal } from "@/app/context/ModalContext";
import { BoardProps, ColumnProps, TaskProps } from "@/app/utils/interface";

const handleEditTask = () => {
  console.log("editing...");
};

export const isTaskTuple = (
  item:
    | TaskProps
    | BoardProps
    | [ColumnProps[]]
    | [ColumnProps[], TaskProps]
    | undefined
): item is [ColumnProps[], TaskProps] =>
  Array.isArray(item) &&
  item.length === 2 &&
  Array.isArray(item[0]) &&
  typeof item[1] === "object";

const ViewTask = () => {
  const { modalValue, modalRef } = useModal();
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [statusList, setStatusList] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const item = modalValue?.item;

  // Move the task destructuring and useEffect inside the component body
  // but protect against null/invalid values
  const validTaskTuple = isTaskTuple(item);
  const task = validTaskTuple ? item[1] : null;

  useEffect(() => {
    const columns = validTaskTuple ? item[0] : [];
    if (validTaskTuple && task) {
      setStatusList(columns.map((col) => col.name));
      setStatus(task.status);
    }
  }, [task, validTaskTuple, item]);

  // Return early if no valid task
  if (!validTaskTuple || !task) return null;

  const taskToDisplay = {
    title: task.title,
    description: task.description,
    status: task.status,
    subtasks: [...task.subtasks]
  };

  const getCompleteTasks = () =>
    taskToDisplay.subtasks.filter((subtask) => subtask.isCompleted).length;

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <div className="view-task-modal-header">
        <h5>{taskToDisplay.title}</h5>
        <span className="">
          <button
            onClick={() => setDisplayDropdown(!displayDropdown)}
            className="task-option-btn"
          >
            <Image
              src="/assets/icons/icon-vertical-ellipsis.svg"
              alt="options"
              width={4.62}
              height={20}
            />
          </button>
          {displayDropdown && (
            <Dropdown
              taskOrBoard="task"
              fn={handleEditTask}
              setDisplayDropdown={setDisplayDropdown}
              taskItem={task}
            />
          )}
        </span>
      </div>
      {taskToDisplay.description && <p>{taskToDisplay.description}</p>}
      <div>
        <label htmlFor="subtasks">
          Subtasks({getCompleteTasks()} of {taskToDisplay.subtasks.length})
        </label>
        <div>
          {taskToDisplay.subtasks.map((subtask, index) => (
            <label className="container" key={index}>
              <input type="checkbox" defaultChecked={subtask.isCompleted} />
              <span className="checkmark"></span> <p>{subtask.title}</p>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="status">Current status</label>
        <select
          name="status"
          id="status"
          value={status.toLowerCase()}
          // onChange={handleStatusChange}
        >
          <option value="">Select status</option>
          {statusList.map((columnName, index) => (
            <option key={index} value={columnName.toLowerCase()}>
              {columnName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ViewTask;
