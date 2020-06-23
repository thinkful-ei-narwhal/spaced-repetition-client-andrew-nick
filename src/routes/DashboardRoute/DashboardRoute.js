import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service'
import './DashboardRoute.css'



class DashboardRoute extends Component {
  static contextType = LanguageContext

  componentDidMount() {
    this.context.clearError()
    // retrieve words and scores
    LanguageApiService.getLanguage()
      .then(res => this.context.setWordList(res.words))
      // .then(res => this.context.setLanguage(res.language))
      .catch(err => this.context.setError(err))
  }

  renderWordComponent() {
    console.log(this.context.words);
    
    const allWords = this.context.words.map((word, i) => (
      <li 
        key={i}
        className="word-card"
      >
        <h4 className="card-item">{word.original}</h4>
        <p className="card-item">Total correct answers: {word.correct_count}</p>
        <p className="card-item">Total incorrect answers: {word.incorrect_count}</p>
      </li>
    ))
    console.log(allWords);
    return allWords
  }

  render() {
    const { error, words } = this.context
    return (
      <main>
        <h2>Test language 1</h2>
        <h3>Words To Practice</h3>
        <section>
          { error
            ? <p>There was and error, try again</p> 
            : words ?
            this.renderWordComponent()
          : null}
        </section>
        <button className="outline-btn">Start Practicing</button>
      </main>
    );
  }
}

export default DashboardRoute
