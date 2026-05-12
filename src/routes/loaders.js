import { getUserProfile } from "../api/";
import { redirect } from "react-router";
import { jwtDecode } from "jwt-decode";
export const authLoader = async () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return redirect("/auth/login");
  }
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    return redirect("/auth/login?message=Session expired, please login again");
  }
  const { data, error } = await getUserProfile(token);
  if (error) {
    console.error(error);
    return redirect(
      "/login?message=Failed to fetch user profile, please login again",
    );
  }
  return data;
};
