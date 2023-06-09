import "./projects.css";
import ProjectCard from "./projectCard/projectCard";
import { useEffect, useState } from "react";
import { Project } from "../../@types/Project";
import apiURL from "../../utils/variables";

function Projects() {
  const [isLoading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async (): Promise<string[] | undefined> => {
    setLoading(true);
    try {
      const response = await fetch(apiURL + "projects", { method: "GET" });
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

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <section id="projects">
        <h2 className="projects__title">Quelques projets</h2>
        <div className="projects__gallery">
          {projects &&
            projects.map((project: Project) => (
              <ProjectCard project={project} />
            ))}
        </div>
      </section>
    );
  }
}

export default Projects;
