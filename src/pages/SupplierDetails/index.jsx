import { useParams } from "react-router";

export default function SupplierDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h1 className="text-2xl font-semibold">Supplier Details</h1>
      <p className="mt-2 text-muted-foreground">
        Placeholder for supplier #{id} page.
      </p>
    </section>
  );
}
