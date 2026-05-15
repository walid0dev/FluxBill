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
      <div>
        <h1 className="text-2xl font-bold">
          Invoice #{invoice?._id || invoice?._id}
        </h1>

        <p className="text-gray-500">Status: {invoice?.status}</p>
        <div className="border rounded p-4 space-y-2">
        <p>
          <b>Supplier:</b> {invoice.supplierName || "N/A"}
        </p>
        <p>
          <b>Amount:</b> {invoice.amount} Dh
        </p>
        <p>
          <b>Date:</b> {new Date(invoice.dueDate).toLocaleDateString()}
        </p>
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
