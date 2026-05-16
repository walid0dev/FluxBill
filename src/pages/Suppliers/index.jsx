import { useContext, useState } from "react";
import userAuthContext from "../../contexts/UserAuthContext";
import SupplierList from "./components/SupplierList";
import { FormContextprovider } from "./context";
import { Button } from "./components/Button";
import ButtonAjouterSuppliers from "./components/ButtonAjouterSupplier";
import { SupplierEditProvider } from "./contexts/SupplierEditContext";
import { EditForm } from "./components/editForm";
import FormView from "./components/FormView";

export default function SuppliersPage() {
  const [selected, setSelected] = useState(null);

  const user = useContext(userAuthContext);
  const token = localStorage.getItem("token");

  return (
    <FormContextprovider>
      <section>
        <div className="flex justify-between m-10">
          <h1 className="text-2xl font-semibold">Suppliers</h1>
          <Button />
        </div>

        <SupplierEditProvider>
          <EditForm />
          <SupplierList setSelected={setSelected} />
        </SupplierEditProvider>

        <FormView selected={selected} setSelected={setSelected} />

        <ButtonAjouterSuppliers />
      </section>
    </FormContextprovider>
  );
}
