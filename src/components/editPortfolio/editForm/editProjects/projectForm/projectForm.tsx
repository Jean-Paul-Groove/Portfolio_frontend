import "./projectForm.css";
import { Project } from "../../../../../@types/Project";
import { ChangeEvent, useState } from "react";
import apiURL from "../../../../../utils/apiURL";
import ProjectCard from "../../../../projects-gallery/project-card/project-card";

function ProjectForm(props: {
  project: Project;
  type: "new" | "modification";
  incrementProjectsContentUpdated: () => void;
}) {
  const { project, type } = props;

  const [formContent, setFormContent] = useState(project);
  const [file, setFile] = useState<File>();
  const [updated, setUpdated] = useState(false);
  const imgUrl = file ? URL.createObjectURL(file) : "";
  function changeFormContent(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (e.currentTarget.name) {
      const prevForm = { ...formContent };
      setFormContent({
        ...prevForm,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0].size < 10000000) {
      setFile(e.target.files[0]);
    } else {
      e.target.value = "";
      alert(
        "Ce fichier est trop volumineux veuillez en sélectionner un nouveau"
      );
    }
  }

  async function handleSubmit(
    type: "new" | "modification",
    e: React.FormEvent
  ) {
    e.preventDefault();
    if (!file) {
      alert("Veuillez sélectionner un fichier");
    } else {
      const request = new FormData();
      request.append("title", formContent.title);
      request.append("description", formContent.description);
      request.append("tags", formContent.tags);
      request.append("url", formContent.url);
      request.append("file", file);
      if (type === "new") {
        const result = await fetch(apiURL + "projets/nouveau", {
          method: "POST",
          body: request,
        });
        if (!result.ok) {
          alert("Une erreur est survenue");
        } else {
          props.incrementProjectsContentUpdated();
          setUpdated(true);
        }
      }
    }
  }
  return updated ? (
    <div className="edit__form__announcement__div">
      {" "}
      Projet {type === "new" ? "ajouté" : "modifié"} avec succès
    </div>
  ) : (
    <form onSubmit={(e) => handleSubmit(type, e)} className="project__form">
      <h2>Projet</h2>
      <label className="project__form__label" htmlFor="title">
        Titre
        <input
          className="project__form__input"
          name="title"
          type="text"
          value={formContent.title}
          onInput={changeFormContent}
          required
        />
      </label>
      <label className="project__form__label" htmlFor="description">
        Description{" "}
        <textarea
          className="project__form__text-area"
          name="description"
          value={formContent.description}
          onInput={changeFormContent}
          required
        ></textarea>
      </label>
      <label className="project__form__label" htmlFor="tags">
        Tags
        <input
          className="project__form__input"
          type="text"
          name="tags"
          value={formContent.tags}
          onInput={changeFormContent}
        />
      </label>
      <label className="project__form__label" htmlFor="url">
        Url
        <input
          className="project__form__input"
          type="text"
          name="url"
          value={formContent.url}
          onInput={changeFormContent}
          required
        />
      </label>
      <label className="project__form__label" htmlFor="image">
        Image
        <input
          className="project__form__file__input"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </label>
      <div>
        <p>Aperçu: </p>
        <ProjectCard
          title={formContent.title}
          img={imgUrl}
          tags={formContent.tags}
          url={formContent.url}
          description={formContent.description}
        />
      </div>
      <button type="submit" className="project__form__button">
        Valider
      </button>
    </form>
  );
}

export default ProjectForm;