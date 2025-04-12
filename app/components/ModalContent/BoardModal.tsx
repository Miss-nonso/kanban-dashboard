import { createNewBoard } from "@/app/utils/helpers/CreateBoard";
import { BoardProps, ColumnProps } from "@/app/utils/interface";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../Button";
import InputAdd from "../InputAdd";
import { JSX } from "react";
import { useModal } from "@/app/context/ModalContext";
import { boards } from "@/public/assets/data";
import { useParams } from "next/navigation";

type BoardModalProps = {
  type?: "add" | "edit";
};

const BoardModal = ({ type }: BoardModalProps) => {
  const allInputs = document.getElementsByName(`${type}`);
  const params = useParams();
  const { id } = params;
  const { modalValue, modalRef } = useModal();

  const [boardname, setBoardname] = useState<string>(() => {
    if (type === "edit" && modalValue?.item && "name" in modalValue.item) {
      return modalValue.item.name;
    }
    return "";
  });

  let errMsgs;

  const [shouldRender, setShouldRender] = useState<{ element: JSX.Element }[]>(
    () => {
      if (type === "edit" && modalValue?.item && "columns" in modalValue.item) {
        return modalValue.item.columns.map(
          (col: ColumnProps, index: number) => ({
            element: (
              <InputAdd
                value={col.name}
                inputCount={index}
                type={type}
                taskOrBoard="board"
                key={index}
              />
            )
          })
        );
      }

      return [
        {
          element: (
            <InputAdd
              value=""
              inputCount={0}
              type={type === "edit" ? "edit" : "add"}
              taskOrBoard="board"
              key={0}
            />
          )
        }
      ];
    }
  );

  const handleSubmitBoardForm = (
    e: FormEvent<HTMLFormElement>,
    type?: "add" | "edit"
  ) => {
    e.preventDefault();
    const columnValues: string[] = [];
    console.log({ columnValues });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const columnInputValues = [...allInputs].map((input) => {
      const inputElement = input as HTMLInputElement;

      if (inputElement.value) {
        columnValues.push(inputElement.value.trim());
      }
      return columnValues;
    });

    if (type === "edit") {
      const currentBoard = boards.find((board) => board._id === id);
      console.log({ currentBoard });
      if (currentBoard) {
        currentBoard.name = boardname;

        columnValues.map((colVal, index) => {
          if (index > currentBoard.columns.length - 1) {
            const columnData: ColumnProps = {
              name: colVal,
              tasks: []
            };
            currentBoard.columns.push(columnData);
          } else {
            currentBoard.columns[index].name = colVal;
          }
        });
      }
    } else {
      const boardObj: Omit<BoardProps, "_id"> = {
        name: boardname
          .split(" ")
          .map(
            (word: string) =>
              word.charAt(0).toUpperCase() + word.slice(1, word.length)
          )
          .join(" "),
        columns: []
      };

      columnValues.map((columnName) => {
        boardObj.columns.push({
          name: columnName,
          tasks: []
        });
      });

      console.log({ boardObj });
      return createNewBoard(boardObj);
    }
  };

  const addComponent = () => {
    const newId = Date.now();
    setShouldRender((prev) => [
      ...prev,
      {
        id: newId,
        element: (
          <InputAdd
            value=""
            type={type === "edit" ? "edit" : "add"}
            taskOrBoard="board"
            key={newId}
            inputCount={prev.length}
          />
        )
      }
    ]);
  };

  useEffect(() => {
    [...allInputs].forEach((el, index) =>
      el.addEventListener("keydown", () => {
        errMsgs = document.querySelectorAll(".input-error");
        errMsgs[index].classList.add("hidden");
        el.classList.remove("error");
      })
    );
  });

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

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <h5>{type === "add" ? "Add New Board" : "Edit Board"}</h5>

      <form action="" onSubmit={(e) => handleSubmitBoardForm(e, type)}>
        <div className="form-input-wrapper">
          <label htmlFor="boardName">Name</label>
          <input
            type="text"
            name="boardName"
            id="boardName"
            placeholder={type === "add" ? "e.g. Web Design" : ""}
            required
            value={boardname}
            onChange={(e) => setBoardname(e.target.value)}
          />
        </div>

        <div>
          <div>
            {" "}
            <label htmlFor="subtasks">Columns</label>
            <div className="all-col-input-container">
              {modalValue?.item &&
                shouldRender.map((_, index) => (
                  <InputAdd
                    value={
                      type === "edit" &&
                      modalValue?.item &&
                      "columns" in modalValue?.item
                        ? modalValue?.item?.columns[index]?.name
                        : ""
                    }
                    type={type === "edit" ? "edit" : "add"}
                    taskOrBoard="board"
                    key={index}
                  />
                ))}
            </div>
          </div>

          <Button
            type="add"
            text=" Add New Column"
            btnClass="secondary"
            fn={(e) => handleAddInput(e)}
          />
        </div>

        <Button
          text={type === "add" ? "Create Board" : "Save Changes"}
          btnClass="primary"
          // fn={type === "add" ? handleSubmitBoardForm() : editExistingBoard()}
        />
      </form>
    </div>
  );
};

export default BoardModal;
