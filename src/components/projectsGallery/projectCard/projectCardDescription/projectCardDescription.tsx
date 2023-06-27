import "./projectCartDescription.css";

function ProjectCardDescription(props: { description: string }) {
  const { description } = props;
  return description
    .replace(/(\r\n)|\r|\n/g, "\n")
    .split(/\n+/g)
    .map((paragraph, index) => (
      <p
        key={"project_description" + index}
        className="project__card__description"
      >
        {paragraph}
      </p>
    ));
}

export default ProjectCardDescription;
