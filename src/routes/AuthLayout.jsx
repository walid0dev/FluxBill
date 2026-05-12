import { Outlet } from "react-router";
import SideBar from "../components/SideBar";
export default function AuthLayout() {
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full ">
        <SideBar />
        <section className="min-w-0 flex-1 rounded-xl border border-border bg-card shadow-sm ">
          <Outlet />
        </section>
      </main>
    </div>

  );
}
