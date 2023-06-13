import "./contact.css";
import { useState } from "react";
import apiURL from "../../utils/apiURL";

function Contact() {
  const [formData, setFormData] = useState({ nom: "", email: "", message: "" });
  function changeForm(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (e.currentTarget.name) {
      const prevForm = { ...formData };
      setFormData({
        ...prevForm,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }
  async function postMessage(form: {
    nom: string;
    email: string;
    message: string;
  }) {
    try {
      const request = JSON.stringify(form);
      const response = await fetch(apiURL + "contact", {
        method: "POST",
        body: request,
      });
      if (response.ok) {
        alert("Votre message a bien été envoyé");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData);
    postMessage(formData);
  }

  return (
    <form id="contact" className="contact__form" onSubmit={handleSubmit}>
      <h2>Me contacter</h2>
      <label htmlFor="nom" className="contact__form__label">
        Nom:
        <input
          type="text"
          value={formData.nom}
          name="nom"
          onInput={changeForm}
          placeholder="Votre nom..."
          required
          className="contact__form__input"
        />
      </label>
      <label htmlFor="email" className="contact__form__label">
        E-mail:
        <input
          type="email"
          value={formData.email}
          name="email"
          onInput={changeForm}
          placeholder="Votre email..."
          className="contact__form__input"
          required
        />
      </label>
      <label htmlFor="message" className="contact__form__label">
        Votre message:
        <textarea
          value={formData.message}
          name="message"
          onInput={changeForm}
          placeholder="Votre message..."
          maxLength={500}
          className="contact__form__input"
          required
        />
        <div className="contact__form__input__count">
          {formData.message.length + " /500"}
        </div>
      </label>

      <button type="submit" className="contact__form__button">
        Envoyer
      </button>
    </form>
  );
}

export default Contact;
