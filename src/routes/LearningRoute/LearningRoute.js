import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import LanguageApiService from "../../services/language-api-service";

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

    const promise1 = LanguageApiService.getHead().then((res) =>
      this.context.setHead(res)
    );
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

  renderLearningPage() {
    const { error, words, head, language } = this.context;
    console.log("TESTING 1", head);
    console.log("TESTING 2", words);
    console.log("TESTING 3", language);

    return (
      <main>
        <h2>Learning Page</h2>
        <section>
          {error ? (
            <p>There was and error, try again</p>
          ) : words ? (
            <section>
              <p>Translate: {head.nextWord}</p>
              <p>Total score: {language.total_score}</p>
              {/* TO DO: PUT IN AN EVENT HANDLER ON FORM */}
              <form>
                <label className="basic-label">
                  Answer:{" "}
                  <input
                    className="basic-input"
                    type="text"
                    name="learn-guess-input"
                  />
                </label>
                <input className="submit-btn" type="submit" value="Submit" />
              </form>
            </section>
          ) : null}

          {/* 
        Part 2:
        When user submits answer, resend request to back end POST /api/language/guess
        //update display to display feedback, congratulate of berate user and show correct answer
        //button for next word
        //display correct and incorrect word count
        */}
        </section>
      </main>
    );
  }

  render() {
    return <> {this.state.initialized ? this.renderLearningPage() : null}</>;
  }
}

export default LearningRoute;
