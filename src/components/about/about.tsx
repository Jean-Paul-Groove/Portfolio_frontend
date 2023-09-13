import "./about.css";
import { useEffect, useState, useContext } from "react";
import { AboutContent } from "../../@types/AboutContent";
import GitLink from "../shared/externalLinks/gitLink";
import LinkedinLink from "./linkedinLink/linkedinLink";
import EditAboutMode from "./editAboutMode/editAboutMode";
import UpdatedContentContext from "../../utils/contexts/UpdatedContentContexts";
import AuthentifiedContext from "../../utils/contexts/AuthentifiedContext";
import Curriculum from "./curriculum/curriculum";
import Loader from "../shared/loader/loader";
const apiURL = import.meta.env.VITE_API_URL;

function About() {
  const [about, setAbout] = useState<AboutContent>({
    id: "",
    description: "",
    img: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const updatedAboutContentCount = useContext(
    UpdatedContentContext
  ).updatedAboutContent;
  const token = useContext(AuthentifiedContext).token;

  const fetchAbout = async () => {
    console.log(isLoading);
    setIsLoading(true);
    try {
      const response = await fetch(apiURL + "about", { method: "GET" });
      const data = await response.json();
      setAbout(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAbout();
  }, [updatedAboutContentCount]);

  return (
    <>
      {isLoading && <Loader />}
      {about && (
        <section id="about">
          <h1>Portfolio</h1>
          {token && <EditAboutMode />}
          <div className="about__grid">
            <figure className="about__figure">
              {about.img && (
                <img
                  src={about.img}
                  alt=""
                  className="about__profile-picture"
                />
              )}
              <figcaption className="about__name">
                {about.name &&
                  about.name
                    .split(" ")
                    .map((name, index) => <p key={index + name}>{name}</p>)}
              </figcaption>
              <div className="about__links__container">
                <GitLink /> <LinkedinLink />
                <Curriculum />
              </div>
            </figure>
            <div className="about__description">
              {about.description &&
                about.description
                  .replace(/(\r\n)|\r|\n/g, "\n")
                  .split(/\n+/g)
                  .map((paragraph, index) => (
                    <p key={index + "about_description"}>{paragraph}</p>
                  ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default About;
