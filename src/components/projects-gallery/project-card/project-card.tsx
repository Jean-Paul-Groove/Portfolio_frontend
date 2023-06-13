import "./project-card.css";
import Tag from "./tag/tag";

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
        <h3 className="project__card__">{title}</h3>
        {description
          .replace(/(\r\n)|\r|\n/g, "\n")
          .split(/\n+/g)
          .map((paragraph) => (
            <p className="project__card__description">{paragraph}</p>
          ))}
        {tags && (
          <ul className="tag__container">
            {tags.split(" ").map((tag) => (
              <Tag tag={tag} />
            ))}
          </ul>
        )}
        <a href={url}>Lien</a>
      </figcaption>
    </figure>
  );
}
export default ProjectCard;
