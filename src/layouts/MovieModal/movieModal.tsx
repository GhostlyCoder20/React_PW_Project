
// components/Modal.tsx
import React, { ReactNode } from 'react';
import style from './movieModal.module.css'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style["modal-overlay"]}>
      <div className={style["modal-content"]}>
        <button onClick={onClose} className={style["modal-close"]}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

