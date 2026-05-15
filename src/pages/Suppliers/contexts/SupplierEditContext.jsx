import { createContext, useState } from "react";

export const supplierEditFormContext = createContext(null);

export const SupplierEditProvider = ({ children }) => {
  const [editing, setEditing] = useState(false);
  const [supplierdata, setSupplierdata] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });

  return (
    <supplierEditFormContext.Provider
      value={{ editing, setEditing, supplierdata, setSupplierdata }}
    >
      {children}
    </supplierEditFormContext.Provider>
  );
};
