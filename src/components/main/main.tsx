import ProjectsGallery from "../projectsGallery/projectsGallery";
import About from "../about/about";
import Contact from "../contact/contact";
import { useState } from "react";
import UpdatedContentContext from "../../utils/contexts/UpdatedContentContexts";
import { Outlet } from "react-router-dom";

function Main() {
  const [aboutUpdates, setAboutUpdates] = useState(0);
  const [projectsUpdates, setProjectsUpdates] = useState(0);
  function incrementUpdatedAboutContent() {
    setAboutUpdates(aboutUpdates + 1);
    console.log(aboutUpdates);
  }
  function incrementUpdatedProjectsContent() {
    setProjectsUpdates(projectsUpdates + 1);
  }

  return (
    <>
      <main>
        <UpdatedContentContext.Provider
          value={{
            updatedAboutContent: aboutUpdates,
            incrementUpdatedAboutContent: incrementUpdatedAboutContent,
            updatedProjectsContent: projectsUpdates,
            incrementUpdatedProjectsContent: incrementUpdatedProjectsContent,
          }}
        >
          <Outlet />
          <About />
          <ProjectsGallery />
        </UpdatedContentContext.Provider>
      </main>{" "}
      <footer>
        <Contact></Contact>
      </footer>{" "}
    </>
  );
}

export default Main;
