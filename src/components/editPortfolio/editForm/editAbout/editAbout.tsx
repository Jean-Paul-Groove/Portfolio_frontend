import "./editAbout.css";
import { ChangeEvent, useState, useEffect } from "react";
import apiURL from "../../../../utils/apiURL";

function EditAbout() {
  const [formContent, setFormContent] = useState({ name: "", description: "" });
  const [file, setFile] = useState<File>();
  const [initialPicture, setInitialPicture] = useState("");
  const [updated, setUpdated] = useState(false);

  const fetchAbout = async () => {
    const response = await fetch(apiURL + "about", { method: "GET" });
    const data = await response.json();
    setFormContent({ name: data.name, description: data.description });
    setInitialPicture(data.img);
  };
  useEffect(() => {
    fetchAbout();
  }, []);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (file) {
      const request = new FormData();
      request.append("name", formContent.name);
      request.append("description", formContent.description);
      request.append("file", file);
      const response = await fetch(apiURL + "about", {
        method: "PUT",
        body: request,
      });
      if (!response.ok) {
        alert("Une erreur est survenue");
      } else {
        setUpdated(true);
      }
    } else {
      const request = JSON.stringify(formContent);
      const response = await fetch(apiURL + "about/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: request,
      });
      if (response.ok) {
        setUpdated(true);
      } else {
        alert("Une erreur est survenue");
      }
    }
  }
  function changeFormContent(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (e.currentTarget.name) {
      const about = { ...formContent };
      setFormContent({
        ...about,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0].size < 10000000) {
      setFile(e.target.files[0]);
    }
  }
  const profilepicture = file ? URL.createObjectURL(file) : initialPicture;
  return updated ? (
    <div> Vos modifications ont bien été prises en compte</div>
  ) : (
    <form
      className="edit__form"
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="edit__form__label">
        Nom
        <input
          onChange={changeFormContent}
          type="text"
          value={formContent.name}
          name="name"
          className="edit__form__input"
        />
      </label>
      <label htmlFor="description" className="edit__form__label">
        Description
        <textarea
          onChange={changeFormContent}
          className="edit__form__text-area"
          name="description"
          id=""
          value={formContent.description}
        ></textarea>
      </label>
      <label htmlFor="picture" className="edit__form__label input__file__label">
        Change Picture
        <input
          type="file"
          name="picture"
          onChange={handleFileChange}
          className="edit__form__input-file"
          accept="image/*"
        />
        <img
          className="edit__form__profile-picture about__profile-picture"
          src={profilepicture && profilepicture}
        />
        {file && (
          <>
            <p
              className="edit__form__button clear-input"
              onClick={() => setFile(undefined)}
            >
              Retirer l'image
            </p>
          </>
        )}
      </label>
      <button type="submit" className="edit__form__button edit__about__button">
        Envoyer
      </button>
    </form>
  );
}

export default EditAbout;
