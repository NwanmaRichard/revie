const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your  name"],
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please Confirm your password"],
    validate: {
      //This only works on CREATE and on save
      validator: function (el) {
        console.log(el)
        console.log(this)
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  //run the function if password was modified
  if (!this.isModified("password")) return next();
  console.log(this)
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
