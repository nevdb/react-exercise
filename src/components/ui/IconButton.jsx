import { log } from "../../utils/log";

export default function IconButton({ children, icon, ...props }) {
  log("<IconButton /> rendered", 2);

  const Icon = icon;
  return (
    <button
      {...props}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300/30 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-[#3531cf]/50 hover:bg-[#3531cf]/15"
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </button>
  );
}
