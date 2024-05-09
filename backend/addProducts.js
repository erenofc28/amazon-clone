const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: String,
  title: String,
  image: String,
  price: Number,
  rating: Number,
});

module.exports = mongoose.model("addProdcut", schema);
