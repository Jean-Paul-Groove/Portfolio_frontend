import "./App.css";
import ProjectsGallery from "./components/projects-gallery/projects-gallery";
import About from "./components/about/about";
import Contact from "./components/contact/contact";

function App() {
  return (
    <>
      <header></header>
      <main>
        <About></About>
        <ProjectsGallery />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
}

export default App;
