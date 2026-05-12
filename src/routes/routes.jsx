import { createBrowserRouter } from "react-router";
import {
  AuthLayout,
  DashboardRoute,
  InvoiceDetailsRoute,
  InvoicesRoute,
  LoginRoute,
  NotFoundRoute,
  RegisterRoute,
  SupplierDetailsRoute,
  SuppliersRoute,
  PublicLayout,
} from "./index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <DashboardRoute /> },
      { path: "login", element: <LoginRoute /> },
      { path: "register", element: <RegisterRoute /> },
      { path: "suppliers", element: <SuppliersRoute /> },
      {
        path: "suppliers/:id",
        element: <SupplierDetailsRoute />,
      },

      { path: "invoices", element: <InvoicesRoute /> },
      { path: "invoices/:id", element: <InvoiceDetailsRoute /> },
      { path: "*", element: <NotFoundRoute /> },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "login", element: <LoginRoute /> },
      { path: "register", element: <RegisterRoute /> },
      { path: "*", element: <NotFoundRoute /> },
    ],
  },
]);

export default router;
