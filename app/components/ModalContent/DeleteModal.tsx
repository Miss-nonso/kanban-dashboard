"use client";

import React from "react";
import Button from "../Button";
import { useModal } from "@/app/context/ModalContext";
import { DeleteModalProps } from "@/app/utils/types";
import { useBoards } from "@/app/context/BoardContext";
import { useParams } from "next/navigation";

const DeleteModal = ({ taskOrBoard }: DeleteModalProps) => {
  const params = useParams();
  const { id } = params;
  const { modalRef, modalValue, closeModal } = useModal();
  const { deleteBoard, deleteTask, getCurrentBoard } = useBoards();
  const itemId = modalValue?.itemId;
  const item = modalValue?.item;

  const currentBoard = getCurrentBoard(`${id}`);

  const itemName = getItemName();

  function getItemName() {
    if (taskOrBoard === "task" && item && itemId && typeof item === "string") {
      const column = currentBoard?.columns.find(
        (col) => col.name.toLowerCase() === item.toLowerCase()
      );

      if (!column) return;

      const task = column?.tasks.find((task) => task._id === itemId);

      return task?.title;
    } else {
      return currentBoard?.name;
    }
  }

  const handleDeleteItem = () => {
    if (taskOrBoard === "task") {
      if (item && typeof item === "string" && itemId) {
        const board = currentBoard;
        if (!board) return;

        const currentColumnName = item.toLowerCase();
        deleteTask(itemId, currentBoard._id, currentColumnName);
        closeModal();
      }
    }

    if (taskOrBoard === "board" && currentBoard) {
      deleteBoard(currentBoard?._id);
      closeModal();
    }
  };
  return (
    <div className="modal-content-wrapper delete-modal-content" ref={modalRef}>
      <h5>Delete this {taskOrBoard === "task" ? "task" : "board"}?</h5>

      <p>
        Are you sure you want to delete the{" "}
        <span className="font-extrabold">&apos;{itemName}&apos; </span>
        {taskOrBoard}? This action will remove all columns and tasks and cannot
        be reversed.
      </p>

      <div className="btns-wrapper">
        <Button
          text="Delete"
          btnClass="danger"
          fn={handleDeleteItem}
          btnType="button"
        />
        <Button
          text="Cancel"
          btnClass="secondary"
          fn={closeModal}
          btnType="button"
        />
      </div>
    </div>
  );
};

export default DeleteModal;
