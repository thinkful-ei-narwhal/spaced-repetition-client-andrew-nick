import React, { Component } from "react"

const initialState = {
  words: [],
  language: {},
  totalScore: 0,
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  nextWord: null,
  guess: null,
  prevWord: null,
  isCorrect: null,
  answer: null,
  error: null,
  head: {}
}

const LearningContext = React.createContext({
  ...initialState,
  setError: () => { },
  clearError: () => { },
  setWordList: () => {},
  setLanguage: () => {},
  setNextWord: () => { },
  setTotalScore: () => { },
  setWordCorrectCount: () => { },
  setWordIncorrectCount: () => { },
  setGuess: () => { },
  setAnswer: () => { },
  setIsCorrect: () => { },
  reset: () => { },
  setHead: () => { }
})

export default LearningContext

export class LearningProvider extends Component {
  state = {
    ...initialState,
  };

  setLanguage = (language) => {
    this.setState({ language });
  };

  setWordList = (words) => {
    this.setState({ words });
  };

  setResults = (results) => {
    this.setState({...results});
  };

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setTotalScore = totalScore => {
    this.setState({ totalScore })
  }

  setWordCorrectCount = wordCorrectCount => {
    this.setState({ wordCorrectCount })
  }

  setWordIncorrectCount = wordIncorrectCount => {
    this.setState({ wordIncorrectCount })
  }

  setNextWord = nextWord => {
    this.setState({ nextWord })
  }

  setHead = (head) => {
    this.setState({ head });
  };

  setGuess = guess => {
    this.setState({ guess })
  }

  setPrevWord = prevWord => {
    this.setState({ prevWord })
  }

  setIsCorrect = isCorrect => {
    this.setState({ isCorrect })
  }

  setAnswer = answer => {
    this.setState({ answer })
  }

  reset = () => {
    this.setState({
      ...initialState,
    })
  }

  render() {
    const value = {
      // values
      totalScore: this.state.totalScore,
      wordCorrectCount: this.state.wordCorrectCount,
      wordIncorrectCount: this.state.wordIncorrectCount,
      nextWord: this.state.nextWord,
      guess: this.state.guess,
      prevWord: this.state.prevWord,
      isCorrect: this.state.isCorrect,
      answer: this.state.answer,
      error: this.state.error,
      language: this.state.language,
      words: this.state.words,
      head: this.state.head,
      // methods
      setError: this.setError,
      clearError: this.clearError,
      setTotalScore: this.setTotalScore,
      setWordCorrectCount: this.setWordCorrectCount,
      setWordIncorrectCount: this.setWordIncorrectCount,
      setNextWord: this.setNextWord,
      setGuess: this.setGuess,
      setPrevWord: this.setPrevWord,
      setIsCorrect: this.setIsCorrect,
      setAnswer: this.setAnswer,
      reset: this.reset,
      setHead: this.setHead,
      setWordList: this.setWordList,
      setLanguage: this.setLanguage,
      setResults: this.setResults,
    }
    return (
      <LearningContext.Provider value={value}>
        {this.props.children}
      </LearningContext.Provider>
    )
  }
}