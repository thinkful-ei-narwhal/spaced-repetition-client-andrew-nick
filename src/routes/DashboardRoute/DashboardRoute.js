import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service'



class DashboardRoute extends Component {
  static contextType = LanguageContext

  state = {
    words: [],
  }

  componentDidMount() {
    this.context.clearError()
    // retrieve words and scores
    LanguageApiService.getWords()
      .then(res => this.context.setWordList(res))
      .then(() => {
        
      })
  }

  render() {
    return (
      <section>
        <h2>Espanol</h2>
        <h3>Words To Practice</h3>
      </section>
    );
  }
}

export default DashboardRoute
