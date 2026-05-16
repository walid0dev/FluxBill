import axios from "axios";

async function postApi(form) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("not token found");
    const res = await axios.post("/api/suppliers", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export default postApi;
