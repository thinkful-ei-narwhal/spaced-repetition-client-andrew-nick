import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./Answer.css";

class Answer extends Component {
  static contextType = LanguageContext;
  render() {
    return (
      <section>
        {this.context.isCorrect ? (
          <h1>Correct!</h1>
        ) : (
          <>
            <h1>Incorrect :(</h1>
            <p>The answer was: {this.context.answer}</p>
          </>
        )}

        <button>Next Question</button>
        <h2>Upcoming word: {this.context.nextWord}</h2>
        <p>Word stats: </p>
        <p>Word correct count: {this.context.wordCorrectCount}</p>
        <p>Word incorrect count: {this.context.wordIncorrectCount}</p>
      </section>
    );
  }
}

export default Answer;
