export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  return (
    <ul className="list-none m-0 p-0 flex flex-col items-center gap-2">
      {answers.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = "";

        if (answerState === "answered" && isSelected) {
          cssClasses = "!bg-amber-400 !text-slate-950";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses =
            answerState === "correct"
              ? "!bg-emerald-500 !text-white"
              : "!bg-rose-500 !text-white";
        }

        return (
          <li key={answer} className="w-[90%] mx-auto">
            <button
              className={`inline-block w-full rounded-xl border border-slate-300/20 bg-slate-800 px-8 py-4 text-sm font-semibold text-slate-100 transition hover:border-[#3531cf]/40 hover:bg-[#3531cf]/20 disabled:cursor-not-allowed disabled:opacity-60 ${cssClasses}`}
              onClick={() => onSelect(answer)}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
