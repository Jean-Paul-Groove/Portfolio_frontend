import "./about.css";
import { useEffect, useState } from "react";
import apiURL from "../../utils/apiURL";
import { AboutContent } from "../../@types/AboutContent";

function About() {
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
  }, []);

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
                  about.name.split(" ").map((name) => <p>{name}</p>)}
              </figcaption>
              <div className="about__links__container"></div>
            </figure>
          </div>
        </section>
      )}
    </>
  );
}

export default About;
