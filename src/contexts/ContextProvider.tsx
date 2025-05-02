import { PropsWithChildren } from "react";
import TinyBaseProvider from "./TinyBaseProvider";
import SystemProvider from "./SystemProvider";

interface Props extends PropsWithChildren<{}> {}

const ContextProvider = ({ children }: Props) => {
  return (
    <TinyBaseProvider>
      <SystemProvider>{children}</SystemProvider>
    </TinyBaseProvider>
  );
};

export default ContextProvider;
