"use client";

import React from "react";
import Button from "../Button";
import { useModal } from "@/app/context/ModalContext";
// import boards from "@/public/assets/data";
import { BoardProps, TaskProps } from "@/app/utils/interface";
import { ItemType } from "@/app/utils/types";

import { DeleteModalProps } from "@/app/utils/types";
import { useBoards } from "@/app/context/BoardContext";

const DeleteModal = ({ taskOrBoard }: DeleteModalProps) => {
  const { modalRef, modalValue, closeModal } = useModal();
  const { deleteBoard, deleteTask, boards } = useBoards();

  function isValidObj(item: ItemType | undefined): item is BoardProps {
    return (
      item !== undefined &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      "name" in item &&
      "_id" in item
    );
  }

  function isTaskTuple(item: ItemType): item is [BoardProps, TaskProps] {
    return (
      item !== undefined &&
      Array.isArray(item) &&
      item.length === 2 &&
      typeof item[0] === "object" &&
      typeof item[1] === "object" &&
      item[1] !== null &&
      "title" in item[1]
    );
  }

  console.log({ modalValue: modalValue?.item });

  const itemName =
    taskOrBoard === "task"
      ? isTaskTuple(modalValue?.item) && modalValue.item[1].title
      : isValidObj(modalValue?.item) && modalValue?.item
      ? modalValue?.item?.name
      : "";

  const handleDeleteItem = () => {
    if (taskOrBoard === "task" && modalValue) {
      if (taskOrBoard === "task" && modalValue && modalValue.item) {
        if (isTaskTuple(modalValue.item)) {
          const currentBoard = modalValue.item[0];
          const task = modalValue.item[1];
          const taskIndex = modalValue?.index;
          const currentColumnName = task.status || currentBoard.columns[0].name;

          if (
            typeof taskIndex === "number" &&
            currentBoard &&
            currentColumnName
          ) {
            deleteTask(taskIndex, currentBoard, currentColumnName);
            closeModal();
          }
        }
      }
    }

    if (taskOrBoard === "board") {
      if (isValidObj(modalValue?.item)) {
        const currentBoard = modalValue?.item;
        const indexOfBoardToDelete = boards.findIndex(
          (board: BoardProps) => board._id === currentBoard._id
        );

        deleteBoard(indexOfBoardToDelete);
        closeModal();
      }
    }
  };
  return (
    <div className="modal-content-wrapper delete-modal-content" ref={modalRef}>
      <h5>Delete this {taskOrBoard === "task" ? "task" : "board"}?</h5>

      <p>
        Are you sure you want to delete the{" "}
        <span className="text-[var(--darkpurple)]">
          &apos;{itemName}&apos;{" "}
        </span>
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
