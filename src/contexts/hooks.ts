import { useContext } from "react";
import { SystemContext } from "./SystemProvider";

export const useSystemContext = () => useContext(SystemContext);
