import React, { Component } from 'react'
// import AuthApiService from '../services/auth-api-service'
// import TokenService from '../services/token-service'

const LanguageContext = React.createContext({
  authUser: null,
  language: {},
  words: [],
  error: null,
  setUser: () => {},
  clearUser: () => {},
  setError: () => {},
  clearError: () => {},
  setWordList: () => {},
  setLanguage: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {
    state = {
      authUser: null,
      language: {},
      words: [],
      error: null,
    }

    setUser = (authUser) => {
      this.setState({ authUser })
    }

    clearUser = (authUser) => {
      this.setState({ authUser: null })
    }

    setWordList = words => {
      this.setState({ words })
    }

    setLanguage = language => {
      this.setState({ language })
    }

    setError = error => {
      this.setState({ error })
    }

    clearError = () => {
      this.setState({ error: null })
    }
  

  render() {
    const value = {
      authUser: this.state.authUser,
      words: this.state.words,
      error: this.state.error,
      setUser: this.setUser,
      setError: this.setError,
      clearError: this.clearError,
      setWordList: this.setWordList,

    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
