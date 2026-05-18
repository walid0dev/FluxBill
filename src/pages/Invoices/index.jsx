import { useEffect,useState } from "react";
import { Link } from "react-router";
import { getInvoices,addInvoice } from "../../api";

export default function InvoicesPage() {
  const [invoices,setInvoices]=useState([])
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState(null)
  const [status,setStatus]=useState("")


  const[showForm,setShowForm]=useState(false)
  const[formData,setFormDta]=useState({
    supplierId:"",
    amount:"",
    dueDate:"",
  })
  const[creating,setCreating]=useState(false)


  function handleChange(e){
    setFormDta({
      ...formData,
      [e.target.name]:e.target.value,
    })
  }
  async function handleSubmit(e) {
  e.preventDefault();

  setCreating(true);

  const token = localStorage.getItem("token");

  const result = await addInvoice(token, formData);

  if (result.error) {
    alert(result.error.message);
  } else {

    setInvoices((prev) => [result.data, ...prev]);

    setFormData({
      supplierId: "",
      amount: "",
      dueDate: "",
      status: "unpaid"
    });

    setShowForm(false);
  }

  setCreating(false);
}
  
  useEffect(()=>{
    async function loadInvoices(){
      setLoading(true)
      setError(null)
      const token=localStorage.getItem("token")
      const result=await getInvoices(token,status|| null)
      if(result.error){
        setError(result.error.message)
      } else{
        setInvoices(result.data?.invoices || result.data || [])
        console.log(result.data);
        
      }
      setLoading(false)
    }
    loadInvoices()
  },[status])
  
   if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const getStatusStyle = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "partially_paid":
      return "bg-yellow-100 text-yellow-700";
    case "unpaid":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
console.log("STATUS SENT TO API:", status);
  return (
    <section className="space-y-6 p-6">
<div className="flex items-center justify-between">

  <div className="flex items-center gap-3">

    <select
      className="border rounded px-3 py-2"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">All</option>
      <option value="unpaid">Unpaid</option>
      <option value="partially_paid">Partially Paid</option>
      <option value="paid">Paid</option>
    </select>

    <button
      onClick={() => setShowForm(!showForm)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + New Invoice
    </button>

  </div>

</div>
  {/* Header */}
  {/* <div>
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
      Invoices
    </h1>

    <p className="mt-1 text-sm text-gray-500">
      List of all invoices
    </p>
  </div> */}
  {
  showForm && (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-4"
    >

      <input
        type="text"
        name="supplierId"
        placeholder="Supplier ID"
        value={formData.supplierId}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="unpaid">Unpaid</option>
        <option value="partially_paid">
          Partially Paid
        </option>
        <option value="paid">Paid</option>
      </select>

      <button
        type="submit"
        disabled={creating}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {creating ? "Creating..." : "Create"}
      </button>

    </form>
  )
}

  {/* Grid */}
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    
    {invoices.map((invoice) => (
      
      
      <div
        key={invoice._id || invoice.id}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
      >
        
        {/* Top row */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
           Montant: {invoice.amount} DH
          </h2>

          {/* Status badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium
              ${
               getStatusStyle(invoice.status)
              }`}
          >
            {invoice.status}
          </span>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-700">Due date:</span>{" "}
            {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
        </div>

        {/* Action */}
        <div className="mt-5">
          <Link
           to={`/invoices/${invoice._id || invoice.id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>
  );
}
