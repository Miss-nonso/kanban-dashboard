"use client";

import {
  BoardProps,
  ColumnProps,
  SubtaskProps,
  TaskProps
} from "@/app/utils/interface";
import { nanoid } from "nanoid";
import { ItemType } from "@/app/utils/types";
import Button from "../Button";
import React, { useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";
import InputAdd from "../InputAdd";
import { useBoards } from "@/app/context/BoardContext";
import { useToast } from "@/hooks/use-toast";

function isTaskTuple(item: ItemType): item is [ColumnProps[], TaskProps] {
  return (
    Array.isArray(item) &&
    item.length === 2 &&
    Array.isArray(item[0]) &&
    typeof item[1] === "object" &&
    "title" in item[1]
  );
}

function isTaskMono(item: ItemType): item is [ColumnProps[], TaskProps] {
  return (
    Array.isArray(item) &&
    item.length === 1 &&
    Array.isArray(item[0]) &&
    typeof item[0] === "object"
  );
}

const TaskModal = ({ type }: { type: "add" | "edit" }) => {
  const { modalRef, modalValue, closeModal } = useModal();
  const { toast } = useToast();
  const params = useParams();
  const { id } = params;
  const { editTask, boards } = useBoards();

  const taskIndex = modalValue?.index;
  const getTaskToEdit = (
    ArrOfColumnsAndTaskItem: [ColumnProps[] | ColumnProps, TaskProps]
  ) => {
    if (Array.isArray(ArrOfColumnsAndTaskItem[0])) {
      const parentColumn = ArrOfColumnsAndTaskItem[0];
      if (type === "edit") {
        const itemToEdit = ArrOfColumnsAndTaskItem[1];

        if (itemToEdit?.title) {
          const taskToEditObj = {
            title: itemToEdit.title,
            description: itemToEdit.description,
            status: itemToEdit.status,
            subtasks: [...itemToEdit.subtasks]
          };
          return [parentColumn, taskToEditObj];
        }
      }
    } else {
      const parentColumn = ArrOfColumnsAndTaskItem[0];
      return [parentColumn];
    }
  };

  const [taskToEdit, setTaskToEdit] = useState<
    TaskProps | Omit<TaskProps, "_id">
  >(() => {
    if (isTaskTuple(modalValue?.item) && type === "edit") {
      const maybeTask = getTaskToEdit(modalValue.item)?.[1];
      if (maybeTask && "title" in maybeTask) {
        return maybeTask as TaskProps;
      } else {
        return {
          _id: "",
          title: "",
          description: "",
          status: "",
          subtasks: []
        };
      }
    } else {
      return {
        title: "",
        description: "",
        status: "",
        subtasks: []
      };
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusList, setStatusList] = useState(() => {
    const currentBoard = boards.find((board: BoardProps) => board._id === id);
    if (currentBoard) {
      return currentBoard.columns.map((column: ColumnProps) => column.name);
    }
  });

  const [inputValues, setInputValues] = useState(() => {
    if (type === "edit" && modalValue?.item) {
      if (taskToEdit) {
        return taskToEdit.subtasks.map((subtask) => subtask.title);
      } else {
        return [""];
      }
    } else {
      return [""];
    }
  });
  const [inputErrors, setInputErrors] = useState([""]);

  const formValid = taskToEdit.title && taskToEdit.status;

  function deleteInput(index: number) {
    if (inputValues.length > 1) {
      setInputValues((prev) => prev.filter((_, idx) => idx !== index));
      setInputErrors((prev) => prev.filter((_, idx) => idx !== index));
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;

    setInputValues((prev) => {
      const prevCopy = [...prev];
      prevCopy[index] = value;
      return prevCopy;
    });
    setInputErrors((prev) => {
      const prevCopy = [...prev];
      prevCopy[index] = "";
      return prevCopy;
    });
  }

  function handleAddInput(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e?.preventDefault();

    inputValues.forEach((input, index) => {
      if (input === "") {
        setInputErrors((prev) => {
          const prevCopy = [...prev];
          prevCopy[index] = "Can't be empty";
          return prevCopy;
        });
      }
    });

    const emptyValueExists = inputValues.some((input) => input === "");

    if (!emptyValueExists) {
      setInputValues((prev) => [...prev, ""]);
      setInputErrors((prev) => [...prev, ""]);
    }
  }

  function handleEditTask(
    prevStateOfTask: TaskProps,
    currentColumn: ColumnProps[],
    subtasksValues: string[]
  ) {
    if (!prevStateOfTask.status) {
      prevStateOfTask.status = currentColumn[0].name;
    }

    const prevColumnName =
      prevStateOfTask.status.toLowerCase() ||
      currentColumn[0].name.toLowerCase();

    const currentColumnName =
      taskToEdit?.status.toLowerCase() || currentColumn[0].name.toLowerCase();

    const subtasks = subtasksValues.map((val, index) => {
      return {
        _id: taskToEdit.subtasks[index]._id,
        title: val.trim(),
        isCompleted: taskToEdit.subtasks[index].isCompleted
      };
    });

    taskToEdit.title = taskToEdit.title.trim();
    taskToEdit.subtasks = subtasks;
    taskToEdit.description = taskToEdit.description.trim();

    const currentBoard = boards.find((board) => board._id === id);

    const column = currentBoard?.columns.find(
      (col) => col.name.toLowerCase() === prevColumnName
    );
    const newColumn = currentBoard?.columns.find(
      (col) => col.name.toLowerCase() === currentColumnName
    );

    if (!column && newColumn && typeof taskIndex === "undefined") {
      return;
    }

    if (typeof taskIndex === "number") {
      const modifiedTask = { ...taskToEdit };

      if ("_id" in modifiedTask) {
        if (prevColumnName !== currentColumnName) {
          column?.tasks.splice(taskIndex, 1);

          newColumn?.tasks.push(modifiedTask);
        } else {
          column?.tasks.splice(taskIndex, 1, modifiedTask);
        }
      }

      editTask(boards);
      closeModal();
      toast({ title: "Task edited" });
    }
  }

  function handleAddTask() {
    const currentBoard = boards.find((board) => board._id === id);

    if (!currentBoard) {
      return;
    }

    taskToEdit.title = taskToEdit.title.trim();
    taskToEdit.description = taskToEdit.description.trim();

    const taskToAdd = { ...taskToEdit, _id: nanoid(10) };
    const columnToAddTask = taskToEdit.status || currentBoard.columns[0].name;

    const column = currentBoard.columns.find(
      (col) => col.name.toLowerCase() === columnToAddTask.toLowerCase()
    );

    if (!column) {
      return;
    }

    column.tasks.push(taskToAdd);
    editTask(boards);
    closeModal();
    toast({ title: "Task added" });

    console.log({ taskToAdd });
  }

  const handleSubmitTask = (
    e: FormEvent<HTMLFormElement>,
    type: "add" | "edit"
  ) => {
    e.preventDefault();

    let currentColumn: ColumnProps[] = [];
    let prevStateOfTask: TaskProps | undefined;

    if (isTaskTuple(modalValue?.item) || isTaskMono(modalValue?.item)) {
      currentColumn = modalValue?.item[0];
      prevStateOfTask = modalValue?.item[1];

      const subtasksValues = inputValues
        .map((val) => val.trim())
        .filter((val) => val);

      subtasksValues.map((val, index) => {
        if (index <= taskToEdit.subtasks.length - 1 && val) {
          taskToEdit.subtasks[index].title = val.trim();
        } else {
          const subtaskData: SubtaskProps = {
            _id: nanoid(),
            title: val.trim(),
            isCompleted: false
          };
          taskToEdit.subtasks.push(subtaskData);
        }
      });

      if (type === "edit") {
        handleEditTask(prevStateOfTask, currentColumn, subtasksValues);
      }
    }

    if (type === "add") {
      handleAddTask();
    }
  };

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <h5>{type === "add" ? "Add New Task" : "Edit Task"}</h5>

      <form onSubmit={(e) => handleSubmitTask(e, type)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={taskToEdit && taskToEdit.title}
            placeholder={type === "add" ? "e.g. Take coffee break" : ""}
            required
            autoFocus
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, title: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            autoCorrect="En"
            placeholder={
              type === "add"
                ? "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little"
                : ""
            }
            value={taskToEdit && taskToEdit.description}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="subtasks">Subtasks</label>

          <div>
            <div>
              <div className="all-col-input-container">
                {inputValues.map((value, index) => (
                  <InputAdd
                    value={value}
                    type={type === "edit" ? "edit" : "add"}
                    error={inputErrors[index]}
                    key={index}
                    deleteInput={() => deleteInput(index)}
                    onChange={(e) => onChange(e, index)}
                  />
                ))}
              </div>
              <Button
                type="add"
                text="Add New Subtask"
                btnClass="secondary"
                fn={(e) => handleAddInput(e)}
                btnType="button"
              />
            </div>
          </div>
        </div>
        <div>
          <select
            name="status"
            id="status"
            value={taskToEdit?.status.toLowerCase()}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, status: e.target.value })
            }
          >
            <>
              <option value="">Select status</option>
              {statusList &&
                statusList.map((status: string, index: number) => (
                  <option key={index} value={status.toLowerCase()}>
                    {status}
                  </option>
                ))}
            </>
          </select>
        </div>

        <Button
          text={type === "add" ? "Create Task" : "Save Changes"}
          btnClass="primary"
          btnType="submit"
          disabled={!formValid}
        />
      </form>
    </div>
  );
};

export default TaskModal;
