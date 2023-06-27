import "./projectCard.css";
import Tag from "./tag/tag";
import ProjectCardDescription from "./projectCardDescription/projectCardDescription";
import GitLink from "../../shared/externalLinks/gitLink";

function ProjectCard(props: {
  title: string;
  img: string;
  tags: string;
  url: string;
  description: string;
}) {
  const { title, img, tags, url, description } = props;

  return (
    <figure className="project__card">
      <img src={img} alt={title} className="project__card__img" />
      <figcaption className="project__card__info">
        <h3 className="project__card__title">{title}</h3>
        <ProjectCardDescription description={description} />
        {tags && (
          <ul className="tag__container">
            {tags.split(" ").map((tag, index) => (
              <Tag key={tag + index} tag={tag} />
            ))}
          </ul>
        )}
        <GitLink url={url} />
      </figcaption>
    </figure>
  );
}
export default ProjectCard;
