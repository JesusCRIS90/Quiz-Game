import Body from "../components/Body";
import OneColCenterLayout from "../layouts/OneColCenterLayout";

import QuizProgress from "../components/QuizProgress";
import QuizQuestionBody from "../components/QuizQuestionBody";

import "../styles/QuestionScreen.css";

function QuestionScreen({ info, callbacks }) {
  const QuestionInfo = { ...info, callbacks };
  return (
    <Body className={"body-question"} id={"question"}>
      <OneColCenterLayout>
        <QuizProgress info={QuestionInfo} />
        <QuizQuestionBody info={QuestionInfo} />
      </OneColCenterLayout>
    </Body>
  );
}

export default QuestionScreen;
