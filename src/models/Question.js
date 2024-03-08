class Question {
  _question = undefined;
  _answers = [];
  _correctAnswer = undefined;
  _points = undefined;

  constructor({ question, answers, correctAnswer, points }) {
    this.setQuestion(question);
    this.setAnswers(answers);
    this.setCorrectAnswer(correctAnswer);
    this.setPoints(points);
  }

  // ----------------------- Deep Copy methods ---------------------
  static clone(other) {
    return new Question(Question.PlainObject(other));
  }

  static PlainObject(other) {
    return {
      question: other.getQuestion(),
      answers: other.getAnswers(),
      correctAnswer: other.getCorrectAnswer(),
      points: other.getPoints(),
    };
  }
  // ----------------------- x-x-x-x-x-x-x-x-x-x ----------------------

  setQuestion(question) {
    this._question = question;
  }
  getQuestion() {
    return this._question;
  }

  setAnswers(answers) {
    this._answers = answers;
  }
  getAnswers() {
    return this._answers;
  }

  setCorrectAnswer(correctAnswer) {
    this._correctAnswer = correctAnswer;
  }
  getCorrectAnswer() {
    return this._correctAnswer;
  }

  setPoints(points) {
    this._points = points;
  }
  getPoints() {
    return this._points;
  }

  isCorrect(numAnswer) {
    return numAnswer === this.getCorrectAnswer() ? true : false;
  }
}

export { Question };
