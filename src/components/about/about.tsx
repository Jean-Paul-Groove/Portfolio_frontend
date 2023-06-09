import "./about.css";
import Links from "../links/links";
import { useEffect, useState, useContext } from "react";
import apiURL from "../../utils/variables";
import { AboutContent } from "../../@types/AboutContent";
import { connexionContext } from "../../utils/connexionContext";
import EditAbout from "./editAbout/editAbout";

function About() {
  const { isConnected } = useContext(connexionContext);
  const [aboutContent, setAboutContent] = useState<AboutContent | undefined>();
  const [update, setUpdate] = useState({});

  async function getAboutContent() {
    try {
      const response = await fetch(apiURL + "about", { method: "GET" });
      const aboutContent: AboutContent = await response.json();
      console.log(aboutContent + " from function");
      setAboutContent(aboutContent);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAboutContent();
  }, [update]);
  if (aboutContent) {
    return (
      <div id="about">
        <div>
          <h1>Portfolio</h1>
          <figure className="about__figure">
            <img
              className="about__profilepicture"
              src={aboutContent.img}
              alt=""
            />
            <figcaption className="about__name">
              {aboutContent.name.split(" ").map((name) => (
                <p>{name}</p>
              ))}
            </figcaption>
          </figure>
          <Links />
          {isConnected && (
            <EditAbout about={aboutContent} setUpdate={setUpdate} />
          )}
        </div>

        <div className="about__description">
          {aboutContent.description.split(" // ").map((text) => (
            <p className="about__description__p">
              {text.split("/strong").map((text, index) => {
                if (Math.abs(index % 2) == 1) {
                  return <strong>{text}</strong>;
                } else {
                  return text;
                }
              })}
            </p>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="loader"></div>;
  }
}
export default About;
