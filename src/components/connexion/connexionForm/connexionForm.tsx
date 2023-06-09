import "./connexionForm.css";
import { useState, useContext } from "react";
import apiURL from "../../../utils/variables";
import { connexionContext } from "../../../utils/connexionContext";

function ConnexionForm(props: { toggleConnexionForm: (b: boolean) => void }) {
  const [password, setPassword] = useState("");
  const { toggleConnexionForm } = props;
  function changePassword(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  const { setToken } = useContext(connexionContext);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const request = JSON.stringify({
        password: password,
      });
      const response = await fetch(apiURL + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: request,
      });
      if (!response.ok) {
        alert("Mauvais mot de passe");
      } else {
        const data = await response.json();
        const token: string = data.token;
        sessionStorage.setItem("token", token);
        if (setToken) {
          setToken(token);
        }
      }
      toggleConnexionForm(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="connexionForm__wrapper"
      onClick={() => {
        toggleConnexionForm(true);
      }}
    >
      <form
        className="connexionForm__form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <label htmlFor="password" className="connexionForm__label">
          Mot de passe
        </label>
        <input
          className="connexionForm__input"
          type="password"
          name="password"
          onChange={changePassword}
          value={password}
        />
        <button className="connexionForm__button" type="submit">
          {" "}
          Connexion{" "}
        </button>
      </form>
    </div>
  );
}

export default ConnexionForm;
