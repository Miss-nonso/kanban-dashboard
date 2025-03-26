import { createNewBoard } from "@/app/utils/helpers/CreateBoard";
import { BoardProps } from "@/app/utils/interface";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import InputAdd from "../InputAdd";
import { JSX } from "react";

type BoardModalProps = {
  type: "add" | "edit";
};

const BoardModal = ({ type }: BoardModalProps) => {
  const allInputs = document.getElementsByName(`${type}`);
  let errMsgs;
  const [isError, setIsError] = useState(false);
  // const [shouldRender, setShouldRender] = useState<JSX.Element[]>([
  //   <InputAdd value="" inputCount={0} type={type} taskOrBoard="board" key={0} />
  // ]);

  const [shouldRender, setShouldRender] = useState<
    { id: number; element: JSX.Element }[]
  >([
    {
      id: Date.now(),
      element: (
        <InputAdd
          value=""
          inputCount={0}
          type={type}
          taskOrBoard="board"
          key={0}
        />
      )
    }
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

  const handleDeleteInput = (id: number) => {
    const indexToRemove = shouldRender.findIndex((item) => item.id === id);

    if (indexToRemove === -1) return; // If not found, do nothing

    // Remove the item by restructuring the array
    // setShouldRender((prev) => [
    //   ...prev.slice(0, indexToRemove),
    //   ...prev.slice(indexToRemove + 1)
    // ]);
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
                      id={component.id}
                      setShouldRender={setShouldRender}
                      shouldRender={shouldRender}
                      handleDeleteInput={handleDeleteInput}
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
                    setShouldRender={setShouldRender}
                    shouldRender={shouldRender}
                  />
                ))
              )}
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
          fn={type === "add" ? handleSubmitBoardForm() : editExistingBoard()}
        />
      </form>
    </div>
  );
};

export default BoardModal;
