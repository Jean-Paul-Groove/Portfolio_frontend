import { useState } from "react";
import "./editAboutMode.css";
import Modal from "../../shared/modal/modal";
import EditAboutForm from "./editAboutForm/editAboutForm";

function EditAboutMode() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <button onClick={toggleModal} className="edit__about__mode__button">
        Modifier l'introduction
      </button>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <EditAboutForm />
        </Modal>
      )}
    </>
  );
}

export default EditAboutMode;
