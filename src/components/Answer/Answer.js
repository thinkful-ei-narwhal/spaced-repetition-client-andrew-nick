import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import "./Answer.css";

class Answer extends Component {
  static contextType = LearningContext;
  render() {
    return (
      <section>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {this.context.prevWord} was{" "}
            {this.context.answer} and you chose {this.context.guess}!
          </p>
        </div>

        {this.context.isCorrect ? (
          <h2>You were correct! :D</h2>
        ) : (
            <h2>Good try, but not quite right :(</h2>
        )}
        <p>The answer was: {this.context.answer}</p>
        <button
          onClick={() => this.props.onNextQuestion(this.context, this.props.history)}
        >
          Try another word!
        </button>
        <h3>Upcoming word: {this.context.nextWord}</h3>
        <p>Word stats: </p>
        <p>Word correct count: {this.context.wordCorrectCount}</p>
        <p>Word incorrect count: {this.context.wordIncorrectCount}</p>
      </section>
    );
  }
}

export default Answer;
