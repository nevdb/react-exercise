import { use } from "react";

import { Opinion } from "./Opinion";
import { OpinionsContext } from "../../store/opinions-context";

export default function Opinions() {
  const { opinions } = use(OpinionsContext);
  const isLoading = opinions === undefined;
  const hasOpinions = Array.isArray(opinions) && opinions.length > 0;

  return (
    <section className="rounded-2xl border border-slate-300/20 bg-slate-900/60 p-5 shadow-[0_10px_28px_rgba(2,6,23,0.35)]">
      <h2 className="m-0 text-2xl font-bold text-slate-100">User Opinions</h2>
      {isLoading && <p className="mt-3 text-slate-300">Loading opinions...</p>}
      {hasOpinions && (
        <ul className="mt-4 space-y-3 p-0">
          {opinions.map((o) => (
            <li key={o.id} className="list-none">
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !hasOpinions && (
        <p className="mt-3 text-slate-300">
          No opinions found. Maybe share your opinion on something?
        </p>
      )}
    </section>
  );
}
