import "./about.css";
import { useEffect, useState, useContext } from "react";
import { AboutContent } from "../../@types/AboutContent";
import GitLink from "../shared/externalLinks/gitLink";
import LinkedinLink from "./linkedinLink/linkedinLink";
import EditAboutMode from "./editAboutMode/editAboutMode";
import UpdatedContentContext from "../../utils/contexts/UpdatedContentContexts";
import AuthentifiedContext from "../../utils/contexts/AuthentifiedContext";
import Curriculum from "./curriculum/curriculum";
const apiURL = import.meta.env.VITE_API_URL;

function About() {
  const [about, setAbout] = useState<AboutContent>({
    id: "",
    description: "",
    img: "",
    name: "",
  });
  const updatedAboutContentCount = useContext(
    UpdatedContentContext
  ).updatedAboutContent;
  const token = useContext(AuthentifiedContext).token;

  const fetchAbout = async () => {
    try {
      const response = await fetch(apiURL + "about", { method: "GET" });
      const data = await response.json();
      setAbout(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAbout();
  }, [updatedAboutContentCount]);

  return (
    <>
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
