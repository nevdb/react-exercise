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
      className="my-8 mx-auto p-0 rounded-md text-center flex gap-2 items-center justify-center border-1 border-teal-500"
    >
      <h2 className="my-2 text-base font-bold text-teal-500">Set Counter</h2>
      <input
        type="number"
        onChange={handleChange}
        value={enteredNumber}
        className="w-16 text-center m-2 px-1 py-2 border border-teal-500 rounded bg-teal-950 text-teal-500 text-base"
      />
      <button
        onClick={handleSetClick}
        className="cursor-pointer bg-transparent text-teal-300 border-0 hover:text-teal-600 border hover:border-teal-600"
      >
        Set
      </button>
    </section>
  );
}
