import { useContext } from "react";
import { supplierEditFormContext } from "../contexts/SupplierEditContext";
import ubdetApi from "../ubdetApi";

export const EditForm = () => {
  const { editing, setEditing, supplierdata, setSupplierdata } = useContext(
    supplierEditFormContext,
  );

  const { name, email, phone, contact } = supplierdata;

  const handleChange = (e) => {
    setSupplierdata({
      ...supplierdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlSubmite = async (e) => {
    e.preventDefault();

    const updated = await ubdetApi(supplierdata.id, {  name: supplierdata.name,
                email: supplierdata.email,
                phone: supplierdata.phone,
                contact: supplierdata.contact,});

    if (updated) {
      setEditing(false);
    }
  };

  return (
    <>
      {editing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <div className="flex gap-20 justify-center">
              <h1 className="text-2xl mb-4 text-center font-bold">
                Edit Fournisseur
              </h1>
              <button
                className="flex gap-20 justify-center cursor-pointer"
                onClick={() => setEditing(false)}
              >
                close
              </button>
            </div>

            <form onSubmit={handlSubmite} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                className="border p-2 rounded-lg"
                value={name || ""}
              />

              <input
                value={email || ""}
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                value={phone || ""}
                type="text"
                placeholder="phone"
                name="phone"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                value={contact || ""}
                type="text"
                placeholder="contact"
                name="contact"
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <button
                type="submit"
                className="bg-orange-500 text-white p-3 rounded-lg"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
