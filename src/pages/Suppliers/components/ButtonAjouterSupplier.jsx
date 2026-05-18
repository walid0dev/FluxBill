import axios from "axios";
import { useContext, useState } from "react";
import { formContext } from "../context";
import postApi from "../apiPost";

export default function ButtonAjouterSuppliers() {
  const {setForm, isFormOpen } = useContext(formContext);

  const [form, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handlSubmite = async (e) => {
  e.preventDefault();

  try {
    const result = await postApi(form);

    if (result) {
      console.log("Supplier created:", result);

      setForm(false);

      setFormState({
        name: "",
        email: "",
        phone: "",
        contact: "",
      });
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
<div className="flex gap-20 justify-center">

            <h1 className="text-2xl mb-4 text-center font-bold">
              Ajouter Fournisseur
            </h1>
            <button className="flex gap-20 justify-center cursor-pointer" onClick={() => setForm(!isFormOpen)}>close</button>
</div>

            <form
              onSubmit={handlSubmite}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="phone"
                name="phone"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="contact"
                name="contact"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <button type="submit" className="bg-orange-500 text-white p-3 rounded-lg">
                Save
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
