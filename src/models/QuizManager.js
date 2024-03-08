import { Question } from "./Question";
import { SEC_PER_QUESTION, QUIZ_DB_BASE_API } from "../utils/Config";

class QuizManager {
  _questions = [];
  _currentQuestion = undefined;
  _numberQuestions = undefined;
  _totalPoints = undefined;
  _currentPoints = undefined;
  _state = undefined;
  _remainingSeconds = undefined;
  _highScore = 0;
  _answerSelected = undefined;

  /*
      States Availables:
       - Loading
       - Start
       - Finish
       - PlayNoAnswered
       - PlayAnsweredCorrectly
       - PlayAnsweredIncorrectly
       - Error
    */

  constructor() {
    this.setState("Loading");
  }

  // ----------------------- Deep Copy methods ---------------------
  static clone(other) {
    const newObj = new QuizManager();

    newObj.setQuestions(other.getQuestions());
    newObj.setCurrentQuestion(other.getCurrentQuestion());
    newObj.setTotalPoints(other.getTotalPoints());
    newObj.setCurrentPoints(other.getCurrentPoints());
    newObj.setNumberQuestions(other.getNumberQuestions());
    newObj.setRemainingSeconds(other.getRemainingSeconds());
    newObj.setAswerSelected(other.getAnswerSelected());
    newObj._highScore = other._highScore;
    newObj.setState(other.getState());

    return newObj;
  }

  // ----------------------- x-x-x-x-x-x-x-x-x-x ----------------------

  update(state) {
    switch (state) {
      case "PlayNoAnswered":
        return this.GenerateQuestionObjectInfo();

      case "PlayAnsweredCorrectly":
        return this.GenerateQuestionObjectInfo();

      case "PlayAnsweredIncorrectly":
        return this.GenerateQuestionObjectInfo();

      case "Start":
        return this.GenerateStartObjectInfo();

      case "Finish":
        return this.GenerateFinishObjectInfo();

      case "Loading":
        return {};

      case "Error":
        return {};

      default:
        return {};
    }
  }

  restartQuiz() {
    this.resetQuiz();
    this.setState("Start");
  }

  startQuiz() {
    this.setState("PlayNoAnswered");
  }

  nextQuestion() {
    if (this.getCurrentQuestion() === this.getNumberQuestions() - 1) {
      this.setState("Finish");
      return;
    }
    this._currentQuestion += 1;
    this.setAswerSelected(undefined);
    this.setState("PlayNoAnswered");
  }

  checkAnswer(answer) {
    const isCorrect = this._questions
      .at(this.getCurrentQuestion())
      .isCorrect(answer);
    return isCorrect;
  }

  updateQuestionAnswered(answer) {
    const currentPointQuestion = this._questions
      .at(this.getCurrentQuestion())
      .getPoints();

    this.setAswerSelected(answer);

    if (this.checkAnswer(answer)) {
      this._currentPoints += currentPointQuestion;
      this.setState("PlayAnsweredCorrectly");
    } else {
      this.setState("PlayAnsweredIncorrectly");
    }
  }

  decreaseOneSecond() {
    this.setRemainingSeconds(this.getRemainingSeconds() - 1);
    if (this.getRemainingSeconds() <= 0) {
      this.setState("Finish");
    }
  }

  setData(data) {
    if (data === undefined) return;
    this.clearData();
    // 1 Create Array of Questions
    let totalQuestions = 0;
    let totalPoints = 0;
    data.forEach((question) => {
      this.addQuestion(question);
      totalPoints += question.points;
      totalQuestions += 1;
    });
    // 2 Set Current Question, Total Questions, Total Points, etc
    this.setCurrentQuestion(0);
    this.setCurrentPoints(0);
    this.setTotalPoints(totalPoints);
    this.setNumberQuestions(totalQuestions);
    this.setRemainingSeconds(this.calculateMaxSeconds());
    // 3 Set State as Ready to Start
    this.setState("Start");
  }

  // SETTERS AND GETTERS FUNCTIONS
  setState(newState) {
    this._state = newState;
  }
  getState() {
    return this._state;
  }

  setAswerSelected(answer) {
    this._answerSelected = answer;
  }
  getAnswerSelected() {
    return this._answerSelected;
  }

  setQuestions(questions) {
    this._questions = questions;
  }
  getQuestions() {
    return this._questions;
  }

  setCurrentQuestion(numberQuestion) {
    this._currentQuestion = numberQuestion;
  }
  getCurrentQuestion() {
    return this._currentQuestion;
  }

