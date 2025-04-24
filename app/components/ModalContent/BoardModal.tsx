"use client";

import { BoardProps, ColumnProps } from "@/app/utils/interface";
import React, { FormEvent, useState } from "react";
import Button from "../Button";
import InputAdd from "../InputAdd";
import { useModal } from "@/app/context/ModalContext";
import { useParams } from "next/navigation";
import { useBoards } from "@/app/context/BoardContext";

type BoardModalProps = {
  type?: "add" | "edit" | "addColumn";
};
const BoardModal = ({ type }: BoardModalProps) => {
  const params = useParams();
  const { id } = params;
  const { modalValue, modalRef, closeModal } = useModal();
  const { createNewBoard, editBoard, boards } = useBoards();
  const [inputErrors, setInputErrors] = useState([""]);
  const [inputValues, setInputValues] = useState(() => {
    if (
      (type === "edit" || type === "addColumn") &&
      modalValue?.item &&
      "columns" in modalValue.item
    ) {
      return modalValue.item.columns.map((col) => col.name);
    } else {
      return [""];
    }
  });

  // FIX EDIT BOARD TO REMOVE COLUMNS THAT ARE REMOVED ON THE FORM
  console.log({ modalValue, type });
  const [boardname, setBoardname] = useState<string>(() => {
    if (
      (type === "edit" || type === "addColumn") &&
      modalValue?.item &&
      "name" in modalValue.item
    ) {
      return modalValue.item.name;
    } else {
      return "";
    }
  });

  console.log(
    inputValues.length >= 1,
    inputValues.every(Boolean),
    inputErrors.every((err) => err === ""),
    boardname.length > 2
  );

  console.log({ inputErrors });

  const formValid =
    inputValues.length >= 1 &&
    inputValues.every(Boolean) &&
    inputErrors.every((err) => !err) &&
    (type === "addColumn" ? boardname.length > 2 : true);

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

  function handleSubmitBoardForm(
    e: FormEvent<HTMLFormElement>,
    type?: "add" | "edit" | "addColumn"
  ) {
    e.preventDefault();
    const columnValues = inputValues.map((val) => val.trim());
    if (type === "addColumn") {
      type = "edit";
    }

    if (type === "edit") {
      const currentBoard = boards.find((board: BoardProps) => board._id === id);

      if (!currentBoard) {
        return;
      }

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

      editBoard(boards);

      closeModal();
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

      createNewBoard(boardObj);
      closeModal();
    }
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

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <h5>{type === "add" ? "Add New Board" : "Edit Board"}</h5>

      <form action="" onSubmit={(e) => handleSubmitBoardForm(e, type)}>
        <div className="form-input-wrapper">
          <label htmlFor="boardName">Name</label>
          {type === "addColumn" ? (
            <input
              type="text"
              name="boardName"
              id="boardName"
              required
              value={boardname}
              onChange={(e) => setBoardname(e.target.value)}
              disabled
            />
          ) : (
            <input
              type="text"
              name="boardName"
              id="boardName"
              placeholder={type === "add" ? "e.g. Web Design" : ""}
              required
              value={boardname}
              onChange={(e) => setBoardname(e.target.value)}
            />
          )}
        </div>

        <div>
          <div>
            {" "}
            <label htmlFor="subtasks">Columns</label>
            <div className="all-col-input-container">
              {modalValue?.item &&
                inputValues.map((value, index) => (
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
          </div>

          <Button
            type="add"
            text=" Add New Column"
            btnClass="secondary"
            fn={(e) => handleAddInput(e)}
            btnType="button"
          />
        </div>

        <Button
          text={type === "add" ? "Create Board" : "Save Changes"}
          btnClass="primary"
          btnType="submit"
          disabled={!formValid}
        />
      </form>
    </div>
  );
};

export default BoardModal;
