import ProjectsGallery from "../projectsGallery/projectsGallery";
import About from "../about/about";
import Contact from "../contact/contact";
import { useState } from "react";
import UpdatedContentContext from "../../utils/contexts/UpdatedContentContexts";
import AuthentifiedContext from "../../utils/contexts/AuthentifiedContext";
import Navigation from "../navigation/navigation";

import { Outlet } from "react-router-dom";

function Main() {
  const [aboutUpdates, setAboutUpdates] = useState(0);
  const [projectsUpdates, setProjectsUpdates] = useState(0);
  const [token, setToken] = useState("");
  function incrementUpdatedAboutContent() {
    setAboutUpdates(aboutUpdates + 1);
    console.log(aboutUpdates);
  }
  function incrementUpdatedProjectsContent() {
    setProjectsUpdates(projectsUpdates + 1);
  }

  return (
    <>
      <AuthentifiedContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <header>
          <Navigation />
        </header>
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
        </main>
      </AuthentifiedContext.Provider>
      <footer>
        <Contact></Contact>
      </footer>
    </>
  );
}

export default Main;
