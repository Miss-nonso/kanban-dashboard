import React, { ReactNode } from 'react';

type ModalProps = {
  ModalContent: ReactNode;
};

const Modal = ({ ModalContent }: ModalProps) => {
  return <div className="modal">{ModalContent}</div>;
};

export default Modal;
