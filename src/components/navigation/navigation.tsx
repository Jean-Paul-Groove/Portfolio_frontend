import "./navigation.css";
import Logout from "../logout/logout";
import { useContext } from "react";
import AuthentifiedContext from "../../utils/contexts/AuthentifiedContext";

function Navigation() {
  const token = useContext(AuthentifiedContext).token;
  return (
    <nav className="navigation">
      {token && <Logout />}

      <ul className="navigation__list">
        <li className="navigation__list__item">
          <a href="#about">A propos </a>
        </li>

        <li className="navigation__list__item">
          {" "}
          <a href="#projects">Projets</a>
        </li>

        <li className="navigation__list__item">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
