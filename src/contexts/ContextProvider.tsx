import { PropsWithChildren } from "react";
import TinyBaseProvider from "./TinyBaseProvider";

interface Props extends PropsWithChildren<{}> {}

const ContextProvider = ({ children }: Props) => {
  return <TinyBaseProvider>{children}</TinyBaseProvider>;
};

export default ContextProvider;
