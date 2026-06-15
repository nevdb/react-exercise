import quiz from "../assets/quiz.jpg";
import QuizContent from "../components/quiz/QuizContent";

export default function Quiz() {
  return (
    <>
      <header className="mb-8 rounded-3xl border border-slate-300/15 bg-slate-900/70 p-6 text-center md:p-8">
        <img
          src={quiz}
          alt="Quiz logo"
          className="mx-auto h-24 w-auto rounded-2xl border border-slate-300/20 object-cover"
        />
        <h1 className="mt-4 text-4xl font-bold text-white">Quiz</h1>
        <p className="mt-2 text-slate-300">
          Assess knowledge with a clean, guided question flow.
        </p>
      </header>
      <main>
        <QuizContent />
      </main>
    </>
  );
}
