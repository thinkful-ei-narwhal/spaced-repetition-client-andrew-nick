import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import LanguageApiService from "../../services/language-api-service";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";

class LearningRoute extends Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    this.context.clearError();

    const promise1 = LanguageApiService.getHead()
      .then((res) => this.context.setHead(res))
      .catch((err) => this.context.setError(err));

    const promise2 = LanguageApiService.getLanguage()
      .then((res) => {
        this.context.setWordList(res.words);
        return this.context.setLanguage(res.language);
      })
      .catch((err) => this.context.setError(err));

    Promise.all([promise1, promise2]).then(
      this.setState({ initialized: true })
    );
  }

  onSubmit(e) {
    e.preventDefault();
    const value = e.target.guessInput.value;
    e.target.guessInput.value = "";
    LanguageApiService.postGuess(value)
      .then((res) =>
        this.context.setResults({
          answer: res.answer,
          isCorrect: res.isCorrect,
          nextWord: res.nextWord,
          totalScore: res.totalScore,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
        })
      )
      .catch((err) => this.context.setError(err));
  }

  onRenderAnswer(head) {
    return (
      <>
        <h2>Translate the word:</h2>
        <span>{head.nextWord}</span>
        <form onSubmit={(e) => this.props.onSubmit(e)}>
          <label className="basic-label" for="learn-guess-input">
            What's the translation for this word?
          </label>
          <input
            required
            className="basic-input"
            type="text"
            name="guessInput"
            id="learn-guess-input"
          />
          <button className="submit-btn" type="submit" value="Submit">
            Submit your answer
          </button>
        </form>
      </>
    );
  }

  render() {
    const { error, language, head } = this.context;
    const showQuestion = this.context.isCorrect === null;
    return (
      <main>
        <h1>Learning Page</h1>
        <section>
          {showQuestion && <Question onSubmit={this.onSubmit} />}
          {!showQuestion && <Answer />}
        </section>
      </main>
    );
  }
}

export default LearningRoute;
