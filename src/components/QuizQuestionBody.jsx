import QuizQuestion from "./QuizQuestion";
import QuizAnswers from "./QuizAnswers";

function QuizQuestionBody({ info }) {
  const answersObject = {
    ...info,
    callbacks: info.callbacks,
  };

  return (
    <div className="quiz-question-body">
      <QuizQuestion question={info.question} />
      <QuizAnswers info={answersObject} />
    </div>
  );
}

export default QuizQuestionBody;
