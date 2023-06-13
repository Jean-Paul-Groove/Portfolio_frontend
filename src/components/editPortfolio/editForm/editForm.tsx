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
    );
  } else {
    return (
      <div className="edit__form">
        <p className="edit__form__back" onClick={() => setOptionSelected("")}>
          ⬅
        </p>
        {optionSelected == "about" ? <EditAbout /> : <EditProjects />}
      </div>
    );
  }
}

export default EditForm;
