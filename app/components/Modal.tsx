import React, { JSX } from "react";
import DeleteModal from "./ModalContent/DeleteModal";
import { useModal } from "../context/ModalContext";
import ViewTask from "./ModalContent/ViewTask";
import { TaskProps } from "../utils/interface";

type ModalProps = {
  ModalContent: () => JSX.Element;
  type: "add" | "edit";
  taskOrBoard: "task" | "board";
  name: string;
  task?: TaskProps;
};

const Modal = ({ ModalContent, type, taskOrBoard, name, task }: ModalProps) => {
  const { modalValue } = useModal();

  const taskToEditItem = {
    title: modalValue?.title,
    description: modalValue?.description,
    status: modalValue?.status,
    subtasks: []
  };

  const subtasks = taskToEditItem?.subtasks.map((subtask) =>
    taskToEditItem.subtasks.push(subtask)
  );

  console.log({ taskInModal: task });

  return (
    <div className="modal">
      {ModalContent === DeleteModal ? (
        <ModalContent taskOrBoard={taskOrBoard} name={name} />
      ) : ModalContent === ViewTask ? (
        <ModalContent task={task} />
      ) : (
        <ModalContent type={type} />
      )}
    </div>
  );
};

export default Modal;
