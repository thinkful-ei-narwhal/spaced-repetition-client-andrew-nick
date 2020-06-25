import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import LanguageApiService from "../../services/language-api-service";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import TokenService from "../../services/token-service";

class LearningRoute extends Component {
  static contextType = LearningContext;

  componentDidMount() {
    this.context.reset();

    LanguageApiService.getHead()
      .then((head) => {
        this.context.setTotalScore(head.totalScore);
        this.context.setWordCorrectCount(head.wordCorrectCount);
        this.context.setWordIncorrectCount(head.wordIncorrectCount);
        this.context.setNextWord(head.nextWord);
      })
      .catch((error) => {
        if (error.error === "Unauthorized request") {
          TokenService.clearAuthToken();
          this.props.history.push("/login");
        }
        this.context.setError(error);
      });
  }

  onSubmit(e, context) {
    e.preventDefault();
    const value = e.target.guessInput.value;
    e.target.guessInput.value = "";
    LanguageApiService.postGuess(value)
      .then((res) => {
        context.setAnswer(res.answer);
        context.setIsCorrect(res.isCorrect);
        context.setNextWord(res.nextWord);
        context.setTotalScore(res.totalScore);
        context.setWordCorrectCount(res.wordCorrectCount);
        context.setWordIncorrectCount(res.wordIncorrectCount);
        return;
      })
      .catch((err) => this.context.setError(err));
  }

  render() {
    const { error } = this.context;
    const showQuestion = this.context.isCorrect === null; //potential issue because context isn't reset
    return (
      <main>
        <h1>Learning Page</h1>
        <section>
          <p>Your total score is: {this.context.totalScore}</p>
          {showQuestion && !error && <Question onSubmit={this.onSubmit} />}
          {!showQuestion && !error && <Answer />}
        </section>
      </main>
    );
  }
}

export default LearningRoute;
