import { useState } from "react";

export default function ConfigureCounter({ onSet }) {
  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section
      id="configure-counter"
      className="mx-auto flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-300/20 bg-slate-900/65 p-4 text-center"
    >
      <h2 className="my-1 text-sm font-bold uppercase tracking-[0.12em] text-[#d8dcff]">
        Set Counter
      </h2>
      <input
        type="number"
        onChange={handleChange}
        value={enteredNumber}
        className="w-20 rounded-lg border border-slate-400/35 bg-slate-950 px-2 py-2 text-center text-base text-slate-100 outline-none transition focus:border-[#3531cf] focus:ring-2 focus:ring-[#3531cf]/30"
      />
      <button
        onClick={handleSetClick}
        className="cursor-pointer rounded-full bg-[#f5ff56] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#e9f73a]"
      >
        Set
      </button>
    </section>
  );
}
