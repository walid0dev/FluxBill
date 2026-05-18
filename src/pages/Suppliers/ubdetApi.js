import axios from "axios";

function ubdetApi(id, data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("token not find");
    const res = axios.put(`/api/suppliers/${id}`, data, {
      //data : fi patch katkon url data li brina nbdlo w config li hiya headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.data;
  } catch (error) {
    console.log("ERROR RESPONSE:", error.response?.data);
    return null;
  }
}
export default ubdetApi;
