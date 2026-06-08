import quiz from "../assets/quiz.jpg";
import QuizContent from "../components/quiz/QuizContent";

export default function Quiz() {
  return (
    <>
      <header className="mb-4">
        <img src={quiz} alt="Quiz logo" className="bg-amber-500" />
        <h1>Quiz</h1>
        <p>Create a quiz.</p>
      </header>
      <main>
        <QuizContent />
      </main>
    </>
  );
}
