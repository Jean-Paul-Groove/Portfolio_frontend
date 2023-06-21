import { Project } from "../../../../../@types/Project";
import "./updateProject.css";

function UpdateProject(props: {
  project: Project;
  openProjectEditor: (Project: Project, type: "new" | "modification") => void;
}) {
  const { project, openProjectEditor } = props;
  const editIcon = (
    <svg
      className="update__project__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z"></path>
    </svg>
  );
  return (
    <button onClick={() => openProjectEditor(project, "modification")}>
      {editIcon}
    </button>
  );
}

export default UpdateProject;
