import Logo from "./Logo";

import "../styles/Header.css";

function Header({ info }) {
  return (
    <header className="header-quiz">
      <Logo logo={info.logo} />
      <h1>{info.quizName}</h1>
    </header>
  );
}

export default Header;
