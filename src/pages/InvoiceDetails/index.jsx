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

  if (!amount || Number(amount) <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    // On envoie un objet complet pour satisfaire le validateur (Erreur 422)
    await addPayement(token, id, {
      amount: Number(amount),
      note: "Paiement Facture", // Ajout d'une note par défaut si elle est obligatoire
      invoiceId: id            // Ajout de l'ID au cas où le schéma le réclame dans le body
    });

    // Si le serveur répond 201 (Succès) :
    setAmount("");       // On vide le champ
    await fetchInvoice(); // On rafraîchit les paiements et le statut à l'écran
    
  } catch (error) {
    
    console.error("Erreur reçue du serveur :", error.response?.data);
    
    
    const serverMessage = error.response?.data?.message || "Validation failed";
    alert(`Erreur : ${serverMessage}`);
  }
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
      {/* PAYMENTS LIST */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">
      Payments
    </h2>

    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
      {invoice.payments?.length || 0} Payments  
    </span>
    {/* accéder à length seulement si invoice.payments existe */}
  </div>

  {invoice.payments?.length === 0 ? (
    <div className="border border-dashed border-gray-300 rounded-xl py-10 text-center">
      <p className="text-gray-500">No payments yet</p>
    </div>
  ) : (
    <ul className="space-y-3">
      {invoice.payments.map((p, i) => (
        <li
          key={i}
          className="flex items-center justify-between border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
        >
          <div>
            <p className="text-sm text-gray-500">
              Payment Date
            </p>

            <p className="font-medium text-gray-800">
              {new Date(p.createdAt).toLocaleDateString()}
            </p>
          </div>

          <h3 className="text-lg font-bold text-green-600">
            {p.amount} DH
          </h3>
        </li>
      ))}
    </ul>
  )}
</div>

     {/* ADD PAYMENT */}
<form
  onSubmit={handlePayment}
  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5"
>
  <div>
    <h2 className="text-2xl font-bold text-gray-900">
      Add Payment
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Register a new payment for this invoice
    </p>
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">
      Payment Amount
    </label>

    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Enter amount"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black focus:border-black transition"
    />
  </div>

  <button
    className="w-full sm:w-auto bg-black text-white font-medium px-5 py-3 rounded-xl hover:bg-gray-800 transition"
  >
    Add Payment
  </button>
</form>
    </section>
  );
}
