import { log } from "../../utils/log";

export default function CounterOutput({ value }) {
  log("<CounterOutput /> rendered", 2);

  const colorClasses =
    value >= 0
      ? "border-[#3531cf]/40 bg-[#3531cf]/20 text-[#eceeff]"
      : "border-rose-300/40 bg-rose-500/20 text-rose-100";

  return (
    <span
      className={`inline-flex min-w-20 items-center justify-center rounded-2xl border px-4 py-2 text-2xl font-bold ${colorClasses}`}
    >
      {value}
    </span>
  );
}
