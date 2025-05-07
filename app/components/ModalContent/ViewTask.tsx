import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { useModal } from "@/app/context/ModalContext";
import { ColumnProps, TaskProps } from "@/app/utils/interface";
import { ItemType } from "@/app/utils/types";
import { useBoards } from "@/app/context/BoardContext";
import { useParams } from "next/navigation";

export const isTaskTuple = (
  item: ItemType
): item is [ColumnProps[], TaskProps] =>
  Array.isArray(item) &&
  item.length === 2 &&
  Array.isArray(item[0]) &&
  typeof item[1] === "object";

const ViewTask = () => {
  const { modalValue, modalRef } = useModal();
  const { boards, editBoard } = useBoards();
  const params = useParams();
  const { id } = params;
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [statusList, setStatusList] = useState<string[]>([]);

  const item = modalValue?.item;

  const validTaskTuple = isTaskTuple(item);
  const task = validTaskTuple ? item[1] : null;
  const taskIndex = modalValue?.index;

  const [displayTask, setDisplayTask] = useState(() => {
    if (task) {
      return {
        title: task.title,
        description: task.description,
        status: task.status,
        subtasks: [...task.subtasks]
      };
    } else {
      return {
        title: "",
        description: "",
        status: "",
        subtasks: []
      };
    }
  });

  useEffect(() => {
    const columns = validTaskTuple ? item[0] : [];
    if (validTaskTuple && task) {
      setStatusList(columns.map((col) => col.name));
    }
  }, [task, validTaskTuple, item]);

  useEffect(() => {
    handleTaskChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTask]);

  if (!validTaskTuple || !task) return null;

  const getCompleteTasks = () =>
    displayTask.subtasks.filter((subtask) => subtask.isCompleted).length;

  function handleTaskChange() {
    const board = boards.find((board) => board._id === id);
    const prevStatus =
      task?.status.toLowerCase() || board?.columns[0].name.toLowerCase();

    if (!board) {
      return;
    }

    const column = board.columns.find(
      (col) => col.name.toLowerCase() === prevStatus
    );

    if (!column) {
      return;
    }
    const newColumn = board.columns.find(
      (col) => col.name.toLowerCase() === displayTask.status.toLowerCase()
    );

    if (!newColumn) {
      return;
    }

    if (typeof taskIndex === "number") {
      if (displayTask.status.toLowerCase() === prevStatus) {
        column?.tasks.splice(taskIndex, 1, displayTask);
      } else {
        column.tasks.splice(taskIndex, 1);
        newColumn.tasks.push(displayTask);
      }
    }

    editBoard(boards);
  }

  return (
    <div
      className="modal-content-wrapper"
      id="view-task-modal-wrapper"
      ref={modalRef}
    >
      <div className="view-task-modal-header">
        <h5 className="w-11/12 md:w-full">{displayTask.title}</h5>
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
              taskIndex={taskIndex}
            />
          )}
        </span>
      </div>
      {displayTask.description && (
        <p className="view-task-modal-description whitespace-pre-wrap">
          {displayTask.description}
        </p>
      )}
      <div>
        <label htmlFor="subtasks">
          Subtasks({getCompleteTasks()} of {displayTask.subtasks.length})
        </label>
        <div className="subtasks-items">
          {displayTask.subtasks.map((subtask, index) => (
            <label className="container" key={index}>
              <input
                type="checkbox"
                defaultChecked={subtask.isCompleted}
                onChange={() => {
                  const bool = !subtask.isCompleted;

                  setDisplayTask((prev) => {
                    const prevCopy = { ...prev };
                    prevCopy.subtasks[index].isCompleted = bool;
                    return prevCopy;
                  });
                }}
              />
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
          value={displayTask.status.toLowerCase()}
          onChange={(e) =>
            setDisplayTask((prev) => {
              const prevCopy = { ...prev };
              prevCopy.status = e.target.value;
              return prevCopy;
            })
          }
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
