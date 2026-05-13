import axios from "axios";
import { isAxiosError } from "axios";
import { redirect } from "react-router";
export async function getDashboardData() {
  const token = localStorage.getItem("token");
  if (!token) {
    redirect("/login");
    return;
  }
  try {
    const res = await axios.get("/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res?.data;

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      switch (e.status) {
        case 401:
          return redirect("/login");

        // should handle all error cases but I'm busy for now
      }
    } else {
      throw new Error("Network error", { cause: e });
    }
  }
}
