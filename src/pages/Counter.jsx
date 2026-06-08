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
      <header id="main-header">
        <img
          src={logoImg}
          className="h-10 w-auto"
          alt="Magnifying glass analyzing a document"
        />
        <h1>React - Behind The Scenes</h1>
      </header>
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <CounterContent key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}
