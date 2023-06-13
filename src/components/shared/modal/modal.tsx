import { ReactNode } from "react";
import "./modal.css";

function Modal(props: { toggleModal: () => void; children: ReactNode }) {
  const { toggleModal, children } = props;

  return (
    <div className="modal__wrapper" onClick={toggleModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="modal__close-button" onClick={toggleModal}>
          X
        </p>
        {children}
      </div>
    </div>
  );
}

export default Modal;
