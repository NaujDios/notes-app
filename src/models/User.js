const { Schema, model } = require("mongoose");
bcrypt = require('bcryptjs')

userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

userSchema.methods.encryptPassword = async (password) =>{
  salt = await bcrypt.genSalt(10);
  hash = bcrypt.hash(password,salt);
  return hash 
}

userSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password);
}

modelo = model("user", userSchema);

module.exports = modelo;
