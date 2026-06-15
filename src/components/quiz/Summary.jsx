import quizCompleted from "../../assets/quiz-completed.webp";
import QUESTIONS from "../../data/questions";

export default function Summary({ userAnswers }) {
  const answerDetails = userAnswers
    .map((answer, index) => ({ answer, question: QUESTIONS[index], index }))
    .filter((entry) => Boolean(entry.question));

  const skippedAnswers = answerDetails.filter(({ answer }) => answer === null);
  const correctAnswers = answerDetails.filter(
    ({ answer, question }) => answer === question.answers[0],
  );
  const totalAnswers = answerDetails.length;
  const safeTotalAnswers = totalAnswers || 1;

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / safeTotalAnswers) * 100,
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / safeTotalAnswers) * 100,
  );

  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary" className="mx-auto my-8 max-w-4xl rounded-3xl">
      <div className="flex flex-col items-center rounded-3xl border border-slate-300/15 bg-slate-900/75 p-6 text-center md:p-8">
        <img
          src={quizCompleted}
          alt="Quiz completed icon"
          className="h-28 w-auto"
        />
        <h2 className="mt-3 text-3xl font-bold text-white">Quiz Completed!</h2>
        <div className="my-8 grid w-full gap-4 border-b border-slate-300/20 pb-8 md:w-4/5 md:grid-cols-3 md:gap-8">
          <p className="flex-1 flex flex-col m-0">
            <span className="text-4xl font-bold text-[#d8dcff]">
              {skippedAnswersShare}%
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-300">
              skipped
            </span>
          </p>
          <p className="flex-1 flex flex-col m-0">
            <span className="text-4xl font-bold text-[#d8dcff]">
              {correctAnswersShare}%
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-300">
              correctly answered
            </span>
          </p>
          <p className="flex-1 flex flex-col m-0">
            <span className="text-4xl font-bold text-[#d8dcff]">
              {wrongAnswersShare}%
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-300">
              incorrectly answered
            </span>
          </p>
        </div>
        <ol className="w-full max-w-3xl list-none space-y-6 p-0">
          {answerDetails.map(({ answer, question, index }) => {
            let cssClass = "text-[#eceeff]";

            if (answer === null) {
              cssClass = "text-slate-300";
            } else if (answer === question.answers[0]) {
              cssClass = "text-emerald-300";
            } else {
              cssClass = "text-rose-300";
            }

            return (
              <li
                className="rounded-2xl border border-slate-300/15 bg-slate-950/60 px-4 py-5"
                key={index}
              >
                <h3 className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#3531cf]/20 text-sm font-bold text-[#eceeff]">
                  {index + 1}
                </h3>
                <p className="mt-3 text-base text-slate-100">{question.text}</p>
                <p className={`mt-2 text-base font-semibold ${cssClass}`}>
                  {answer ?? "Skipped"}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
