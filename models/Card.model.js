const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    cardName: String,
    cardImage: String,
    cardDesc: String,
    cardRarity: String,
    cardPrice: String,
  },
  {
    timestamps: true
  }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
