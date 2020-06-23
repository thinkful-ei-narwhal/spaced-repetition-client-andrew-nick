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

  onSubmit(e) {
    e.preventDefault();
    console.log("TESTING", e.target.name.value);

    //perform the GUESS POST AND FEED THAT DATA TO RENDER ANSWERS

    e.target.name.value = "";
    this.setState({ asking: false });
  }

  renderSubmitPage() {
    const { error, words, head, language } = this.context;
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
              <form onSubmit={(e) => this.onSubmit(e)}>
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
        </section>
      </main>
    );
  }

  renderResultsPage() {
    const { error, words, head, language } = this.context;
    return (
      <main>
        <h2>Learning Page</h2>
        <section>
          {error ? (
            <p>There was and error, try again</p>
          ) : words ? (
            <section>
              <p>CORRECT OR INCORRECT</p>
              <p>CORRECT ANSWER IF IT WAS INCORRECT</p>
              <p>CORRECT COUNT ON WORD</p>
              <p>INCORRECT COUNT ON WORD</p>
              <button>NEXT QUESTION</button>
            </section>
          ) : null}
        </section>
      </main>
    );
  }

  render() {
    return (
      <>
        {" "}
        {this.state.initialized
          ? this.state.asking
            ? this.renderSubmitPage()
            : this.renderResultsPage()
          : null}
      </>
    );
  }
}

export default LearningRoute;
