import React, { Component } from "react";

const LanguageContext = React.createContext({
  authUser: null,
  language: {},
  words: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setWordList: () => {},
  setLanguage: () => {},
});

export default LanguageContext;

export class LanguageProvider extends Component {
  state = {
    authUser: null,
    language: {},
    words: [],
    error: null,
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

  

  render() {
    const value = {
      authUser: this.state.authUser,
      words: this.state.words,
      language: this.state.language,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setLanguage: this.setLanguage,
      setWordList: this.setWordList,
    };

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
