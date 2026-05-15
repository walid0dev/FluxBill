import React, { useContext, useState } from "react";
import deletApi from "../deletapi";
import ubdetApi from "../ubdetApi";
import { supplierEditFormContext } from "../contexts/SupplierEditContext";
import getSupplierById from "../getbyIdApi";

const Supplier = ({ supplier ,setSelected  }) => {
  const { setSupplierdata, setEditing } = useContext(supplierEditFormContext);
  return (
    <tr className="text-center">
      <td className="border border-gray-300 p-2">{supplier.name}</td>

      <td className="border border-gray-300 p-2">{supplier.email}</td>

      <td className="border border-gray-300 p-2">{supplier.phone}</td>

      <td className="border border-gray-300 p-2">{supplier.contact} </td>

      <td className="border border-gray-300 p-2">
        <div className="flex gap-4 justify-center">
          <i
            onClick={async () => {
              const data = await getSupplierById(supplier.id);
              setSelected(data);
            }}
            className="fa-regular fa-eye cursor-pointer text-blue-500"
          ></i>
          <i
            onClick={() => {
              setEditing(true);
              setSupplierdata({
                name: supplier.name,
                email: supplier.email,
                phone: supplier.phone,
                contact: supplier.contact,
                id: supplier.id,
              });
            }}
            className="fa-solid fa-pen cursor-pointer text-blue-500"
          ></i>
          <i
            onClick={() => deletApi(supplier.id)}
            className="fa-solid fa-trash cursor-pointer text-red-500"
          ></i>
        </div>
      </td>
    </tr>
  );
};

export default Supplier;
