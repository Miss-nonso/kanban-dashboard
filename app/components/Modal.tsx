import React, { JSX } from "react";
import DeleteModal from "./ModalContent/DeleteModal";

type ModalProps = {
  ModalContent: () => JSX.Element;
  type: "add" | "edit";
  taskOrBoard: "task" | "board";
  name: string;
};

const Modal = ({ ModalContent, type, taskOrBoard, name }: ModalProps) => {
  return (
    <div className="modal">
      {ModalContent === DeleteModal ? (
        <ModalContent taskOrBoard={taskOrBoard} name={name} />
      ) : (
        <ModalContent type={type} />
      )}
    </div>
  );
};

export default Modal;