  getTotalPoints() {
    return this._totalPoints;
  }
  setTotalPoints(points) {
    this._totalPoints = points;
  }

  getCurrentPoints() {
    return this._currentPoints;
  }
  setCurrentPoints(points) {
    this._currentPoints = points;
  }

  getNumberQuestions() {
    return this._numberQuestions;
  }
  setNumberQuestions(number) {
    this._numberQuestions = number;
  }

  getRemainingSeconds() {
    return this._remainingSeconds;
  }
  setRemainingSeconds(seconds) {
    this._remainingSeconds = seconds;
  }

  getHighScore() {
    return this._highScore;
  }

  /* PRIVATE METHODS */
  calculateMaxSeconds() {
    return SEC_PER_QUESTION * this.getNumberQuestions();
  }

  addQuestion(element) {
    this._questions.push(
      new Question({
        question: element.question,
        answers: element.options,
        correctAnswer: element.correctOption,
        points: element.points,
      })
    );
  }

  clearData() {
    this._questions = [];
  }

  resetQuiz() {
    this.setCurrentPoints(0);
    this.setCurrentQuestion(0);
    this.setAswerSelected(undefined);
    this.setRemainingSeconds(this.calculateMaxSeconds());
  }

  getQuestionText() {
    return this._questions.at(this.getCurrentQuestion()).getQuestion();
  }

  getAnswersTextList() {
    const question = this._questions.at(this.getCurrentQuestion());
    return question.getAnswers();
  }

  getCorrectAnswer() {
    const question = this._questions.at(this.getCurrentQuestion());
    return question.getCorrectAnswer();
  }

  updateHighScore() {
    if (this.getCurrentPoints() > this._highScore) {
      this._highScore = this.getCurrentPoints();
    }
    return this;
  }

  GenerateQuestionObjectInfo() {
    return {
      question: this.getQuestionText(),
      answers: this.getAnswersTextList(),
      secondsRemaining: this.getRemainingSeconds(),
      numberQuestions: this.getNumberQuestions(),
      currentQuestion: this.getCurrentQuestion(),
      totalPoints: this.getTotalPoints(),
      currentPoinst: this.getCurrentPoints(),
      state: this.getState(),
      answerSelected: this.getAnswerSelected(),
      correctAnswer: this.getCorrectAnswer(),
      callbacks: undefined,
    };
  }

  GenerateStartObjectInfo() {
    return {
      numberQuestions: this.getNumberQuestions(),
      state: this.getState(),
      secondsRemaining: this.getRemainingSeconds(),
      topic: "React",
      callbacks: undefined,
    };
  }

  GenerateFinishObjectInfo() {
    return {
      state: this.getState(),
      totalPoints: this.getTotalPoints(),
      currentPoinst: this.getCurrentPoints(),
      secondsRemaining: this.getRemainingSeconds(),
      highScore: this.updateHighScore().getHighScore(),
      callbacks: undefined,
    };
  }
}

function decodeHtmlEntities(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
}

function PrepareData(data) {
  let questions = [];
  if (data.response_code !== 0) questions;
  data.results.forEach((elemet) => {
    questions.push(PrepareQuestion(elemet));
  });
  return questions;
}

function PrepareQuestion(question) {
  const Points = Difficulty2Points(question.difficulty);
  const Question = decodeHtmlEntities(question.question);
  const Options = BuildOptions(question);
  const CorrectOption = FindCorrectAnswerIndex(
    Options,
    question.correct_answer
  );

  return {
    question: Question,
    options: Options,
    correctOption: CorrectOption,
    points: Points,
  };
}

function Difficulty2Points(difficulty) {
  if (difficulty === "easy") return 10;
  if (difficulty === "medium") return 20;
  if (difficulty === "hard") return 30;
}

function BuildOptions(data) {
  let options = data.incorrect_answers;
  options.push(data.correct_answer);
  shuffleArray(options);
  options.forEach((option, index, array) => {
    array[index] = decodeHtmlEntities(option);
  });
  return options;
}

function FindCorrectAnswerIndex(options, correctAnswer) {
  return options.indexOf(correctAnswer);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function BuildNewQuestionsURL(data) {
  let url = QUIZ_DB_BASE_API + "?";

  if (data?.amount !== undefined) {
    url += "amount=" + String(data.amount);
  }

  if (data?.category !== undefined) {
    url += "&category=" + String(data.category);
  }

  if (data?.difficulty !== undefined) {
    url += "&difficulty=" + String(data.difficulty);
  }

  url += "&type=multiple";

  return url;
}

export { QuizManager, PrepareData, BuildNewQuestionsURL };
