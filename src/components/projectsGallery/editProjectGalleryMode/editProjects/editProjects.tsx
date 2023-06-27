import "./editProjects.css";
import { useContext, useEffect, useState } from "react";
import { Project } from "../../../../@types/Project";
import ProjectForm from "./projectForm/projectForm";
import EditProjectCard from "./editProjectCard/editProjectCard";
import DeleteProject from "./deleteProject/deleteProject";
import UpdatedContentContext from "../../../../utils/contexts/UpdatedContentContexts";
import UpdateProject from "./updateProject/updateProject";
const apiURL = import.meta.env.VITE_API_URL;

function EditProjects() {
  const [project, setProject] = useState<Project>();
  const [projectList, setProjectList] = useState([]);
  const [typeofForm, setTypeOfForm] = useState<
    undefined | "new" | "modification"
  >();
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

  function openProjectEditor(project: Project, type: "new" | "modification") {
    setProject(project);
    setTypeOfForm(type);
  }

  const newProject = {
    title: "",
    description: "",
    tags: "",
    img: "",
    url: "",
  };
  if (project && typeofForm) {
    return (
      <>
        <button
          className="edit__projects__form__back"
          onClick={() => setProject(undefined)}
        >
          ←
        </button>
        <ProjectForm project={project} type={typeofForm} />
      </>
    );
  } else {
    return (
      <>
        {" "}
        <button
          className="edit__projects__form__new__project__button"
          onClick={() => openProjectEditor(newProject, "new")}
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
                <UpdateProject
                  project={project}
                  openProjectEditor={openProjectEditor}
                />
              </EditProjectCard>
            ))}
        </div>
      </>
    );
  }
}

export default EditProjects;
