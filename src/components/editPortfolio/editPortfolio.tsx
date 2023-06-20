import { useState } from "react";
import Modal from "../shared/modal/modal";
import EditForm from "./editForm/editForm";

function EditPortfolio(props: {
  incrementAboutContentUpdated: () => void;
  incrementProjectsContentUpdated: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <>
      <button onClick={toggleModal} className="edit__form__button">
        Modifier le portfolio
      </button>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <EditForm
            incrementAboutContentUpdated={props.incrementAboutContentUpdated}
            incrementProjectsContentUpdated={
              props.incrementProjectsContentUpdated
            }
          />
        </Modal>
      )}
    </>
  );
}

export default EditPortfolio;
