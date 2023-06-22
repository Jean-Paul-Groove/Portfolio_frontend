import { Dispatch, SetStateAction, createContext } from "react";

export type AuthentifiedContextType = {
  token: string;
  setToken: undefined | Dispatch<SetStateAction<string>>;
};

const AuthentifiedContext = createContext<AuthentifiedContextType>({
  token: "",
  setToken: undefined,
});

export default AuthentifiedContext;
