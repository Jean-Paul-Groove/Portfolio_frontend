import "./projectsGallery.css";
import { useContext, useEffect, useState } from "react";
import { Project } from "../../@types/Project";
import ProjectCard from "./projectCard/projectCard";
import EditProjectGalleryMode from "./editProjectGalleryMode/editProjectGalleryMode";
import UpdatedContentContext from "../../utils/contexts/UpdatedContentContexts";
import AuthentifiedContext from "../../utils/contexts/AuthentifiedContext";
const apiURL = import.meta.env.VITE_API_URL;

function ProjectsGallery() {
  const [projects, setProjects] = useState([]);

  const updatedProjectsContentCount = useContext(
    UpdatedContentContext
  ).updatedProjectsContent;
  const token = useContext(AuthentifiedContext).token;
  const fetchProjects = async (): Promise<string[] | undefined> => {
    try {
      const response = await fetch(apiURL + "projets", { method: "GET" });
      const projects = await response.json();
      projects.reverse();
      setProjects(projects);

      return projects;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [updatedProjectsContentCount]);

  return (
    <section id="projects">
      {token && <EditProjectGalleryMode />}
      {projects && (
        <>
          <h2 className="projects__title">Quelques projets</h2>

          <div className="projects__gallery">
            {projects?.map((project: Project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                img={project.img}
                tags={project.tags}
                git={project.git}
                url={project.url}
                description={project.description}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ProjectsGallery;
