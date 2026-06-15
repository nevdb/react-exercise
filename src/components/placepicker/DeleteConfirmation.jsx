import { useEffect } from "react";

import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Are you sure?</h2>
      <p className="text-sm text-slate-700">
        Do you really want to remove this place?
      </p>
      <div className="mt-2 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-full border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="rounded-full bg-[#3531cf] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d29ad]"
        >
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
