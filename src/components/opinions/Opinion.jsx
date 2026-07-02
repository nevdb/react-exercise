import { use } from "react";

import IconButton from "../ui/IconButton.jsx";
import MinusIcon from "../ui/MinusIcon.jsx";
import PlusIcon from "../ui/PlusIcon.jsx";
import { OpinionsContext } from "../../store/opinions-context";

export function Opinion({ opinion }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  return (
    <article className="rounded-xl border border-slate-400/25 bg-gradient-to-br from-slate-900/95 to-slate-800/70 p-4 shadow-[0_10px_22px_rgba(2,6,23,0.35)]">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 text-lg font-semibold text-slate-100">
          {opinion.title}
        </h3>
        <p className="m-0 text-xs uppercase tracking-[0.1em] text-cyan-300">
          by <strong>{opinion.userName}</strong>
        </p>
      </header>

      <p className="my-3 text-sm leading-6 text-slate-300">{opinion.body}</p>

      <form className="flex flex-wrap items-center gap-2 border-t border-slate-400/20 pt-3">
        <IconButton icon={PlusIcon} onClick={() => upvoteOpinion(opinion.id)}>
          Upvote
        </IconButton>
        <IconButton
          icon={MinusIcon}
          onClick={() => downvoteOpinion(opinion.id)}
        >
          Downvote
        </IconButton>
        <p className="ml-auto rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-200">
          Votes: {opinion.votes}
        </p>
      </form>
    </article>
  );
}

export default Opinion;
