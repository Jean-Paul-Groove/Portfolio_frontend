import "./editForm.css";
import { useState } from "react";
import EditAbout from "./editAbout/editAbout";
import EditProjects from "./editProjects/editProjects";

function EditForm() {
  const [optionSelected, setOptionSelected] = useState("");

  if (!optionSelected) {
    return (
      <div className="edit__form">
        <p>Quelle partie souhaitez vous modifier ?</p>
        <div className="edit__form__buttons__container">
          <button
            className="edit__form__button"
            onClick={() => setOptionSelected("about")}
          >
            A Propos
          </button>
          <button
            className="edit__form__button"
            onClick={() => setOptionSelected("projects")}
          >
            Gallerie de projets
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <p className="edit__form__back" onClick={() => setOptionSelected("")}>
          ⬅
        </p>
        {optionSelected == "about" ? <EditAbout /> : <EditProjects />}
      </>
    );
  }
}

export default EditForm;
