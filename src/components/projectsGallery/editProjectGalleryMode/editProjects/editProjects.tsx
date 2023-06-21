import "./editProjects.css";
import { useContext, useEffect, useState } from "react";
import { Project } from "../../../../@types/Project";
import ProjectForm from "./projectForm/projectForm";
import EditProjectCard from "./editProjectCard/editProjectCard";
import DeleteProject from "./deleteProject/deleteProject";
import UpdatedContentContext from "../../../../utils/contexts/UpdatedContentContexts";
const apiURL = import.meta.env.VITE_API_URL;

function EditProjects() {
  const [project, setProject] = useState<Project>();
  const [projectList, setProjectList] = useState([]);
  const updatedProjectsContentCount = useContext(
    UpdatedContentContext
  ).updatedProjectsContent;

  const fetchProjects = async (): Promise<void> => {
    try {
      const response = await fetch(apiURL + "projets", { method: "GET" });
      const projects = await response.json();
      setProjectList(projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [updatedProjectsContentCount]);
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
    return <ProjectForm project={project} type="new" />;
  } else {
    return (
      <>
        {" "}
        <button
          className="edit__projects__form__new__project__button"
          onClick={() => openProjectEditor(newProject)}
        >
          Nouveau Projet
        </button>
        <div className="edit__projects__gallery">
          {" "}
          {projectList &&
            projectList.map((project: Project) => (
              <EditProjectCard
                key={project.id}
                title={project.title}
                img={project.img}
              >
                <DeleteProject project={project} />
              </EditProjectCard>
            ))}
        </div>
      </>
    );
  }
}

export default EditProjects;
