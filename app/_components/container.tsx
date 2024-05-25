import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full max-w-7xl">{children}</div>;
};

export default Container;
