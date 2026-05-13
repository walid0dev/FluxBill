import { useContext } from "react";
import userAuthContext from "../../contexts/UserAuthContext";
import { useNavigate } from "react-router";
import SupplierList from "./components/SupplierList";
import { formContext, FormContextprovider } from "./context";
import { Button } from "./components/Button";
import ButtonAjouterSuppliers from "./components/ButtonAjouterSupplier";
export default function SuppliersPage() {
  const user = useContext(userAuthContext);
  const token = localStorage.getItem("token");
  return (
    <FormContextprovider>
      <section>
        <div className="flex justify-between m-10">
          <h1 className="text-2xl font-semibold">Suppliers</h1>
          <Button />
        </div>

        <SupplierList />
        <ButtonAjouterSuppliers />
      </section>
    </FormContextprovider>
  );
}
