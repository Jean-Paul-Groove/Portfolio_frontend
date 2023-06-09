import { createContext } from "react";
let x: React.Dispatch<React.SetStateAction<string>> | undefined;
export const connexionContext = createContext({
  isConnected: false,
  setToken: x,
  token: "",
});
