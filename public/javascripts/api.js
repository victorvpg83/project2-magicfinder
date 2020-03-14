const axios = require("axios")

const api = {
  // url: ,
  getCards() {
    return axios.get("https://api.scryfall.com/cards?page=816")
      // return axios.get("https://api.scryfall.com/cards?color=U")


      .then(res => res.data)
      .catch(err => console.log(err))
  },

  getCardById(id) {
    return axios.get(`https://api.scryfall.com/cards/${id}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

}

module.exports = api