import { useParams } from "react-router";

export default function InvoiceDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h1 className="text-2xl font-semibold">Invoice Details</h1>
      <p className="mt-2 text-muted-foreground">
        Placeholder for invoice #{id} with payments.
      </p>
    </section>
  );
}
