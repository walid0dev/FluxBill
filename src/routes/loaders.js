import { getUserProfile } from "../api/";
import { redirect } from "react-router";
import { jwtDecode } from "jwt-decode";
import { use } from "react";
const AuthLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    return redirect("/login?message=Session expired, please login again");
  }
  const user = {id:13028302, name:"john"}

  return user

};
