import React, { Component } from "react";
// import AuthApiService from '../services/auth-api-service'
// import TokenService from '../services/token-service'

const LanguageContext = React.createContext({
  authUser: null,
  language: {},
  words: [],
  error: null,
  head: {},
  isCorrect: null,
  setUser: () => {},
  clearUser: () => {},
  setError: () => {},
  clearError: () => {},
  setWordList: () => {},
  setLanguage: () => {},
  setHead: () => {},
});

export default LanguageContext;

export class LanguageProvider extends Component {
  state = {
    authUser: null,
    language: {},
    words: [],
    error: null,
    head: {},
    isCorrect: null,
  };

  setIsCorrect = (isCorrect) => {
    this.setState({ isCorrect });
  };

  setUser = (authUser) => {
    this.setState({ authUser });
  };

  clearUser = (authUser) => {
    this.setState({ authUser: null });
  };

  setLanguage = (language) => {
    this.setState({ language });
  };

  setWordList = (words) => {
    this.setState({ words })
  }

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setHead = (head) => {
    this.setState({ head });
  };

  render() {
    const value = {
      authUser: this.state.authUser,
      words: this.state.words,
      language: this.state.language,
      error: this.state.error,
      head: this.state.head,
      isCorrect: this.state.isCorrect,
      setIsCorrect: this.setIsCorrect,
      setUser: this.setUser,
      setError: this.setError,
      clearError: this.clearError,
      setWordList: this.setWordList,
      setLanguage: this.setLanguage,
      setHead: this.setHead,
    };
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
