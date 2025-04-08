"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { JSX } from "react";
import { BoardProps, ColumnProps, TaskProps } from "../utils/interface";

type HandleModalOpenProps = {
  modalContent: JSX.Element | null;
  type: "add" | "edit" | null;
  taskOrBoard: "task" | "board" | null;
  item: TaskProps | BoardProps | null;
};

interface ModalContextProps {
  openModal: boolean;
  handleModalOpen: (modalContent: JSX.Element, type: "add" | "edit") => void;
  closeModal: () => void;
  modalValue: HandleModalOpenProps | null;
  modalRef: Ref<HTMLDivElement>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<HandleModalOpenProps | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalOpen = (
    modalContent: JSX.Element,
    type: "add" | "edit",
    taskOrBoard: "task" | "board",
    item?: TaskProps | BoardProps | ColumnProps[] | [ColumnProps, TaskProps]
  ) => {
    setOpenModal(true);
    setModalValue({ modalContent, type, taskOrBoard, item });
    console.log({ openModal, modalValue });
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalValue(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  return (
    <ModalContext.Provider
      value={{ openModal, handleModalOpen, modalValue, modalRef }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
