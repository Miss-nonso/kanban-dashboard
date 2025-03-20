import React from "react";
import Button from "../Button";

type DeleteModalProps = {
  taskOrBoard: "task" | "board";
  name: string;
};

const DeleteModal = ({ taskOrBoard, name }: DeleteModalProps) => {
  return (
    <div className="modal-content-wrapper delete-modal-content">
      <h5>Delete this {taskOrBoard === "task" ? "task" : "board"}?</h5>

      <p>
        Are you sure you want to delete the ‘{name}’ {taskOrBoard}? This action
        will remove all columns and tasks and cannot be reversed.
      </p>

      <div className="btns-wrapper">
        <Button text="Delete" btnClass="danger" />
        <Button text="Cancel" btnClass="secondary" />
      </div>
    </div>
  );
};

export default DeleteModal;
