function FormView({ selected, setSelected }) {
  return (
    <>
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              Supplier Info
            </h2>

            <p><b>Name:</b> {selected.name}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Phone:</b> {selected.phone}</p>
            <p><b>Contact:</b> {selected.contact}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default FormView;
