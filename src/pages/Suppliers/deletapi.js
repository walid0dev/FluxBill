import axios from "axios";

async function deletApi(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("not token ");
    const res = await axios.delete(`/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.data;
  } catch (error) {
    return null;
  }
}
export default deletApi;