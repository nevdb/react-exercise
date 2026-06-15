export default function Error({ title, message, onConfirm }) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-rose-300/45 bg-rose-950/40 p-5 text-rose-100">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm">{message}</p>
      {onConfirm && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onConfirm}
            className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
