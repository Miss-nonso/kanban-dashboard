import React, { useState } from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { useModal } from "@/app/context/ModalContext";
import { ColumnProps, SubtaskProps, TaskProps } from "@/app/utils/interface";
// import { useState } from "react";

const handleEditTask = () => {
  console.log("editing...");
};

const ViewTask = ({ task }: TaskProps) => {
  const { modalValue, modalRef } = useModal();
  console.log({ modalValue: modalValue.item });
  const taskToDisplay = {
    title: modalValue?.item[1]?.title,
    description: modalValue?.item[1].description,
    status: modalValue?.item[1].status,
    subtasks: []
  };

  const subtasks = modalValue?.item[1].subtasks.map((subtask) =>
    taskToDisplay.subtasks.push(subtask)
  );

  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [statusList, setStatusList] = useState(
    modalValue?.item[0].map((col: ColumnProps) => col.name)
  );
  const [status, setStatus] = useState(taskToDisplay.status);

  console.log({ taskToDisplay });

  const getCompleteTasks = () => {
    const completedTasks =
      subtasks &&
      taskToDisplay.subtasks.filter(
        (subtask: SubtaskProps) => subtask.isCompleted
      );

    return completedTasks.length;
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div
      className="modal-content-wrapper"
      id="view-task-content-wrapper"
      ref={modalRef}
    >
      <div className="view-task-modal-header">
        <h5>{taskToDisplay.title}</h5>
        <div className="relative">
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
              taskItem={modalValue?.item[1]}
            />
          )}
        </div>
      </div>
      {taskToDisplay.description && <p>{taskToDisplay.description}</p>}

      <div>
        <label htmlFor="subtasks">
          Subtasks({getCompleteTasks()} of {subtasks.length})
        </label>
        <div>
          {taskToDisplay.subtasks.map(
            (subtask: SubtaskProps, index: number) => (
              <label className="container" key={index}>
                <input type="checkbox" defaultChecked={subtask.isCompleted} />
                <span className="checkmark"></span> <p>{subtask.title}</p>
              </label>
            )
          )}
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

          {statusList.map((columnName: string, index: number) => (
            <option key={index} value={columnName.toLowerCase()}>
              {columnName}
            </option>
          ))}
          {/* <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option> */}
        </select>
      </div>
    </div>
  );
};

export default ViewTask;
