import Body from "../components/Body";
import OneColCenterLayout from "../layouts/OneColCenterLayout";

import "../styles/FinishScreen.css";

function FinishScreen({ info }) {
  return (
    <Body className={"body-finish"} id={"finish"}>
      <OneColCenterLayout>
        <p className="result">{Result2String(info)}</p>
        <p className="highscore">{HighScore2String(info)}</p>
      </OneColCenterLayout>
    </Body>
  );
}

function Result2String(info) {
  return (
    "Your Score: " +
    String(info.currentPoinst) +
    " / " +
    String(info.totalPoints) +
    " - (" +
    String(calculatePercentage(info)) +
    "%)"
  );
}

function HighScore2String(info) {
  return "HighScore: " + String(info.highScore) + " points";
}

function calculatePercentage(info) {
  return Math.ceil((info.currentPoinst / info.totalPoints) * 100);
}

export default FinishScreen;
