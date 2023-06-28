const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

// Defining User Schema.
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  author: [{ type: mongoose.ObjectId, ref: "Author" }],
  books: [{ type: mongoose.ObjectId, ref: "Book" }],
});

// Hashing the password with a salt value of 10 before saving.
UserSchema.pre("save", async function (next) {
  try {
    const existingUser = await this.model("User").findOne({
      username: this.username,
    });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

//pre find one and update hook.
UserSchema.pre("findOneAndUpdate", async function (next) {
  // Check if the password field is being modified
  if (this._update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this._update.password, salt);
      this._update.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  // Check if the username field is being modified
  if (this._update.username) {
    // Update the username field with the new value
    this._update.username = this._update.username;
  }
  next();
});
// Adding a Schema method "isValidPassword" to ensure that
// the user trying to login has the correct credentials.
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = model("User", UserSchema);
