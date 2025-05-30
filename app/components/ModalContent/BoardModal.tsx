"use client";

import { BoardProps } from "@/app/utils/interface";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../Button";
import InputAdd from "../InputAdd";
import { useModal } from "@/app/context/ModalContext";
import { useParams } from "next/navigation";
import { useBoards } from "@/app/context/BoardContext";
import { useToast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
const MAX_BOARD_NAME_LENGTH = 20;

type BoardModalProps = {
  type?: "add" | "edit" | "addColumn";
};
const BoardModal = ({ type }: BoardModalProps) => {
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;
  const { modalRef, closeModal } = useModal();
  const { createNewBoard, editBoard, boards, getCurrentBoard } = useBoards();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentBoard, setCurrentBoard] = useState(getCurrentBoard(`${id}`));
  const [inputErrors, setInputErrors] = useState([""]);
  const [inputValues, setInputValues] = useState(getInitialInputValues);
  const [boardname, setBoardname] = useState<string | undefined>(getBoardName);

  useEffect(() => {
    if (duplicatesExist()) {
      toast({ title: "Columns can't have same name", variant: "destructive" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues]);

  const formValid =
    boardname &&
    boardname.length < MAX_BOARD_NAME_LENGTH &&
    inputValues &&
    inputValues.every(Boolean) &&
    inputErrors.every((err) => !err) &&
    !duplicatesExist() &&
    (type === "addColumn" ? boardname.length > 2 : true);

  function getBoardName() {
    if (type === "edit" || type === "addColumn") {
      return currentBoard?.name;
    } else {
      return "";
    }
  }

  function getInitialInputValues(): string[] | undefined {
    if (type === "edit" || type === "addColumn") {
      if (currentBoard) {
        const columnNames = currentBoard.columns.map((col) => col.name);
        return type === "addColumn" ? [...columnNames, ""] : columnNames;
      }
    } else return [""];
  }

  function duplicatesExist() {
    if (inputValues) {
      const columnValues = inputValues
        .map((val) => val.trim().toLowerCase())
        .filter((val) => val);

      const uniqueValues = new Set(columnValues);

      if (columnValues.length > 1) {
        const bool = [...uniqueValues.values()].length < columnValues.length;

        return bool;
      } else return false;
    }
  }

  function deleteInput(index: number) {
    setInputValues((prev) => prev && prev.filter((_, idx) => idx !== index));
    setInputErrors((prev) => prev.filter((_, idx) => idx !== index));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;

    setInputErrors((prev) => {
      const prevCopy = [...prev];
      prevCopy[index] = "";
      return prevCopy;
    });

    setInputValues((prev) => {
      if (prev) {
        const prevCopy = [...prev];
        prevCopy[index] = value;
        return prevCopy;
      }
    });
  }

  function handleSubmitBoardForm(
    e: FormEvent<HTMLFormElement>,
    type?: "add" | "edit" | "addColumn"
  ) {
    e.preventDefault();
    if (inputValues) {
      const columnValues = inputValues
        .map((val) => val.trim())
        .filter((val) => val);

      if (type === "addColumn") {
        type = "edit";
      }

      if (type === "edit") {
        handleEditBoard(columnValues);
      } else {
        handleAddBoard(columnValues);
      }
    }
  }

  function handleEditBoard(values: string[]) {
    if (boardname) {
      const updatedBoards = boards.map((b) => {
        if (b._id === id) {
          const updatedColumns = values.map((colVal, index) => ({
            _id: b.columns[index]?._id || nanoid(10),
            name: colVal,
            tasks: b.columns[index]?.tasks || []
          }));

          return { ...b, name: boardname, columns: updatedColumns };
        }
        return b;
      });

      editBoard(updatedBoards);

      closeModal();
      toast({ title: "Board edited ✅" });
    }
  }

  function handleAddBoard(values: string[]) {
    if (boardname) {
      const boardObj: Omit<BoardProps, "_id"> = {
        name: boardname
          .split(" ")
          .map(
            (word: string) =>
              word.charAt(0).toUpperCase() +
              word.slice(1, word.length).toLowerCase()
          )
          .join(" "),
        columns: []
      };

      values.map((val) => {
        boardObj.columns.push({
          _id: nanoid(10),
          name: val,
          tasks: []
        });
      });

      createNewBoard(boardObj);
      closeModal();
    }
  }

  function handleAddInput(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e?.preventDefault();

    if (inputValues) {
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
        setInputValues((prev) => prev && [...prev, ""]);
        setInputErrors((prev) => prev && [...prev, ""]);
      }
    }
  }

  return (
    <div className="modal-content-wrapper" ref={modalRef}>
      <h5>{type === "add" ? "Add New Board" : "Edit Board"}</h5>

      <form onSubmit={(e) => handleSubmitBoardForm(e, type)}>
        <div className="form-input-wrapper">
          <label htmlFor="boardName">Name</label>

          <input
            type="text"
            name="boardName"
            id="boardName"
            required
            autoFocus
            value={boardname}
            onChange={(e) => {
              setBoardname(e.target.value);

              if (e.target.value.length > MAX_BOARD_NAME_LENGTH) {
                toast({
                  title: "Board name too long!",
                  description: `Max ${MAX_BOARD_NAME_LENGTH} characters`,
                  variant: "destructive"
                });
              }
            }}
            disabled={type === "addColumn"}
          />
        </div>

        <div>
          <div>
            {" "}
            <label htmlFor="subtasks">Columns</label>
            <div className="all-col-input-container">
              {inputValues &&
                inputValues.map((value, index) => (
                  <InputAdd
                    value={value}
                    type={type === "edit" ? "edit" : "add"}
                    error={inputErrors[index]}
                    key={index}
                    deleteInput={() => deleteInput(index)}
                    onChange={(e) => onChange(e, index)}
                    disabled={
                      currentBoard &&
                      type === "addColumn" &&
                      index <= currentBoard.columns.length - 1
                    }
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
