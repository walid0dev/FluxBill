export default function ClearStorageButton() {
  const handleClearStorage = () => {
    window.localStorage.clear();
  };

  return (
    <button
      type="button"
      onClick={handleClearStorage}
      className="fixed bottom-4 right-4 z-50 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
    >
      Clear localStorage
    </button>
  );
}
