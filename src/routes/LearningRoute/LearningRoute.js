import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import LanguageApiService from "../../services/language-api-service";

class LearningRoute extends Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      asking: true,
      resultsMetadata: {},
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
    let resultsMetadata;
    const value = e.target.guessInput.value;
    e.target.guessInput.value = "";
    LanguageApiService.postGuess(value)
      .then((res) => {
        resultsMetadata = {
          answer: res.answer,
          isCorrect: res.isCorrect,
          nextWord: res.nextWord,
          totalScore: res.totalScore,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
        };
        return this.setState({ asking: false, resultsMetadata });
      })
      .catch((err) => this.context.setError(err));
  }

  renderSubmitPage() {
    const { error, words, head, language } = this.context;
    return (
      <section>
        {error ? (
          <p>There was and error, try again</p>
        ) : words ? (
          <section>
            <p>Translate: {head.nextWord}</p>
            <p>Total score: {language.total_score}</p>
            <form onSubmit={(e) => this.onSubmit(e)}>
              <label className="basic-label">
                Answer:{" "}
                <input
                  className="basic-input"
                  type="text"
                  name="guessInput"
                  id="learn-guess-input"
                />
              </label>
              <input className="submit-btn" type="submit" value="Submit" />
            </form>
          </section>
        ) : null}
      </section>
    );
  }

  renderResultsPage() {
    const { error } = this.context;
    return (
      <section>
        {error ? (
          <p>There was and error, try again</p>
        ) : this.state.resultsMetadata ? (
          <section>
            {this.state.resultsMetadata.isCorrect ? (
              <h1>Correct!</h1>
            ) : (
              <>
                <h1>Incorrect :(</h1>
                <p>The answer was: {this.state.resultsMetadata.answer}</p>
              </>
            )}

            <button>Next Question</button>
            <h2>Upcoming word: {this.state.resultsMetadata.nextWord}</h2>
            <p>Word stats: </p>
            <p>
              Word correct count: {this.state.resultsMetadata.wordCorrectCount}
            </p>
            <p>
              Word incorrect count:{" "}
              {this.state.resultsMetadata.wordIncorrectCount}
            </p>
          </section>
        ) : null}
      </section>
    );
  }

  render() {
    return (
      <>
        <main>
          <h2>Learning Page</h2>
          {this.state.initialized
            ? this.state.asking
              ? this.renderSubmitPage()
              : this.renderResultsPage()
            : null}
        </main>
      </>
    );
  }
}

export default LearningRoute;
