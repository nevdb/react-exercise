import { useState } from "react";
import { log } from "../utils/log.js";
import logoImg from "../assets/logo.png";

import CounterContent from "../components/counter/ContentCounter.jsx";
// import Header from "./components/Header";
import ConfigureCounter from "../components/counter/ConfigureCounter.jsx";

export default function Counter() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <header className="mb-8 rounded-3xl border border-slate-300/15 bg-slate-900/70 p-6 md:p-8">
        <img
          src={logoImg}
          className="h-12 w-auto rounded-lg bg-slate-950/60 p-1"
          alt="Magnifying glass analyzing a document"
        />
        <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Counter Studio
        </h1>
        <p className="mt-2 text-slate-300">
          Interactive counter with performance-aware rendering details.
        </p>
      </header>
      <main className="space-y-6">
        <ConfigureCounter onSet={handleSetCount} />
        <CounterContent key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}
