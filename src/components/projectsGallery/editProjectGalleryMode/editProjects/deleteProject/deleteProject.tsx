import "./deleteProject.css";
import { Project } from "../../../../../@types/Project";
import { useContext, useState } from "react";
import UpdatedContentContext from "../../../../../utils/contexts/UpdatedContentContexts";
import AuthentifiedContext from "../../../../../utils/contexts/AuthentifiedContext";
const apiURL = import.meta.env.VITE_API_URL;

function DeleteProject(props: { project: Project }) {
  const { project } = props;
  const deleteIcon = (
    <svg
      className="delete__project__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
    </svg>
  );
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
  const incrementUpdatedProjectsContent = useContext(
    UpdatedContentContext
  ).incrementUpdatedProjectsContent;
  const authContext = useContext(AuthentifiedContext);
  const token = authContext.token;
  async function sendDeleteRequest() {
    const response = await fetch(apiURL + "projets/" + project.id, {
      method: "DELETE",
      headers: { authorization: `bearer ${token}` },
    });
    if (response.status == 204) {
      alert("Suppression effectuée");
      if (incrementUpdatedProjectsContent) {
        incrementUpdatedProjectsContent();
      }
    } else {
      alert("Une erreur est survenue");
      if (response.status == 401 && authContext.setToken) {
        authContext.setToken("");
      }
    }
  }
  return confirmationIsOpen ? (
    <div className="delete__project__confirmation__wrapper">
      <div className="delete__project__confirmation__div">
        <p>Êtes vous sûr de vouloir supprimer {project.title} ?</p>
        <div className="delete__project__confirmation__button__container">
          <button onClick={sendDeleteRequest}>Oui</button>
          <button onClick={() => setConfirmationIsOpen(false)}>Non</button>
        </div>
      </div>
    </div>
  ) : (
    <button onClick={() => setConfirmationIsOpen(true)}>{deleteIcon}</button>
  );
}

export default DeleteProject;
