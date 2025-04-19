import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { useModal } from "@/app/context/ModalContext";
import { ColumnProps, TaskProps } from "@/app/utils/interface";
import { ItemType } from "@/app/utils/types";

export const isTaskTuple = (
  item: ItemType
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

  const validTaskTuple = isTaskTuple(item);
  const task = validTaskTuple ? item[1] : null;

  useEffect(() => {
    const columns = validTaskTuple ? item[0] : [];
    if (validTaskTuple && task) {
      setStatusList(columns.map((col) => col.name));
      setStatus(task.status);
    }
  }, [task, validTaskTuple, item]);

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
          {displayDropdown && typeof modalValue?.index === "number" && (
            <Dropdown
              taskOrBoard="task"
              setDisplayDropdown={setDisplayDropdown}
              taskItem={task}
              taskIndex={modalValue?.index}
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
