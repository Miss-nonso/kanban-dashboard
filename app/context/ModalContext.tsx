"use client";
import { createContext, useContext, useState } from "react";
import { JSX } from "react";

type HandleModalOpenProps = {
  modalContent: JSX.Element | null;
  type: "add" | "edit" | null;
  taskOrBoard: "task" | "board" | null;
};

interface ModalContextProps {
  openModal: boolean;
  handleModalOpen: (
    modalContent: JSX.Element,
    type: "add" | "edit"
  ) => HandleModalOpenProps;
  modalValue: HandleModalOpenProps | null;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<HandleModalOpenProps | null>({
    modalContent: null,
    type: null,
    taskOrBoard: null
  });

  const handleModalOpen = (
    modalContent: JSX.Element,
    type: "add" | "edit",
    taskOrBoard
  ) => {
    setOpenModal(true);

    const modalElements = {
      modalContent: modalContent,
      type: type,
      taskOrBoard: taskOrBoard
    };
    return setModalValue(modalElements);
  };

  return (
    <ModalContext.Provider value={{ openModal, handleModalOpen, modalValue }}>
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
