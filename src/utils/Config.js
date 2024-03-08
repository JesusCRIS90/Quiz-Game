const QUIZ_API = "http://localhost:9000/questions";

const QUIZ_DB_BASE_API = "https://opentdb.com/api.php";

// "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";

const SEC_PER_QUESTION = 30;

const HEADER_INFO = {
  logo: "./logo512.png",
  quizName: "Quiz Game",
};

const ERROR_MSG = {
  error: "Something went wrong! Please Re-Load the Page",
};

export { QUIZ_API, HEADER_INFO, ERROR_MSG, SEC_PER_QUESTION, QUIZ_DB_BASE_API };
