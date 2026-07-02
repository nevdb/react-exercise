import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="m-0  flex justify-end">
      <button
        type="submit"
        className="mt-4 rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-slate-900 hover:brightness-110 disabled:bg-stone-300"
        disabled={pending}
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
