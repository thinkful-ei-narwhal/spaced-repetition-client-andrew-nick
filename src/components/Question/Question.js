import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./Question.css";

class Question extends Component {
  static contextType = LanguageContext;
  render() {
    const { head } = this.context;
    return (
      <section>
        <form onSubmit={(e) => this.props.onSubmit(e)}>
          <h2>Translate the word: {head.nextWord}</h2>
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
    );
  }
}

export default Question;
