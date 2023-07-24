const { Schema, model } = require("mongoose");

noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  user: { type: String}
});

modelo = model("note", noteSchema);

module.exports = modelo;
