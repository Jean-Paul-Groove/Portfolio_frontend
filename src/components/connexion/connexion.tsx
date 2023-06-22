import "./connexion.css";
import Modal from "../shared/modal/modal";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

function Connexion() {
  const navigate = useNavigate();
  function closeModal() {
    console.log("CloseModal Triggered !!!");
    return navigate("/");
  }
  const [formContent, setFormContent] = useState({
    username: "",
    password: "",
  });
  function handleFormChange(e: React.FormEvent<HTMLInputElement>): void {
    if (formContent && e.currentTarget.name) {
      const newFormContent = {
        ...formContent,
        [e.currentTarget.name]: e.currentTarget.value,
      };
      setFormContent(newFormContent);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formContent);
    const request = JSON.stringify(formContent);
    const response = await fetch(apiURL + "connexion", {
      method: "POST",
      headers: { "Content-type": "Application/JSON" },
      body: request,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const token = JSON.parse(data);
      console.log(token);
    } else {
      alert("Erreur, veuillez réessayer");
    }
  }

  return (
    <Modal toggleModal={closeModal}>
      <form onSubmit={handleSubmit} className="connexion__form">
        <h2>Connexion</h2>
        <label htmlFor="username" className="connexion__form__label">
          Nom d'utilisateur
          <input
            type="text"
            name="username"
            className="connexion__form__input"
            value={formContent.username}
            required
            onInput={handleFormChange}
          />
        </label>
        <label htmlFor="password" className="connexion__form__label">
          {" "}
          Mot de passe
          <input
            type="password"
            name="password"
            className="connexion__form__input"
            value={formContent.password}
            required
            onInput={handleFormChange}
          />
        </label>
        <button type="submit" className="connexion__form__button">
          Valider
        </button>
      </form>
    </Modal>
  );
}
export default Connexion;
