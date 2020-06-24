import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./Question.css";

class Question extends Component {
  static contextType = LanguageContext;
  render() {
    const { head, language } = this.context;
    return (
      <>
        <p>Your total score is: {language.total_score}</p>
        <h2>Translate the word:</h2>
        <span>{head.nextWord}</span>
        <form onSubmit={(e) => this.props.onSubmit(e)}>
          <label className="basic-label" for="learn-guess-input">
            What's the translation for this word?
          </label>
          <p>
            You have answered this word correctly {head.wordCorrectCount} times.
          </p>
          <p>
            You have answered this word incorrectly {head.wordIncorrectCount}{" "}
            times.
          </p>
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
}

export default Question;
