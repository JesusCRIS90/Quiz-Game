import Body from "../components/Body";
import ScreenContainer from "./ScreenContainer";
import OneColCenterLayout from "../layouts/OneColCenterLayout";

import "../styles/StartScreen.css";

function StartScreen({ info }) {
  return (
    <Body className={"body-start"} id={"start"}>
      <OneColCenterLayout>
        <h2> Welcome to this Quiz Game </h2>
        <h3>
          {/* {info.numberQuestions} Questions about {info.topic} */}
          {info.numberQuestions} Questions to Test your Knowledge
        </h3>
      </OneColCenterLayout>
    </Body>
  );
}

export default StartScreen;
