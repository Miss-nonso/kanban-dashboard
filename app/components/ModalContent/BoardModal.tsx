import { createNewBoard } from "@/app/utils/helpers/CreateBoard";
import { BoardProps } from "@/app/utils/interface";
import React, { useState } from "react";
import Button from "../Button";
import InputAdd from "../InputAdd";
import { JSX } from "react";

type BoardModalProps = {
  type: "add" | "edit";
};

const BoardModal = ({ type }: BoardModalProps) => {
  const [shouldRender, setShouldRender] = useState<JSX.Element[]>([
    <InputAdd
      value=""
      inputCount={0}
      type={type}
      taskOrBoard="board"
      key={0}
    />,
    <InputAdd value="" type={type} taskOrBoard="board" key={1} />
  ]);
  const [board, setBoard] = useState<BoardProps>({
    name: "",
    _id: "",
    columns: []
  });

  const handleSubmitBoardForm = () => {
    createNewBoard(board);
  };

  const editExistingBoard = () => {
    console.log("Editing...");
  };

  console.log({ shouldRender });

  const addComponent = () => {
    setShouldRender((prev) => [
      ...prev,
      <InputAdd value="" type={type} taskOrBoard="board" key={0} />
    ]);
  };

  const handleAddInput = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const allInputs = document.getElementsByName(`${type}`);

    const emptyInputs = [...allInputs].filter((input) => {
      const inputElement = input as HTMLInputElement;
      return inputElement.value === "";
    });

    if (emptyInputs.length > 0) {
      emptyInputs.map((input) => {
        input.classList.add("error");
        input.addEventListener("change", () => {
          input.classList.remove("error");
        });
      });
    } else {
      addComponent();
    }
  };

  return (
    <div className="modal-content-wrapper">
      <h5>{type === "add" ? "Add New Board" : "Edit Board"}</h5>

      <form action="" onSubmit={() => handleSubmitBoardForm()}>
        <div className="form-input-wrapper">
          <label htmlFor="boardName">Name</label>
          <input
            type="text"
            name="boardName"
            id="boardName"
            placeholder={type === "add" ? "e.g. Web Design" : ""}
            required
            onChange={(e) => e.target.value}
          />
        </div>

        <div>
          <div>
            {" "}
            <label htmlFor="subtasks">Columns</label>
            <div className="all-col-input-container">
              {type === "add" ? (
                <>
                  {shouldRender.map((component, index) => (
                    //   <Fragment key={index}>{component} </Fragment>
                    <InputAdd
                      value=""
                      type={type}
                      taskOrBoard="board"
                      key={index}
                      inputCount={index}
                    />
                  ))}
                </>
              ) : (
                board.columns.map((col, index) => (
                  <InputAdd
                    key={index}
                    inputCount={index}
                    value={col.name}
                    type={type}
                    taskOrBoard="board"
                  />
                ))
              )}
            </div>
          </div>

          <Button
            type="add"
            text=" Add New Column"
            btnClass="secondary"
            fn={handleAddInput}
          />
        </div>

        <Button
          text={type === "add" ? "Create Board" : "Save Changes"}
          btnClass="primary"
          fn={type === "add" ? handleSubmitBoardForm() : editExistingBoard()}
        />
      </form>
    </div>
  );
};

export default BoardModal;
