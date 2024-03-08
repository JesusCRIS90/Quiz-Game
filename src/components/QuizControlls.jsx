import { useEffect } from "react";

import "../styles/QuizControlls.css";

function QuizControlls({ info, callbacks }) {
  const secRemain = info.secondsRemaining;
  const controllsInfo = GenerateControllsObject(info.state, callbacks);

  const Timer = controllsInfo.Timer;
  const Button = controllsInfo.Button;

  useEffect(
    function () {
      const id = CreateTimer(Timer);
      if (id !== undefined) {
        return () => clearInterval(id);
      }
    },
    [Timer]
  );

  if (controllsInfo === undefined) {
    return <></>;
  }

  return (
    <div className="quiz-constrolls">
      <div style={{ opacity: Timer.opacity }} className="time">
        {SecondsRemaining2Text(secRemain)}
      </div>
      <button
        onClick={Button.onClick}
        id={Button.msg}
        style={{ opacity: Button.opacity }}
        className="next-question"
      >
        {Button.msg}
      </button>
    </div>
  );
}

function SecondsRemaining2Text(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  let text = "";

  if (mins < 10) {
    text += "0";
  }
  text += String(mins) + ":";
  if (secs < 10) {
    text += "0";
  }
  text += String(secs);

  return text;
}

function CreateTimer(timer) {
  if (timer.opacity === 1) {
    return setInterval(timer.callback, 1000);
  } else return undefined;
}

function GenerateControllsObject(state, callbacks) {
  switch (state) {
    case "Start":
      return {
        Button: {
          msg: "Start",
          opacity: 1,
          onClick: callbacks.Start,
        },
        Timer: {
          opacity: 0,
          callback: callbacks.TimerUpdate,
        },
      };

    case "Finish":
      return {
        Button: {
          msg: "Reset",
          opacity: 1,
          onClick: callbacks.Finish,
        },
        Timer: {
          opacity: 0,
          callback: callbacks.TimerUpdate,
        },
      };

    case "PlayNoAnswered":
      return {
        Button: {
          msg: "Next",
          opacity: 0,
          onClick: () => {},
        },
        Timer: {
          opacity: 1,
          callback: callbacks.TimerUpdate,
        },
      };

    case "PlayAnsweredCorrectly":
      return {
        Button: {
          msg: "Next",
          opacity: 1,
          onClick: callbacks.Next,
        },
        Timer: {
          opacity: 1,
          callback: callbacks.TimerUpdate,
        },
      };

    case "PlayAnsweredIncorrectly":
      return {
        Button: {
          msg: "Next",
          opacity: 1,
          onClick: callbacks.Next,
        },
        Timer: {
          opacity: 1,
          callback: callbacks.TimerUpdate,
        },
      };

    default:
      return undefined;
  }
}

export default QuizControlls;
