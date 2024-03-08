import Body from "../components/Body";
import ScreenContainer from "./ScreenContainer";
import OneColCenterLayout from "../layouts/OneColCenterLayout";

import "../styles/ErrorScreen.css";

function ErrorScreen({ info }) {
  return (
    // <ScreenContainer id={"error"} info={info}>
    <Body className={"body-error"} id={"error"}>
      <OneColCenterLayout>
        <p className="error-msg">{info.error}</p>
      </OneColCenterLayout>
    </Body>
    // </ScreenContainer>
  );
}

export default ErrorScreen;
