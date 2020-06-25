import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import LanguageApiService from "../../services/language-api-service";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import TokenService from "../../services/token-service";

class LearningRoute extends Component {
  static contextType = LearningContext;
  state = { error: null };
  // componentDidMount() {
  //   this.getNextWord(this.context, this.props.history);
  // }
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

  // onSubmit(e, context) {
  //   e.preventDefault();
  //   const value = e.target.guessInput.value;
  //   e.target.guessInput.value = "";
  //   LanguageApiService.postGuess(value)
  //     .then((res) => {
  //       console.log(res)
  //       context.setGuess(value);
  //       context.setAnswer(res.answer);
  //       context.setIsCorrect(res.isCorrect);
  //       context.setNextWord(res.nextWord);
  //       context.setTotalScore(res.totalScore);
  //       context.setWordCorrectCount(res.wordCorrectCount);
  //       context.setWordIncorrectCount(res.wordIncorrectCount);
  //       return;
  //     })
  //     .catch((err) => context.setError(err.error));
  // }

  getNextWord = () => {
    this.context.setIsCorrect(null);
  };

  // getNextWord(context, history) {
  //   context.reset();
  //
  //   LanguageApiService.getHead()
  //     .then((head) => {
  //       context.setTotalScore(head.totalScore);
  //       context.setWordCorrectCount(head.wordCorrectCount);
  //       context.setWordIncorrectCount(head.wordIncorrectCount);
  //       context.setNextWord(head.nextWord);
  //       context.setPrevWord(head.nextWord);
  //     })
  //     .catch((error) => {
  //       if (error.error === "Unauthorized request") {
  //         TokenService.clearAuthToken();
  //         history.push("/login");
  //       }
  //       context.setError(error.error);
  //     });
  // }

  // render() {
  //   const { error } = this.context;
  //   const showQuestion = this.context.isCorrect === null;
  //   console.log(this.context.totalScore);
  //
  //   return (
  //     <main>
  //       <h1>Learning Page</h1>
  //       <section>
  //         <div className="DisplayScore">
  //           <p>Your total score is: <span>{this.context.totalScore}</span></p>
  //         </div>
  //         {showQuestion && !error && <Question onSubmit={this.onSubmit} />}
  //         {!showQuestion && !error && (
  //           <Answer
  //             onNextQuestion={this.getNextWord}
  //             history={this.props.history}
  //           />
  //         )}
  //       </section>
  //     </main>
  //   );
  // }
  renderForm() {
    const { error } = this.state;
    const { nextWord } = this.context;
    return (
      <>
        <section>
          <div>
            <h2>Translate the word:</h2>
            <span>{nextWord}</span>
          </div>
        </section>
        <section>
          <form className="LearnWordForm" onSubmit={this.onSubmit}>
            <div>{error && <p className="red">{error}</p>}</div>
            <div className="guess-input">
              <label htmlFor="learn-guess-input">
                What's the translation for this word?
              </label>
              <input
                id="learn-guess-input"
                name="guess"
                required
                placeholder="translation"
                type="text"
              />
            </div>
            <button type="submit">Submit your answer</button>
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
          <p>
            The correct translation for <span>{prevWord}</span> was{" "}
            <span>{answer}</span> and you chose <span>{guess}</span>!
          </p>
          <button onClick={this.getNextWord}>Try another word!</button>
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
              <p className="correct">
                You have answered this word correctly{" "}
                <span>{this.context.wordCorrectCount}</span> times.
              </p>
              <p className="incorrect">
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
