import React, { Component } from "react";
// import AuthApiService from '../services/auth-api-service'
// import TokenService from '../services/token-service'

const LanguageContext = React.createContext({
  authUser: null,
  language: {},
  words: [],
  head: {},
  isCorrect: null,
  totalScore: 0,
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  nextWord: null,
  guess: null,
  prevWord: null,
  answer: null,
  error: null,
  setUser: () => {},
  clearUser: () => {},
  setError: () => {},
  clearError: () => {},
  setWordList: () => {},
  setLanguage: () => {},
  setHead: () => {},
  setResults: () => {},
});

export default LanguageContext;

export class LanguageProvider extends Component {
  state = {
    authUser: null,
    language: {},
    words: [],
    head: {},
    totalScore: 0,
    isCorrect: null,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    nextWord: null,
    guess: null,
    prevWord: null,
    answer: null,
    error: null,
  };

  setResults = (results) => {
    console.log("TESTING", results);
    this.setState(results);
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
    this.setState({ words });
  };

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
      totalScore: this.state.totalScore,
      wordCorrectCount: this.state.wordCorrectCount,
      wordIncorrectCount: this.state.wordIncorrectCount,
      nextWord: this.state.nextWord,
      guess: this.state.guess,
      prevWord: this.state.prevWord,
      answer: this.state.answer,
      setIsCorrect: this.setIsCorrect,
      setUser: this.setUser,
      setError: this.setError,
      clearError: this.clearError,
      setWordList: this.setWordList,
      setLanguage: this.setLanguage,
      setHead: this.setHead,
      setResults: this.setResults,
    };
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
