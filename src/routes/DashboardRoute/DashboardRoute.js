import React, { Component } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import LanguageApiService from "../../services/language-api-service";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  static contextType = LanguageContext;

  componentDidMount() {
    this.context.clearError();
    // retrieve words and scores
    LanguageApiService.getLanguage()
      .then(res => {
        console.log(res)
        this.context.setWordList(res.words);
        this.context.setLanguage(res.language);
        return res
      })
      .catch(err => this.context.setError(err))
  }

  renderWordComponent() {
    const allWords = this.context.words.map((word, i) => (
      <li key={i} className="word-card">
        <h4 className="card-item">{word.original}</h4>
        <p className="card-item correct-count">correct answer count: {word.correct_count}</p>
        <p className="card-item incorrect-count">
          incorrect answer count: {word.incorrect_count}
        </p>
      </li>
    ));
    console.log(allWords);
    return allWords;
  }

  render() {
    const { error, words, language } = this.context;
    return (
      <main>
        <section>
          <h2 className="LanguageName">{language.name}</h2>
          <span className="UserTotal">Total correct answers: {language.total_score}</span>
          <h3 className="WordsHeader">Words to practice</h3>
          <section className="WordCardList">
            { error
              ? <p>There was and error, try again</p> 
              : words ?
              this.renderWordComponent()
            : null}
          </section>
          <a 
            href='/learn'
            className="basic-btn start-practice">Start practicing
          </a>
        </section>
      </main>
    );
  }
}

export default DashboardRoute;
