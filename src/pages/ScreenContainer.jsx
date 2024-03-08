import Header from "../components/Header";
import Background from "../components/Background";

import "../styles/Layouts.css";

function ScreenContainer({ children, id, info }) {
  return (
    <div className="screen-container-page" id={id}>
      {children}
    </div>
  );
}

export default ScreenContainer;
