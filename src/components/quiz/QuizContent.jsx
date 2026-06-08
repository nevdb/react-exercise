import { useState, useCallback, Fragment } from "react";

import QUESTIONS from "../../data/questions.js";
import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import Summary from "./Summary.jsx";

export default function QuizContent() {
  const [answerState, setAnswerState] = useState(""); // "", "answered", "correct", "wrong"
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  const [shuffledAnswers, setShuffledAnswers] = useState(() =>
    shuffleArray(QUESTIONS[0].answers),
  );

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      // Ignore extra clicks/timeouts while feedback is being shown.
      if (answerState !== "") {
        return;
      }

      // Lock UI to current question & show "answered" state
      setAnswerState("answered");

      // We'll compute nextIndex as soon as we push the answer
      let nextIndex;
      setUserAnswers((prevUserAnswers) => {
        nextIndex = prevUserAnswers.length + 1;
        return [...prevUserAnswers, selectedAnswer];
      });

      // After a short delay, show correctness for the *current* question
      setTimeout(() => {
        const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0];
        if (selectedAnswer === correctAnswer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        // After the feedback phase, advance to the next question and reshuffle its answers
        setTimeout(() => {
          setAnswerState(""); // this will make activeQuestionIndex = nextIndex

          // Only update shuffled answers if we still have a next question
          if (nextIndex < QUESTIONS.length) {
            setShuffledAnswers(shuffleArray(QUESTIONS[nextIndex].answers));
          }
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex, answerState], // we use it to check correctness after 1s
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div className="max-w-3xl m-auto p-8 bg-violet-500 rounded-lg text-center">
      <div id="question">
        <Fragment key={activeQuestionIndex}>
          <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
          <h2 className="text-amber-100">
            {QUESTIONS[activeQuestionIndex].text}
          </h2>
          <Answers
            answers={shuffledAnswers}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            answerState={answerState}
            onSelect={handleSelectAnswer}
          />
        </Fragment>
      </div>
    </div>
  );
}
``;
