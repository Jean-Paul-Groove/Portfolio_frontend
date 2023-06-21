import "./editProjects.css";
import { useEffect, useState } from "react";
import { Project } from "../../../../@types/Project";
import ProjectForm from "./projectForm/projectForm";
import apiURL from "../../../../utils/apiURL";
import EditProjectCard from "./editProjectCard/editProjectCard";
import DeleteProject from "./deleteProject/deleteProject";

function EditProjects(props: { incrementProjectsContentUpdated: () => void }) {
  const [project, setProject] = useState<Project>();
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(apiURL + "projets", { method: "GET" });
      const projects = await response.json();
      setProjectList(projects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
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
