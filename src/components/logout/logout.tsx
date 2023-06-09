import { useContext } from "react";
import "./logout.css";
import AuthentifiedContext from "../../utils/contexts/AuthentifiedContext";
function Logout() {
  const authContext = useContext(AuthentifiedContext);
  function disconnect() {
    if (authContext.setToken) {
      authContext.setToken("");
    }
  }

  const logoutIcon = (
    <svg
      className="logout__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
          stroke="var(--firstColor)"
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  );
  return (
    <button className="logout__button" onClick={() => disconnect()}>
      {logoutIcon}
    </button>
  );
}

export default Logout;
