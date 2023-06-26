import { ChangeEvent, useContext, useState } from "react";
import "./editCurriculum.css";
import Modal from "../../../shared/modal/modal";
import AuthentifiedContext from "../../../../utils/contexts/AuthentifiedContext";
const apiURL = import.meta.env.VITE_API_URL;

function EditCurriculum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const authContext = useContext(AuthentifiedContext);
  const token = authContext.token;
  function toggleModal() {
    setIsModalOpen(false);
  }
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (e.target.files[0].type != "application/pdf") {
        alert("Sélectionner un PDF");
        e.target.value = "";
      } else {
        setFile(e.target.files[0]);
      }
    }
  }
  async function sendNewCv() {
    if (file) {
      const request = new FormData();
      request.append("file", file);
      const response = await fetch(apiURL + "curriculum", {
        method: "PUT",
        headers: {
          authorization: `bearer ${token}`,
        },
        body: request,
      });
      if (response.ok) {
        alert("Le cv a bien été modifié");
        toggleModal();
      } else {
        alert("Une erreur est survenue veuillez réessayer");
        if (response.status == 401 && authContext.setToken) {
          authContext.setToken("");
        }
      }
    }
  }

  return isModalOpen ? (
    <Modal toggleModal={toggleModal}>
      <h2>Changer de CV</h2>
      <form onSubmit={() => sendNewCv()} className="edit__curriculum__form">
        <label className="edit__curriculum__label" htmlFor="input__cv">
          {" "}
          Sélectionner un fichier PDF
          <input
            onChange={handleFileChange}
            className="edit__curriculum__input"
            type="file"
            name="input__cv"
            accept="application/pdf"
          />
        </label>
        <button type="submit" className="edit__curriculum__button">
          {" "}
          Valider
        </button>
      </form>
    </Modal>
  ) : (
    <button
      onClick={() => setIsModalOpen(true)}
      className="edit__curriculum__button edit__curriculum__toggle-modal"
    >
      Changer le CV
    </button>
  );
}

export default EditCurriculum;
