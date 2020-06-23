import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import LanguageApiService from "../../services/language-api-service";

class LearningRoute extends Component {
  static contextType = LanguageContext;

  componentDidMount() {
    this.context.clearError();

    LanguageApiService.getHead().then((res) => this.context.setHead(res));
    LanguageApiService.getLanguage()
      .then((res) => {
        this.context.setWordList(res.words);
        return this.context.setLanguage(res.language);
      })
      .catch((err) => this.context.setError(err));
  }

  renderLearningPage(words, head) {
    // console.log("TESTING 1", head);
    // console.log('TESTING 2', words);
  }

  render() {
    const { error, words, head } = this.context;
    return (
      <main>
        <h2>Learning Page</h2>
        <section>
          {error ? (
            <p>There was and error, try again</p>
          ) : words ? (
            this.renderLearningPage(words, head)
          ) : null}

          {/* 
          //Write code to request GET /api/language/head > Service
          //display the next word the user must submit their answer for
          //Display the current total score
          //Display the form to submit the next answer
              an input#learn-guess-input,
              a label for the input,
              and a button[type=submit]. You don't need to implement this button's event handler yet, that's the next user story.
        */}

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
}

export default LearningRoute;
