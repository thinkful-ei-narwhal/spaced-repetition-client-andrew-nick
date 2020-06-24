import React, { Component } from "react";
import "./Answer.css";

class Answer extends Component {
  render() {
    return (
      <section>
        {this.state.resultsMetadata.isCorrect ? (
          <h1>Correct!</h1>
        ) : (
          <>
            <h1>Incorrect :(</h1>
            <p>The answer was: {this.props.resultsMetadata.answer}</p>
          </>
        )}

        <button>Next Question</button>
        <h2>Upcoming word: {this.props.resultsMetadata.nextWord}</h2>
        <p>Word stats: </p>
        <p>Word correct count: {this.props.resultsMetadata.wordCorrectCount}</p>
        <p>
          Word incorrect count: {this.props.resultsMetadata.wordIncorrectCount}
        </p>
      </section>
    );
  }
}

export default Answer;
