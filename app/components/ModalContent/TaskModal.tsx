import {
  BoardProps,
  ColumnProps,
  SubtaskProps,
  TaskProps
} from "@/app/utils/interface";
import Button from "../Button";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";
import InputAdd from "../InputAdd";
import { JSX } from "react";
import { boards } from "@/public/assets/data";
import { title } from "process";

const TaskModal = ({ type }: { type: "add" | "edit"; taskItem: TaskProps }) => {
  const allInputs = document.getElementsByName(`${type}`);
  const [inputText, setInputText] = useState("");
  const { modalRef, modalValue } = useModal();
  const params = useParams();
  const { id } = params;

  let errMsgs;

  console.log({ modalValue });

  const getTaskToEdit = (ArrOfColumnsAndTaskItem: [ColumnProps, TaskProps]) => {
    const parentColumn = ArrOfColumnsAndTaskItem[0];
    if (type === "edit") {
      const itemToEdit = ArrOfColumnsAndTaskItem[1];

      console.log({ parentColumn, itemToEdit, time: Date.now() });

      if (itemToEdit?.title) {
        const taskToEditObj = {
          title: itemToEdit.title,
          description: itemToEdit.description,
          status: itemToEdit.status,
          subtasks: []
        };

        const subtasks = itemToEdit.subtasks.map((subtask: SubtaskProps) =>
          taskToEditObj.subtasks.push(subtask)
        );

        return [parentColumn, taskToEditObj];
      }
    }

    if (type === "add") {
      return [parentColumn];
    }
  };

  const [taskToEdit, setTaskToEdit] = useState(
    type === "add"
      ? {
          title: "",
          description: "",
          status: "todo",
          subtasks: []
        }
      : getTaskToEdit(modalValue?.item)[1]
  );

  const [statusList, setStatusList] = useState(
    getTaskToEdit(modalValue?.item)[0].map((col: ColumnProps) => col.name)
  );
  console.log({ taskToEdit });
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
      ? taskToEdit?.subtasks || (
          <InputAdd
            value=""
            inputCount={0}
            type={type}
            taskOrBoard="task"
            key={0}
          />
        )
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
    const newId = Date.now();
    setShouldRender((prev) => [
      ...prev,
      {
        id: newId,
        element: (
          <InputAdd
            value=""
            type={type}
            taskOrBoard="board"
            key={newId}
            inputCount={prev.length}
          />
        )
      }
    ]);
  };

  // const handleOnChange = (e) => {
  //   return setInputText()
  // };

  const handleAddInput = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    [...allInputs].forEach((input, index) => {
      const inputElement = input as HTMLInputElement;
      errMsgs = document.querySelectorAll(".input-error");

      if (inputElement.value === "") {
        input.classList.add("error");
        errMsgs[index].classList.remove("hidden");
      }
    });

    const emptyInputs = [...allInputs].filter((input, idx) => {
      const inputElement = input as HTMLInputElement;
      return inputElement.value === "";
    });

    if (emptyInputs.length < 1) {
      addComponent();
    }
  };

  const handleSubmitTask = (e, type) => {
    e.preventDefault();
    const subtasksValues: string[] = [];
    const parentColumn = modalValue?.item[0];
    const taskToEditItem = modalValue?.item[1];

    console.log({ taskToEdit });

    const subtasksInputValues = [...allInputs].map((input) => {
      const inputElement = input as HTMLInputElement;
      subtasksValues.push(inputElement.value);
    });
    console.log({ parentColumn });

    if (type === "edit") {
      const columnName = taskToEdit?.status;

      const columnToSearch = parentColumn.find(
        (col: ColumnProps) => col.name === columnName
      );

      if (taskToEditItem.status.toLowerCase() !== columnName.toLowerCase()) {
        console.log({
          colstate: "Not the same oooo",
          columnName,
          taskName: taskToEditItem.status
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

        boards.map(
          (board) =>
            board._id === id &&
            board.columns.map(
              (col) =>
                col.name.toLowerCase() === columnName.toLowerCase() &&
                col.tasks.push(taskToAdd) & console.log(col.tasks)
            )
        );

        //DO NEXT: Remove edited item with different status from prev column
      } else {
        boards.map(
          (board) =>
            board._id === id &&
            board.columns.map(
              (col: ColumnProps) =>
                col.name === columnName &&
                col.tasks.map((task: TaskProps) => {
                  if (task.title === taskToEditItem.title) {
                    console.log({
                      taskto: taskToEdit.title,
                      taskfrom: task.title
                    });
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
                })
            )
        );
      }
      console.log({ boards });
    }
  };

  const handleDeleteInput = (id: number) => {
    const indexToRemove = shouldRender.findIndex((item) => item.id === id);

    if (indexToRemove === -1) return; // If not found, do nothing
  };

  console.log({ taskToEdit });

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
                {/* {type === "add" ? ( */}
                <>
                  {shouldRender.map((subtask, index) => (
                    <InputAdd
                      value={type === "edit" ? subtask.title : ""}
                      type={type}
                      taskOrBoard="board"
                      key={index}
                      inputCount={index}
                      // id={component.id}
                      setShouldRender={setShouldRender}
                      shouldRender={shouldRender}
                      // handleDeleteInput={handleDeleteInput}
                    />
                  ))}
                </>
                {/* ) : (
                  taskToEdit?.subtasks.map((subtask, index) => (
                    <InputAdd
                      key={index}
                      inputCount={index}
                      value={subtask.title}
                      type={type}
                      setTaskToEdit={setTaskToEdit}
                      taskToEdit={taskToEdit}
                      subtask={subtask}
                      taskOrBoard="board"
                      setShouldRender={setShouldRender}
                      shouldRender={shouldRender}
                    />
                  )) */}
                {/* )} */}
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
            value={type === "edit" ? taskToEdit?.status.toLowerCase() : ""}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, status: e.target.value })
            }
          >
            <>
              <option value="">Select status</option>
              {statusList.map((status: string, index: number) => (
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
          //   fn={type === "add" ? handleSubmitBoardForm() : editExistingBoard()}
        />
      </form>
    </div>
  );
};

export default TaskModal;
