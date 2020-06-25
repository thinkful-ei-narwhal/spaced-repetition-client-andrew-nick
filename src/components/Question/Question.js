import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import "./Question.css";

class Question extends Component {
  static contextType = LearningContext;
  render() {
    return (
      <>
        <h2>Translate the word:</h2>
        <span>{this.context.nextWord}</span>
        <form onSubmit={(e) => this.props.onSubmit(e, this.context)}>
          <label className="basic-label" htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input
            required
            className="basic-input"
            type="text"
            name="guessInput"
            id="learn-guess-input"
          />

          <p>
            You have answered this word correctly{" "}
            {this.context.wordCorrectCount} times.
          </p>
          <p>
            You have answered this word incorrectly{" "}
            {this.context.wordIncorrectCount} times.
          </p>
          <button className="submit-btn" type="submit" value="Submit">
            Submit your answer
          </button>
        </form>
      </>
    );
  }
}

export default Question;
