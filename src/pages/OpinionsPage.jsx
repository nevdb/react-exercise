import Opinions from "../components/opinions/Opinions.jsx";
import { NewOpinion } from "../components/opinions/NewOpinion.jsx";
import { OpinionsContextProvider } from "../store/opinions-context.jsx";

export default function OpinionsPage() {
  return (
    <>
      <main className="space-y-6 pb-10 pt-2">
        <section className="overflow-hidden rounded-2xl border border-amber-200/30 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-teal-950/60 px-6 py-7 shadow-[0_18px_45px_rgba(2,6,23,0.4)]">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Community board
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-100 md:text-4xl">
            Opinions
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
            Share your perspective, discover what others think, and vote on the
            ideas that resonate with you.
          </p>
        </section>

        <OpinionsContextProvider>
          <section className="grid gap-4 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] lg:items-start">
            <NewOpinion />
            <Opinions />
          </section>
        </OpinionsContextProvider>
      </main>
    </>
  );
}
