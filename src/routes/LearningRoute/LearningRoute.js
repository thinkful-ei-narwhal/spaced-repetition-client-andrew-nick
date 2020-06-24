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
      asking: true,
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
        this.context.setResults({
          answer: res.answer,
          isCorrect: res.isCorrect,
          nextWord: res.nextWord,
          totalScore: res.totalScore,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
        });
        return this.setState({ asking: false });
      })
      .catch((err) => this.context.setError(err));
  }

  // renderSubmitPage() {
  //   const { error, words, head, language } = this.context;
  //   return (
  //     <section>
  //       {error ? (
  //         <p>There was and error, try again</p>
  //       ) : words ? (
  //         <section>
  //           <h2>
  //             Translate the word:{" "}
  //             {this.state.initialized ? head.nextWord : null}
  //           </h2>
  //           <p>
  //             Total score:{" "}
  //             {this.state.initialized ? language.total_score : null}
  //           </p>
  //           <form onSubmit={(e) => this.onSubmit(e)}>
  //             <label className="basic-label">
  //               Answer:{" "}
  //               <input
  //                 className="basic-input"
  //                 type="text"
  //                 name="guessInput"
  //                 id="learn-guess-input"
  //               />
  //             </label>
  //             <input className="submit-btn" type="submit" value="Submit" />
  //           </form>
  //         </section>
  //       ) : null}
  //     </section>
  //   );
  // }

  // renderResultsPage() {
  //   return (
  //     <section>
  //       {this.state.resultsMetadata.isCorrect ? (
  //         <h1>Correct!</h1>
  //       ) : (
  //         <>
  //           <h1>Incorrect :(</h1>
  //           <p>The answer was: {this.state.resultsMetadata.answer}</p>
  //         </>
  //       )}

  //       <button>Next Question</button>
  //       <h2>Upcoming word: {this.state.resultsMetadata.nextWord}</h2>
  //       <p>Word stats: </p>
  //       <p>Word correct count: {this.state.resultsMetadata.wordCorrectCount}</p>
  //       <p>
  //         Word incorrect count: {this.state.resultsMetadata.wordIncorrectCount}
  //       </p>
  //     </section>
  //   );
  // }

  render() {
    const { error, language } = this.context;
    const showQuestion = this.context.isCorrect === null;
    return (
      <>
        <h1>Learning Page</h1>
        <section>
          <p>Total score: {language.total_score}</p>
          {showQuestion && !error && this.state.initialized && (
            <Question onSubmit={this.onSubmit} />
          )}
          {!showQuestion && !error && (
            <Answer resultsMetadata={this.state.resultsMetadata} />
          )}
        </section>
      </>
    );
  }
}

export default LearningRoute;
