import "./editProjectGalleryMode.css";
import { useState } from "react";
import Modal from "../../shared/modal/modal";
import EditProjects from "./editProjects/editProjects";

function EditProjectGalleryMode() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <>
      <button
        onClick={toggleModal}
        className="edit__project__gallery__mode__button"
      >
        Modifier les projets
      </button>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <EditProjects />
        </Modal>
      )}
    </>
  );
}
export default EditProjectGalleryMode;
