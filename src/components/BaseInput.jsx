export default function BaseInput({ label, id, error, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-xl border border-slate-400/35 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-[#3531cf] focus:ring-2 focus:ring-[#3531cf]/30"
      />
      <div className="text-red-600">{error && <p>{error}</p>}</div>
    </div>
  );
}
