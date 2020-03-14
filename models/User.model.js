const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    imgName: String,
    imgPath: String,
    city: String,
    adress: String,
    location: { type: { type: String }, coordinates: [Number] },
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    cardonsale: [{type: Schema.Types.ObjectId, ref: "Card"}]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
