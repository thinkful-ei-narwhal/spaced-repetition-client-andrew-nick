import config from '../config'
import TokenService from './token-service'

const LanguageApiService = {
  //GET language
  getWords() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  //GET head
  getHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  //POST guess
  postGuess(guess) {
    // const { guess } = req.body;

    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        guess
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}

export default LanguageApiService