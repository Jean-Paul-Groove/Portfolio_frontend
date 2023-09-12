import "./projectForm.css";
import { Project } from "../../../../../@types/Project";
import { ChangeEvent, useContext, useState } from "react";
import ProjectCard from "../../../projectCard/projectCard";
import UpdatedContentContext from "../../../../../utils/contexts/UpdatedContentContexts";
import AuthentifiedContext from "../../../../../utils/contexts/AuthentifiedContext";
const apiURL = import.meta.env.VITE_API_URL;

function ProjectForm(props: {
  project: Project;
  type: "new" | "modification";
}) {
  const { project, type } = props;

  const [formContent, setFormContent] = useState(project);
  const [file, setFile] = useState<File>();
  const [updated, setUpdated] = useState(false);
  const imgUrl = file ? URL.createObjectURL(file) : project.img;
  const incrementUpdatedProjectsContent = useContext(
    UpdatedContentContext
  ).incrementUpdatedProjectsContent;
  const authContext = useContext(AuthentifiedContext);
  const token = authContext.token;

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
    if (type === "new") {
      if (!file) {
        alert("Veuillez sélectionner un fichier car le type est " + type);
      } else {
        const request = new FormData();
        request.append("title", formContent.title);
        request.append("description", formContent.description);
        request.append("tags", formContent.tags);
        request.append("url", formContent.url);
        request.append("file", file);

        const response = await fetch(apiURL + "projets/", {
          method: "POST",
          body: request,
          headers: { authorization: `bearer ${token}` },
        });
        if (!response.ok) {
          alert("Une erreur est survenue");
          if (response.status == 401 && authContext.setToken) {
            authContext.setToken("");
          }
        } else {
          setUpdated(true);
          if (incrementUpdatedProjectsContent) {
            incrementUpdatedProjectsContent();
          }
        }
      }
    }
    if (type === "modification") {
      if (file) {
        const request = new FormData();
        request.append("title", formContent.title);
        request.append("description", formContent.description);
        request.append("tags", formContent.tags);
        request.append("url", formContent.url);
        request.append("file", file);

        const response = await fetch(apiURL + "projets/" + project.id, {
          method: "PUT",
          body: request,
          headers: { authorization: `bearer ${token}` },
        });
        if (!response.ok) {
          alert("Une erreur est survenue");
          if (response.status == 401 && authContext.setToken) {
            authContext.setToken("");
          }
        } else {
          setUpdated(true);
          if (incrementUpdatedProjectsContent) {
            incrementUpdatedProjectsContent();
          }
        }
      } else {
        const request = JSON.stringify(formContent);
        const response = await fetch(apiURL + "projets/" + project.id, {
          method: "PUT",
          body: request,
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          alert("Une erreur est survenue");
          if (response.status == 401 && authContext.setToken) {
            authContext.setToken("");
          }
        } else {
          setUpdated(true);
          if (incrementUpdatedProjectsContent) {
            incrementUpdatedProjectsContent();
          }
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
      <label className="project__form__label" htmlFor="project_title">
        Titre
        <input
          className="project__form__input"
          name="title"
          type="text"
          value={formContent.title}
          onInput={changeFormContent}
          required
          id="project_title"
        />
      </label>
      <label className="project__form__label" htmlFor="project_description">
        Description{" "}
        <textarea
          className="project__form__text-area"
          name="description"
          value={formContent.description}
          onInput={changeFormContent}
          required
          id="project_description"
        ></textarea>
      </label>
      <label className="project__form__label" htmlFor="project_tags">
        Tags
        <input
          className="project__form__input"
          type="text"
          name="tags"
          value={formContent.tags}
          onInput={changeFormContent}
          id="project_tags"
        />
      </label>
      <label className="project__form__label" htmlFor="project_url">
        Url
        <input
          className="project__form__input"
          type="text"
          name="url"
          value={formContent.url}
          onInput={changeFormContent}
          required
          id="project_url"
        />
      </label>
      <label className="project__form__label" htmlFor="project_image">
        Image
        <input
          className="project__form__file__input"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          id="project_image"
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
