import "./about.css";
import { useEffect, useState } from "react";
import apiURL from "../../utils/apiURL";
import { AboutContent } from "../../@types/AboutContent";
import GitLink from "../shared/external-links/gitLink";
import LinkedinLink from "../shared/external-links/linkedinLink";

function About(props: { aboutContentHasBeenUpdated: number }) {
  const [about, setAbout] = useState<AboutContent>({
    id: "",
    description: "",
    img: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiURL + "about", { method: "GET" });
      const data = await response.json();
      setAbout(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAbout();
  }, [props.aboutContentHasBeenUpdated]);

  return (
    <>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <section id="about">
          <h1>Portfolio</h1>
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
