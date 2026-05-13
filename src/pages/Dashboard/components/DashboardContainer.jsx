import { Suspense } from "react";
import { FadeLoader } from "react-spinners";
import { getDashboardData } from "../utils/";
import Dashboard from "./Dashboard";
const DashboardContainer = () => {
  const getDashboardDataPromise = getDashboardData();
  return (
    <Suspense
      fallback={
        <section className="grid min-h-[60vh] place-items-center">
          <FadeLoader color="var(--primary)" />
        </section>
      }
    >
      <Dashboard getDashboardDataPromise={getDashboardDataPromise}></Dashboard>
    </Suspense>
  );
};

export default DashboardContainer;
