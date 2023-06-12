import "./projects-gallery.css";
import { useEffect, useState } from "react";
import apiURL from "../../utils/apiURL";
import { Project } from "../../@types/Project";
import ProjectCard from "./project-card/project-card";

function ProjectsGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (): Promise<string[] | undefined> => {
    setLoading(true);
    try {
      const response = await fetch(apiURL + "projets", { method: "GET" });
      const projects = await response.json();
      setProjects(projects);
      setLoading(false);
      return projects;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <section id="projects">
        <h2 className="projects__title">Quelques projets</h2>
        <div className="projects__gallery">
          {projects &&
            projects.map((project: Project) => (
              <ProjectCard
                title={project.title}
                img={project.img}
                tags={project.tags}
                url={project.url}
                description={project.description}
              />
            ))}
        </div>
      </section>
    );
  }
}

export default ProjectsGallery;
