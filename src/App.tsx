import "./App.css";
import ProjectsGallery from "./components/projects-gallery/projects-gallery";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import EditPortfolio from "./components/editPortfolio/editPortfolio";
import { useState } from "react";

function App() {
  const [aboutContentHasBeenUpdated, setAboutContentHasBeenUpdated] =
    useState(0);
  const [projectsContentHasBeenUpdated, setProjectsContentHasBeenUpdated] =
    useState(0);
  function incrementAboutContentUpdated() {
    setAboutContentHasBeenUpdated(aboutContentHasBeenUpdated + 1);
  }
  function incrementProjectsContentUpdated() {
    setProjectsContentHasBeenUpdated(projectsContentHasBeenUpdated + 1);
  }
  return (
    <>
      <header>
        <EditPortfolio
          incrementAboutContentUpdated={incrementAboutContentUpdated}
          incrementProjectsContentUpdated={incrementProjectsContentUpdated}
        />
      </header>
      <main>
        <About aboutContentHasBeenUpdated={aboutContentHasBeenUpdated} />
        <ProjectsGallery
          projectsContentHasBeenUpdated={projectsContentHasBeenUpdated}
        />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
}

export default App;
