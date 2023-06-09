import "./projectCard.css";
import Tag from "../tag/tag";
import { Project } from "../../../@types/Project";
type ProjectCardProps = {project:Project}
function ProjectCard(props: ProjectCardProps) {
	const {project}=props
	const { title, description, tags, img, url } = project;
	return (
		<a href={url} className="project-card__wrapper">
			<figure className="project-card">
				<img className="project-card__img" src={img} alt="" />
				<figcaption className="project-card__content">
					{" "}
					<h3 className="project-card__title">{title}</h3>
					<div className="project-card__description">
						{description}
					</div>
					<ul className="project-card__tag__container">
						{ tags.split(' ').map((tag, index) => (
							<Tag tag={tag} key={ tag + index } />
						))}
					</ul>
				</figcaption>
			</figure>
		</a>
	);
}

export default ProjectCard;
