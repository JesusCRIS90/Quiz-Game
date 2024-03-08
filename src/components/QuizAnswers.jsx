import "../styles/QuizAnswers.css";

function QuizAnswers({ info }) {
  const answerOptions = info.answers;
  const onClickAnswer = info.callbacks;

  return (
    <div className="quiz-answers">
      <button
        onClick={() => {
          onClickAnswer(0);
        }}
        id={getAnswerState(info, 0)}
        className="btn btn-answer"
      >
        {answerOptions[0]}
      </button>
      <button
        onClick={() => {
          onClickAnswer(1);
        }}
        id={getAnswerState(info, 1)}
        className="btn btn-answer"
      >
        {answerOptions[1]}
      </button>
      <button
        onClick={() => {
          onClickAnswer(2);
        }}
        id={getAnswerState(info, 2)}
        className="btn btn-answer"
      >
        {answerOptions[2]}
      </button>
      <button
        onClick={() => {
          onClickAnswer(3);
        }}
        id={getAnswerState(info, 3)}
        className="btn btn-answer"
      >
        {answerOptions[3]}
      </button>
    </div>
  );
}

function getAnswerState(info, answerNumber) {
  if (info.state === "PlayNoAnswered") return "";

  if (info.state === "PlayAnsweredCorrectly") {
    if (info.answerSelected === answerNumber) return "correct";
    else return "";
  }

  if (info.state === "PlayAnsweredIncorrectly") {
    if (info.correctAnswer === answerNumber) return "correct";
    if (info.answerSelected === answerNumber) return "incorrect";
  }
}

export default QuizAnswers;
