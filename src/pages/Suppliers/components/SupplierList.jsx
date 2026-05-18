import { useEffect, useState } from "react";
import axios from "axios";
import Supplier from "./SupplierCard";

export default function SupplierList({ setSelected }) {
  const [suppliers, setSuppliers] = useState([]);
  const [loding, setLoding] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/suppliers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuppliers(res.data.data);
        setLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setLoding(false);
      });
  }, [token]);
  // console.log(supplier.contact);
  // console.log(suppliers);
  // console.log(suppliers);

  return (
    <div className="p-6">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">contact</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loding ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            suppliers.map((supplier) => (
              <Supplier
                key={supplier.id}
                supplier={supplier}
                setSelected={setSelected}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
