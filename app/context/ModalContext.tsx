"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  Ref
} from "react";
import { JSX } from "react";
import { ItemType } from "../utils/types";

type HandleModalOpenProps = {
  modalContent: JSX.Element;
  index?: number;
  item?: ItemType;
};

interface ModalContextProps {
  openModal: boolean;
  handleModalOpen: (
    modalContent: JSX.Element,
    index?: number,
    item?: ItemType
  ) => void;
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
    index?: number,
    item?: ItemType
  ) => {
    setOpenModal(true);

    if (typeof index === "number") {
      setModalValue({ modalContent, index, item });
    } else {
      setModalValue({ modalContent, item });
    }
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
      value={{ openModal, closeModal, handleModalOpen, modalValue, modalRef }}
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
