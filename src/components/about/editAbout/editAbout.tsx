import { AboutContent } from "../../../@types/AboutContent";
import "./editAbout.css";
import { useState, useContext } from "react";
import { connexionContext } from "../../../utils/connexionContext";
import apiURL from "../../../utils/variables";

function EditAbout(props: {
  about: AboutContent;
  setUpdate: React.Dispatch<React.SetStateAction<AboutContent>>;
}) {
  const { token } = useContext(connexionContext);
  const { about, setUpdate } = props;
  const [newAboutContent, setNewAboutContent] = useState(about);
  const [isOpenEditMode, setIsOpenEditMode] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("submitted");
    const request = JSON.stringify(newAboutContent);
    const response = await fetch(apiURL + "about/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },

      body: request,
    });
    if (!response.ok) {
      alert("Une erreur est survenue");
    } else {
      setUpdate(newAboutContent);
      setIsOpenEditMode(false);
    }
  }
  function changeAbout(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (e.currentTarget.name) {
      const about = { ...newAboutContent };
      setNewAboutContent({
        ...about,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }
  return isOpenEditMode ? (
    <div
      onClick={() => {
        setIsOpenEditMode(!isOpenEditMode), setNewAboutContent(about);
      }}
      className="edit__about__wrapper"
    >
      X
      <form
        className="edit__about__form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="edit__about__form__label">
          Nom
          <input
            onChange={changeAbout}
            type="text"
            value={newAboutContent.name}
            name="name"
            className="edit__about__form__input"
          />
        </label>
        <label htmlFor="description" className="edit__about__form__label">
          Description
          <textarea
            onChange={changeAbout}
            className="edit__about__form__text-area"
            name="description"
            id=""
            value={newAboutContent.description}
          ></textarea>
          <p>Insérer " // " pour changer de paragraphe</p>
          <p>Encadrer de "/strong" pour mettre en valeur certains mots </p>
        </label>
        <label htmlFor="picture" className="edit__about__form__label">
          Change Picture
          <input
            type="file"
            name="picture"
            id=""
            className="edit__about__form__input-file"
          />
        </label>
        <button type="submit" className="editAbout__button">
          Envoyer
        </button>
      </form>
    </div>
  ) : (
    <button
      className="editAbout__button"
      onClick={() => setIsOpenEditMode(!isOpenEditMode)}
    >
      Modifier l'introduction du Portfolio
    </button>
  );
}
export default EditAbout;
