import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 10;
        return newTime < 0 ? 0 : newTime;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      value={remainingTime}
      max={timer}
      className="mt-1 h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-[#3531cf] [&::-moz-progress-bar]:bg-[#3531cf]"
    />
  );
}
