import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import supplier from "../apiGet";
import userAuthContext from "../../../contexts/UserAuthContext";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loding, setLoding] = useState(true);

  const user = useContext(userAuthContext);
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
  console.log(supplier.contact);
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
              <tr key={supplier.id} className="text-center">
                <td className="border border-gray-300 p-2">{supplier.name}</td>

                <td className="border border-gray-300 p-2">{supplier.email}</td>

                <td className="border border-gray-300 p-2">{supplier.phone}</td>

                <td className="border border-gray-300 p-2">{supplier.contact} </td>

                <td className="border border-gray-300 p-2">
                  <div className="flex gap-4 justify-center">
                    <i className="fa-regular fa-eye cursor-pointer text-blue-500"></i>
                    <i className="fa-solid fa-pen cursor-pointer text-blue-500"></i>
                    <i className="fa-solid fa-trash cursor-pointer text-red-500"></i>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
