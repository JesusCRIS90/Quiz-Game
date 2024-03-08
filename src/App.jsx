import { useState, useEffect } from "react";
import StartScreen from "./pages/StartScreen";
import QuestionScreen from "./pages/QuestionScreen";
import ErrorScreen from "./pages/ErrorScreen";
import FinishScreen from "./pages/FinishScreen";
import Header from "./components/Header.jsx";
import Background from "./components/Background.jsx";

import QuizControlls from "./components/QuizControlls.jsx";

import { getData } from "./utils/FetchingData.js";
import { QUIZ_API, HEADER_INFO, ERROR_MSG } from "./utils/Config.js";

import {
  QuizManager,
  BuildNewQuestionsURL,
  PrepareData,
} from "./models/QuizManager.js";

function App() {
  // const [quizState, setQuizState] = useState("PlayAnsweredIncorrectly");
  const [quizManager, setQuizManager] = useState(new QuizManager());
  // const [quizData, setQuizData] = useState(undefined);

  const quizState = quizManager.getState();
  const appInfo = quizManager.update(quizState);

  function updateTimer() {
    quizManager.decreaseOneSecond();
    setQuizManager(QuizManager.clone(quizManager));
  }

  function onClickAnswerSelected(answer) {
    if (quizManager.getState() === "PlayNoAnswered") {
      quizManager.updateQuestionAnswered(answer);
      setQuizManager(QuizManager.clone(quizManager));
    }
  }

  function onClickStartQuiz() {
    quizManager.startQuiz();
    setQuizManager(QuizManager.clone(quizManager));
  }

  function onClickNextQuestion() {
    quizManager.nextQuestion();
    setQuizManager(QuizManager.clone(quizManager));
  }

  function onClickReStart() {
    quizManager.restartQuiz();
    setQuizManager(QuizManager.clone(quizManager));
  }

  useEffect(() => {
    const askData = async () => {
      // const data = await getData(QUIZ_API);
      const data = await getData(
        BuildNewQuestionsURL({
          amount: 10,
        })
      );
      if (data.status === "error") {
        quizManager.setState("Error");
        setQuizManager(() => QuizManager.clone(quizManager));
      } else {
        quizManager.setData(PrepareData(data.data));
        setQuizManager(() => QuizManager.clone(quizManager));
      }
    };

    if (quizManager.getState() === "Loading") askData();
  }, [quizManager]);

  return (
    <>
      <Background>
        <Header info={HEADER_INFO} />
        {quizState === "Start" && <StartScreen info={appInfo} />}
        {isQuestionState(quizState) && (
          <QuestionScreen info={appInfo} callbacks={onClickAnswerSelected} />
        )}
        {quizState === "Finish" && <FinishScreen info={appInfo} />}
        {quizState === "Error" && <ErrorScreen info={ERROR_MSG} />}
        {drawControlls(quizState) && (
          <QuizControlls
            info={appInfo}
            callbacks={{
              Start: onClickStartQuiz,
              Finish: onClickReStart,
              Next: onClickNextQuestion,
              TimerUpdate: updateTimer,
            }}
          />
        )}
      </Background>
    </>
  );
}

function isQuestionState(state) {
  if (state === "PlayNoAnswered") return true;
  if (state === "PlayAnsweredCorrectly") return true;
  if (state === "PlayAnsweredIncorrectly") return true;
  return false;
}

function drawControlls(state) {
  if (state === "Start") return true;
  if (state === "Finish") return true;
  if (state === "PlayNoAnswered") return true;
  if (state === "PlayAnsweredCorrectly") return true;
  if (state === "PlayAnsweredIncorrectly") return true;
  return false;
}

export default App;
