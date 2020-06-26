import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import LanguageApiService from "../../services/language-api-service";
import TokenService from "../../services/token-service";
import "./LearningRoute.css";

class LearningRoute extends Component {
  static contextType = LearningContext;
  state = { error: null };

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

  onSubmit = (ev) => {
    ev.preventDefault();
    const { guess } = ev.target;

    this.context.setGuess(guess.value);

    LanguageApiService.postGuess(guess.value)
      .then((head) => {
        this.context.setPrevWord(this.context.nextWord);
        this.context.setTotalScore(head.totalScore);
        this.context.setWordCorrectCount(head.wordCorrectCount);
        this.context.setWordIncorrectCount(head.wordIncorrectCount);
        this.context.setNextWord(head.nextWord);
        this.context.setIsCorrect(head.isCorrect);
        this.context.setAnswer(head.answer);
        guess.value = "";
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  getNextWord = () => {
    this.context.setIsCorrect(null);
  };

  renderForm() {
    const { error } = this.state;
    const { nextWord } = this.context;
    return (
      <>
        <section>
          <div>
            <h2>Translate the word:</h2>
            <span className="Word">{nextWord}</span>
          </div>
        </section>
        <section>
          <form className="LearnWordForm" onSubmit={this.onSubmit}>
            <div>{error && <p className="red">{error}</p>}</div>
            <div className="guess-input form-field-container">
              <label
                className="basic-label TranslateLabel"
                htmlFor="learn-guess-input"
              >
                What's the translation for this word?
              </label>
              <input
                className="basic-input TranslateInput"
                id="learn-guess-input"
                name="guess"
                required
                placeholder="translation"
                type="text"
                autocomplete="off"
              />
            </div>
            <button className="basic-btn" type="submit">
              Submit your answer
            </button>
          </form>
        </section>
      </>
    );
  }

  renderFeedback() {
    const { isCorrect, prevWord, answer, guess } = this.context;
    return (
      <section>
        <div className="DisplayFeedback">
          {isCorrect ? (
            <h2 className="DisplayFeedback__correct">You were correct! :D</h2>
          ) : (
            <h2 className="DisplayFeedback__incorrect">
              Good try, but not quite right :(
            </h2>
          )}
          <p className="AnswerExplanation">
            The correct translation for <span>{prevWord}</span> was{" "}
            <span>{answer}</span> and you chose <span>{guess}</span>!
          </p>
          <button className="basic-btn" onClick={this.getNextWord}>
            Try another word!
          </button>
        </div>
      </section>
    );
  }

  render() {
    const showForm = this.context.isCorrect == null;
    return (
      <div className="LearningRoute">
        <section>
          <div className="DisplayScore">
            <p>
              Your total score is: <span>{this.context.totalScore}</span>
            </p>
          </div>
        </section>
        {showForm && this.renderForm()}
        {!showForm && this.renderFeedback()}
        {showForm && (
          <footer>
            <div>
              <p className="Correct">
                You have answered this word correctly{" "}
                <span>{this.context.wordCorrectCount}</span> times.
              </p>
              <p className="Incorrect">
                You have answered this word incorrectly{" "}
                <span>{this.context.wordIncorrectCount}</span> times.
              </p>
            </div>
          </footer>
        )}
      </div>
    );
  }
}

export default LearningRoute;
