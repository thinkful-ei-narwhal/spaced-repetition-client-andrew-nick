import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import LanguageApiService from "../../services/language-api-service";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import TokenService from "../../services/token-service";

class LearningRoute extends Component {
  static contextType = LearningContext;

  componentDidMount() {
    this.getNextWord(this.context, this.props.history);
  }

  onSubmit(e, context) {
    e.preventDefault();
    const value = e.target.guessInput.value;
    e.target.guessInput.value = "";
    LanguageApiService.postGuess(value)
      .then((res) => {
        console.log(res)
        context.setGuess(value);
        context.setAnswer(res.answer);
        context.setIsCorrect(res.isCorrect);
        context.setNextWord(res.nextWord);
        context.setTotalScore(res.totalScore);
        context.setWordCorrectCount(res.wordCorrectCount);
        context.setWordIncorrectCount(res.wordIncorrectCount);
        return;
      })
      .catch((err) => context.setError(err.error));
  }

  getNextWord(context, history) {
    context.reset();

    LanguageApiService.getHead()
      .then((head) => {
        context.setTotalScore(head.totalScore);
        context.setWordCorrectCount(head.wordCorrectCount);
        context.setWordIncorrectCount(head.wordIncorrectCount);
        context.setNextWord(head.nextWord);
        context.setPrevWord(head.nextWord);
      })
      .catch((error) => {
        if (error.error === "Unauthorized request") {
          TokenService.clearAuthToken();
          history.push("/login");
        }
        context.setError(error.error);
      });
  }

  render() {
    const { error } = this.context;
    const showQuestion = this.context.isCorrect === null;
    console.log(this.context.totalScore);
    
    return (
      <main>
        <h1>Learning Page</h1>
        <section>
          <div className="DisplayScore">
            <p>Your total score is: <span>{this.context.totalScore}</span></p>
          </div>
          {showQuestion && !error && <Question onSubmit={this.onSubmit} />}
          {!showQuestion && !error && (
            <Answer
              onNextQuestion={this.getNextWord}
              history={this.props.history}
            />
          )}
        </section>
      </main>
    );
  }
}

export default LearningRoute;
