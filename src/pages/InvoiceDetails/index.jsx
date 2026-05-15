import { useParams } from "react-router";
import { getInvoiceById, addPayement } from "../../api";

import { useState, useEffect } from "react";
export default function InvoiceDetailsPage() {
  const params = useParams();
  console.log("PARAMÈTRES REÇUS :", params);
  const { id } = useParams();
  console.log(id);

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");

  async function fetchInvoice() {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await getInvoiceById(token, id);
    console.log("RÉPONSE API DÉTAILS:", res.data);
    setInvoice(res.data);

    console.log(invoice);
    // if (!res.error) {
    //   setInvoice(res.data.invoice);
    // }
    setLoading(false);
  }

  async function handlePayment(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await addPayement(token, id, {
      amount: Number(amount),
    });
    setAmount("");
    fetchInvoice();
  }

  useEffect(() => {
    fetchInvoice();
  }, []);

  console.log(invoice);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!invoice) return <p className="p-6">Invoice not found</p>;
  console.log("ID FROM URL:", id);
  console.log("invoicee",invoice);
  
  return (
    <section className="p-6 space-y-6">
      {/* HEADER */}
     <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Invoice #{invoice?._id}
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Invoice details and payment information
      </p>
    </div>

    <span
      className={`w-fit px-4 py-1.5 rounded-full text-sm font-medium
      ${
        invoice?.status === "paid"
          ? "bg-green-100 text-green-700"
          : invoice?.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {invoice?.status}
    </span>
  </div>

  <div className="grid gap-4 sm:grid-cols-3">
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-sm text-gray-500">Supplier</p>
      <h3 className="mt-1 font-semibold text-gray-800">
        {invoice?.supplierName || "N/A"}
      </h3>
    </div>

    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-sm text-gray-500">Amount</p>
      <h3 className="mt-1 font-semibold text-gray-800">
        {invoice?.amount} Dh
      </h3>
    </div>

    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-sm text-gray-500">Due Date</p>
      <h3 className="mt-1 font-semibold text-gray-800">
        {new Date(invoice?.dueDate).toLocaleDateString()}
      </h3>
    </div>
  </div>
</div>

      {/* INFO */}
      {/* <div className="border rounded p-4 space-y-2">
        <p>
          <b>Supplier:</b> {invoice.supplier?.name || "N/A"}
        </p>
        <p>
          <b>Amount:</b> ${invoice.amount}
        </p>
        <p>
          <b>Date:</b> {new Date(invoice.dueDate).toLocaleDateString()}
        </p>
      </div> */}

      {/* PAYMENTS LIST */}
      {/* <div>
        <h2 className="font-semibold mb-2">Payments</h2>

        {invoice.payments?.length === 0 ? (
          <p className="text-gray-500">No payments yet</p>
        ) : (
          <ul className="space-y-2">
            {invoice.payments.map((p, i) => (
              <li key={i} className="border p-2 rounded">
                ${p.amount} - {new Date(p.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* ADD PAYMENT */}
      {/* <form onSubmit={handlePayment} className="space-y-2">
        <h2 className="font-semibold">Add Payment</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 rounded w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Payment
        </button>
      </form> */}
    </section>
  );
}
