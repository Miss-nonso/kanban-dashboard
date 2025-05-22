import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { useModal } from "@/app/context/ModalContext";
import { TaskProps } from "@/app/utils/interface";
import { useBoards } from "@/app/context/BoardContext";
import { useParams } from "next/navigation";

const ViewTask = () => {
  const { modalValue, modalRef } = useModal();
  const { boards, editBoard, getCurrentBoard } = useBoards();
  const params = useParams();
  const { id } = params;
  const [displayDropdown, setDisplayDropdown] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusList, setStatusList] = useState<string[] | undefined>(
    getStatuslist
  );
  const [task, setTask] = useState<TaskProps | undefined>(extractTask);

  const taskId = modalValue?.itemId;

  function getStatuslist() {
    const currentBoard = getCurrentBoard(`${id}`);
    if (!currentBoard) return;
    return currentBoard.columns.map((col) => col.name);
  }

  function extractTask() {
    const columnName = modalValue?.item;
    const taskId = modalValue?.itemId;
    const currentBoard = getCurrentBoard(`${id}`);

    if (!currentBoard) return;

    if (typeof columnName === "string") {
      const column = currentBoard?.columns.find(
        (col) => col.name.toLowerCase() === columnName.toLowerCase()
      );

      if (!column) return;

      const currentTask = column.tasks.find((task) => task._id === taskId);

      if (!currentTask) return;

      return currentTask;
    }
  }

  useEffect(() => {
    handleTaskChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task && task.status]);

  if (!task) return;

  const getCompleteTasks = () =>
    task.subtasks.filter((subtask) => subtask.isCompleted).length;

  function handleTaskChange() {
    if (!task) return;
    const board = boards.find((board) => board._id === id);
    const prevStatus =
      extractTask()?.status.toLowerCase() ||
      task?.status.toLowerCase() ||
      board?.columns[0].name.toLowerCase();

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
      (col) => col.name.toLowerCase() === task?.status.toLowerCase()
    );

    if (!newColumn) {
      return;
    }

    if (task?.status.toLowerCase() === prevStatus) {
      const updatedTasks = column.tasks.map((taskItem) => {
        if (taskItem._id === taskId) {
          return { ...task };
        } else return taskItem;
      });

      column.tasks = updatedTasks;
    } else {
      const prevTasks = column.tasks;
      const curTasks = newColumn.tasks;
      const taskIndex = prevTasks.findIndex((task) => task._id === taskId);

      prevTasks.splice(taskIndex, 1);

      curTasks.push(task);
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
        <h5 className="w-10/12 md:w-11/12">{task.title}</h5>
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
          {displayDropdown && typeof modalValue && (
            <Dropdown
              taskOrBoard="task"
              setDisplayDropdown={setDisplayDropdown}
              taskItem={task}
              taskId={task._id}
            />
          )}
        </span>
      </div>
      {task.description && (
        <p className="view-task-modal-description whitespace-pre-wrap">
          {task.description}
        </p>
      )}
      <div>
        <label htmlFor="subtasks">
          Subtasks({getCompleteTasks()} of {task.subtasks.length})
        </label>
        <div className="subtasks-items">
          {task.subtasks.map((subtask, index) => (
            <label className="container" key={index}>
              <input
                type="checkbox"
                defaultChecked={subtask.isCompleted}
                onChange={() => {
                  const bool = !subtask.isCompleted;

                  setTask((prev) => {
                    if (prev) {
                      const prevCopy = { ...prev };
                      prevCopy.subtasks[index].isCompleted = bool;
                      return prevCopy;
                    }
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
          value={task.status.toLowerCase()}
          onChange={(e) =>
            setTask((prev) => {
              if (prev) {
                const prevCopy = { ...prev };
                prevCopy.status = e.target.value;
                return prevCopy;
              }
            })
          }
        >
          {statusList &&
            statusList.map((columnName, index) => (
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
