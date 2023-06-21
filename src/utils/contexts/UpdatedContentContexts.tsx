import { createContext } from "react";

type UpdatedContentContextType = {
  updatedAboutContent: number;
  incrementUpdatedAboutContent: undefined | (() => void);
  updatedProjectsContent: number;
  incrementUpdatedProjectsContent: undefined | (() => void);
};
const defaultContext = {
  updatedAboutContent: 0,
  incrementUpdatedAboutContent: undefined,
  updatedProjectsContent: 0,
  incrementUpdatedProjectsContent: undefined,
} as UpdatedContentContextType;

const UpdatedContentContext = createContext(defaultContext);

export default UpdatedContentContext;
