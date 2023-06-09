import "./App.css";
import { updateThemeColors } from "./utils/updateThemeColors";
import { useState, useEffect } from "react";
import { themeContext } from "./utils/themeContext";
import { connexionContext } from "./utils/connexionContext";
import { Theme } from "./@types/Theme";
import Projects from "./components/projects/projects";
import Navigation from "./components/navigation/navigation";
import ToggleTheme from "./components/toggleTheme/toggleTheme";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ConnexionLink from "./components/connexion/connexionLink/connexionLink";
import apiURL from "./utils/variables";

function App() {
  const [theme, setTheme] = useState({
    themeName: "light",
    currentColor: `var(--lightColor)`,
    currentBackground: `var(--lightBackground)`,
    secondColor: `var(--darkColor)`,
    secondBackground: `var(--darkBackground)`,
  });

  const toggleTheme = (theme: Theme) => {
    const updatedTheme = updateThemeColors(theme.themeName);
    setTheme(updatedTheme);
  };
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState("");

  async function checkToken(token: string) {
    try {
      const response = await fetch(apiURL + "auth/check-token", {
        method: "POST",
        headers: { authorization: `bearer ${token}` },
      });
      const { tokenValidity } = await response.json();
      if (tokenValidity === true) {
        setIsConnected(true);
      } else {
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function disconnectUser(): void {
    sessionStorage.removeItem("token");
    setToken("");
    setIsConnected(false);
  }
  useEffect(() => {
    if (!isConnected) {
      console.log("disconnected");
      if (token) {
        console.log("token found");
        checkToken(token);
        console.log("useEffect from App triggered");
      } else {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
          console.log("token in storage");
          setToken(storedToken);
        }
        console.log("pas de token ? ");
      }
    }
  }, [token, isConnected]);

  return (
    <div className="app">
      <themeContext.Provider value={theme}>
        <connexionContext.Provider
          value={{ isConnected: isConnected, setToken: setToken, token: token }}
        >
          <Navigation />
          <ConnexionLink disconnectUser={disconnectUser} />
          <ToggleTheme toggleTheme={toggleTheme} />
          <About />
          <Projects />
          <Contact />
        </connexionContext.Provider>
      </themeContext.Provider>
    </div>
  );
}

export default App;
