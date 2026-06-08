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
          cssClasses = "bg-amber-500 text-stone-950 ";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="w-[90%] mx-auto">
            <button
              className={` inline-block w-full  text-sm px-8 py-4 rounded-xl bg-indigo-600 hover:bg-amber-500 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed ${cssClasses}`}
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
