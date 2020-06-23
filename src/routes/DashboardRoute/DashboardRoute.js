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
      <li 
        key={i}
        className="word-card"
      >
        <h4 className="card-item">{word.original}</h4>
        <p className="card-item">correct answer count: {word.correct_count}</p>
        <p className="card-item">incorrect answer count: {word.incorrect_count}</p>
      </li>
    ))
    return allWords
  }

  render() {
    const { error, words, language } = this.context
    console.log(language);
    
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
