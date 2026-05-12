import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full ">
        <Outlet />
      </main>
    </div>
  );
}
