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
    <div
      id="summary"
      className="max-w-2xl mx-auto my-8 p-8  text-violet-950 rounded-lg"
    >
      <div className="max-w-3xl m-auto p-8 bg-violet-500 rounded-lg text-center items-center flex flex-col ">
        <img
          src={quizCompleted}
          alt="Quiz completed icon"
          className="h-32 w-auto"
        />
        <h2>Quiz Completed!</h2>
        <div className="flex gap-12 w-2/3 my-8 mx-auto pb-8 border-b-2 border-violet-300">
          <p className="flex-1 flex flex-col m-0">
            <span className="font-roboto-condensed text-5xl text-violet-300">
              {skippedAnswersShare}%{" "}
            </span>
            <span className="skipped">skipped</span>
          </p>
          <p className="flex-1 flex flex-col m-0">
            <span className="font-roboto-condensed text-5xl text-violet-300">
              {correctAnswersShare}%{" "}
            </span>
            <span className="skipped">correctly answered</span>
          </p>
          <p className="flex-1 flex flex-col m-0">
            <span className="font-roboto-condensed text-5xl text-violet-300">
              {wrongAnswersShare}%{" "}
            </span>
            <span className="skipped">incorrectly answered</span>
          </p>
        </div>
        <ol>
          {answerDetails.map(({ answer, question, index }) => {
            let cssClass = "user-answer";

            if (answer === null) {
              cssClass += " text-violet-300";
            } else if (answer === question.answers[0]) {
              cssClass += " text-green-700";
            } else {
              cssClass += " text-rose-700";
            }

            return (
              <li className="my-10" key={index}>
                <h3 className="font-roboto-condensed text-base mx-auto flex justify-center items-center bg-violet-800 text-violet-200 w-8 h-8 rounded-full">
                  {index + 1}
                </h3>
                <p className="my-1 text-base text-violet-800">
                  {question.text}
                </p>
                <p className={`"my-1 text-base text-violet-950" ${cssClass}`}>
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
