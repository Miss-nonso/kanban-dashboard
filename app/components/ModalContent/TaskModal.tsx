import {
  BoardProps,
  ColumnProps,
  SubtaskProps,
  TaskProps
} from "@/app/utils/interface";
import { ItemType } from "@/app/utils/types";
import Button from "../Button";
import React, { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";
import InputAdd from "../InputAdd";
import { JSX } from "react";
import { useBoards } from "@/app/context/BoardContext";

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
  const allInputs = document.getElementsByName(`${type}`);
  // const [inputText, setInputText] = useState("");
  const { modalRef, modalValue, closeModal } = useModal();
  const params = useParams();
  const { id } = params;
  const { editTask, boards } = useBoards();

  let errMsgs;

  const getTaskToEdit = (
    ArrOfColumnsAndTaskItem: [ColumnProps[] | ColumnProps, TaskProps]
  ) => {
    if (Array.isArray(ArrOfColumnsAndTaskItem[0])) {
      // Handle the case where it's an array of ColumnProps
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
      // Handle the case where it's a single ColumnProps
      const parentColumn = ArrOfColumnsAndTaskItem[0];
      return [parentColumn];
    }
  };

  const [taskToEdit, setTaskToEdit] = useState<TaskProps>(() => {
    if (type === "add") {
      return {
        title: "",
        description: "",
        status: "todo",
        subtasks: []
      };
    }

    if (isTaskTuple(modalValue?.item)) {
      const maybeTask = getTaskToEdit(modalValue.item)?.[1];
      if (maybeTask && "title" in maybeTask) {
        return maybeTask as TaskProps;
      }
    }

    return {
      title: "",
      description: "",
      status: "todo",
      subtasks: []
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusList, setStatusList] = useState(() => {
    const currentBoard = boards.find((board: BoardProps) => board._id === id);
    if (currentBoard) {
      return currentBoard.columns.map((column: ColumnProps) => column.name);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [task, setTask] = useState<TaskProps>(
    type === "add"
      ? {
          title: "",
          description: "",
          status: "",
          subtasks: []
        }
      : {
          title: "A title",
          description: "kjijic",
          status: "done",
          subtasks: []
        }
  );

  const [shouldRender, setShouldRender] = useState<JSX.Element[]>(
    type === "edit"
      ? taskToEdit?.subtasks.map((subtask, index) => (
          <InputAdd
            value={subtask.title}
            inputCount={index}
            type={type}
            taskOrBoard="task"
            key={index}
          />
        )) || [
          <InputAdd
            value=""
            inputCount={0}
            type={type}
            taskOrBoard="task"
            key={0}
          />
        ]
      : [
          <InputAdd
            value=""
            inputCount={0}
            type={type}
            taskOrBoard="task"
            key={0}
          />
        ]
  );

  useEffect(() => {
    [...allInputs].forEach((el, index) =>
      el.addEventListener("keydown", () => {
        errMsgs = document.querySelectorAll(".input-error");
        errMsgs[index].classList.add("hidden");
        el.classList.remove("error");
      })
    );
  });

  const addComponent = () => {
    setShouldRender((prev) => [
      ...prev,
      <InputAdd
        value=""
        type={type}
        taskOrBoard="task"
        key={0}
        inputCount={prev.length}
      />
    ]);
  };

  // const handleOnChange = (e) => {
  //   return setInputText()
  // };

  const handleAddInput = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) {
      e.preventDefault();
    }

    [...allInputs].forEach((input, index) => {
      const inputElement = input as HTMLInputElement;
      errMsgs = document.querySelectorAll(".input-error");

      if (inputElement.value === "") {
        input.classList.add("error");
        errMsgs[index].classList.remove("hidden");
      }
    });

    const emptyInputs = [...allInputs].filter((input) => {
      const inputElement = input as HTMLInputElement;
      return inputElement.value === "";
    });

    if (emptyInputs.length < 1) {
      addComponent();
    }
  };

  const handleSubmitTask = (
    e: FormEvent<HTMLFormElement>,
    type: "add" | "edit"
  ) => {
    e.preventDefault();

    let currentColumn: ColumnProps[] = [];
    let taskToEditItem: TaskProps | undefined;

    if (isTaskTuple(modalValue?.item) || isTaskMono(modalValue?.item)) {
      const subtasksValues: string[] = [];

      currentColumn = modalValue?.item[0];
      taskToEditItem = modalValue?.item[1];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const subtasksInputValues = [...allInputs].map((input) => {
        const inputElement = input as HTMLInputElement;
        subtasksValues.push(inputElement.value);
      });

      const taskToAdd = {
        ...taskToEdit
      };

      subtasksValues.map((val, index) => {
        if (index > taskToAdd.subtasks.length - 1) {
          const subtaskData: SubtaskProps = {
            title: val,
            isCompleted: false
          };
          taskToAdd.subtasks.push(subtaskData);
        } else {
          taskToAdd.subtasks[index].title = val;
        }
      });

      if (type === "edit") {
        if (!taskToEditItem.status) {
          taskToEditItem.status = currentColumn[0].name;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const prevColumnName = taskToEditItem.status || currentColumn[0].name;

        const currentColumnName = taskToEdit?.status || currentColumn[0].name;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const columnToSearch = currentColumn.find(
          (col: ColumnProps) => col.name === currentColumnName
        );

        if (
          taskToEditItem.status.toLowerCase() !==
          currentColumnName.toLowerCase()
        ) {
          boards.map(
            (board: BoardProps) =>
              board._id === id &&
              board.columns.map((col) => {
                if (
                  col.name.toLowerCase() === currentColumnName.toLowerCase()
                ) {
                  col.tasks.push(taskToAdd);
                }

                if (col.name.toLowerCase() === prevColumnName.toLowerCase()) {
                  const indexOfTaskToRmv = col.tasks.findIndex(
                    (task) =>
                      task.title.toLowerCase() === prevColumnName.toLowerCase()
                  );

                  return col.tasks.splice(indexOfTaskToRmv, 1);
                }
              })
          );

          editTask(boards);
          closeModal();
        } else {
          boards.map(
            (board: BoardProps) =>
              board._id === id &&
              board.columns.map(
                (col: ColumnProps) =>
                  col.name === currentColumnName &&
                  col.tasks.map((task: TaskProps) => {
                    if (taskToEditItem) {
                      if (task.title === taskToEditItem.title) {
                        task.title = taskToEdit.title;
                        task.description = taskToEdit.description;

                        subtasksValues.map((val, index) => {
                          if (index > task.subtasks.length - 1) {
                            const subtaskData: SubtaskProps = {
                              title: val,
                              isCompleted: false
                            };
                            task.subtasks.push(subtaskData);
                          } else {
                            task.subtasks[index].title = val;
                          }
                        });
                      }
                    }
                  })
              )
          );
          editTask(boards);
          closeModal();
        }
      }

      if (type === "add") {
        boards.map((board: BoardProps) =>
          board.columns.map((col: ColumnProps) =>
            col.name.toLowerCase() === taskToAdd.status.toLowerCase()
              ? col.tasks.push(taskToAdd)
              : col
          )
        );

        editTask(boards);
        closeModal();
      }
    }
  };

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <h5>{type === "add" ? "Add New Task" : "Edit Task"}</h5>

      <form action="" onSubmit={(e) => handleSubmitTask(e, type)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={taskToEdit && taskToEdit.title}
            placeholder={type === "add" ? "e.g. Take coffee break" : ""}
            required
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
            rows={7}
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
              {" "}
              {/* <label htmlFor="subtasks">Columns</label> */}
              <div className="all-col-input-container">
                {shouldRender.map((_, index) => (
                  <InputAdd
                    value={
                      type === "edit" ? taskToEdit.subtasks[index]?.title : ""
                    }
                    type={type}
                    taskOrBoard="task"
                    key={index}
                  />
                ))}
              </div>
              <Button
                type="add"
                text="Add New Subtask"
                btnClass="secondary"
                fn={(e) => handleAddInput(e)}
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
        />
      </form>
    </div>
  );
};

export default TaskModal;
