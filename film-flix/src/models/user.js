// Implementation of the data model for the users
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
})

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);