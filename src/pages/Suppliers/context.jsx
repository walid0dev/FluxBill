import { createContext, useState } from "react";

export const formContext = createContext();

export function FormContextprovider(props) {
  const [isFormOpen, setForm] = useState(false);

  return (
    <formContext.Provider value={{ isFormOpen, setForm }}>
      {props.children}
    </formContext.Provider>
  );
}
