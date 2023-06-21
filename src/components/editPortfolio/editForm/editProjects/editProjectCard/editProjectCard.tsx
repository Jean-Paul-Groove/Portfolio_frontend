import { ReactNode } from "react";
import "./editProjectCard.css";

type PropsEditProjectCard = {
  title: string;
  img: string;
  children: ReactNode;
};
function EditProjectCard(props: PropsEditProjectCard) {
  const { title, img, children } = props;
  return (
    <figure className="edit__project__card">
      <figcaption className="edit__project__card__header">
        {children}
        <h3 className="edit__project__card__title">{title}</h3>
      </figcaption>
      <img src={img} alt={title} className="edit__project__card__img" />
    </figure>
  );
}

export default EditProjectCard;
