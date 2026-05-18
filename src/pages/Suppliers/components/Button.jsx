import { useContext } from "react";
import { formContext } from "../context";

export const Button = () => {
  const { setForm, isFormOpen } = useContext(formContext);

  return (
    <button
      onClick={() => setForm(!isFormOpen)}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
    >
      ajouter Suppliers
    </button>
  );
};
