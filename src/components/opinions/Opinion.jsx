import { use, useOptimistic } from "react";

import IconButton from "../ui/IconButton.jsx";
import MinusIcon from "../ui/MinusIcon.jsx";
import PlusIcon from "../ui/PlusIcon.jsx";
import { OpinionsContext } from "../../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1),
  );

  async function handleUpvoteAction() {
    setVotesOptimistically("up");
    await upvoteOpinion(id);
  }

  async function handleDownvoteAction() {
    setVotesOptimistically("down");
    await downvoteOpinion(id);
  }

  return (
    <article className="rounded-xl border border-slate-400/25 bg-gradient-to-br from-slate-900/95 to-slate-800/70 p-4 shadow-[0_10px_22px_rgba(2,6,23,0.35)]">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 text-lg font-semibold text-slate-100">{title}</h3>
        <p className="m-0 text-xs uppercase tracking-[0.1em] text-cyan-300">
          by <strong>{userName}</strong>
        </p>
      </header>

      <p className="my-3 text-sm leading-6 text-slate-300">{body}</p>

      <form className="flex flex-wrap items-center gap-2 border-t border-slate-400/20 pt-3">
        <IconButton icon={PlusIcon} formAction={handleUpvoteAction}>
          Upvote
        </IconButton>
        <IconButton icon={MinusIcon} formAction={handleDownvoteAction}>
          Downvote
        </IconButton>
        <p className="ml-auto rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-200">
          Votes: {optimisticVotes}
        </p>
      </form>
    </article>
  );
}

export default Opinion;
