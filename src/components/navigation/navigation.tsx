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
        <a href="#about">
          <li className="navigation__list__item">A propos</li>
        </a>
        <a href="#projects">
          <li className="navigation__list__item"> Projets</li>
        </a>
        <a href="#contact">
          <li className="navigation__list__item">Contact</li>
        </a>
      </ul>
    </nav>
  );
}

export default Navigation;
