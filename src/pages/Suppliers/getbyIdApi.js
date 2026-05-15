import axios from "axios";

async function getSupplierById(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `/api/suppliers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.data;
  } catch (error) {
    return null;
  }
}

export default getSupplierById;
