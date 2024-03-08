import ProgressBar from "./ProgressBar";

import "../styles/QuizProgress.css";

function QuizProgress({ info }) {
  return (
    <div className="quiz-progress">
      <ProgressBar info={getProgressBarInfo(info)} />
      <p>{getQuestionProgress(info)}</p>
      <p>{getPointsProgress(info)}</p>
    </div>
  );
}

function getQuestionProgress(info) {
  const current = String(info.currentQuestion + 1);
  const total = String(info.numberQuestions);
  return "Question " + current + "/" + total;
}

function getPointsProgress(info) {
  const current = String(info.currentPoinst);
  const total = String(info.totalPoints);
  return "Points " + current + "/" + total;
}

function getProgressBarInfo(info) {
  return {
    MaxValue: info.numberQuestions,
    Value: info.currentQuestion,
  };
}

export default QuizProgress;
