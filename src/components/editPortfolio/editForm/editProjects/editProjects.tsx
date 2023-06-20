import "./editProjects.css";
import { useState } from "react";
import { Project } from "../../../../@types/Project";
import ProjectForm from "./projectForm/projectForm";

function EditProjects(props: { incrementProjectsContentUpdated: () => void }) {
  const [project, setProject] = useState<Project>();
  function openProjectEditor(project: Project) {
    setProject(project);
  }
  const newProject = {
    title: "",
    description: "",
    tags: "",
    img: "",
    url: "",
  };
  if (project) {
    return (
      <ProjectForm
        project={project}
        type="new"
        incrementProjectsContentUpdated={props.incrementProjectsContentUpdated}
      />
    );
  } else {
    return (
      <button
        className="edit__projects__form__new__project__button"
        onClick={() => openProjectEditor(newProject)}
      >
        Nouveau Projet
      </button>
    );
  }
}

export default EditProjects;
