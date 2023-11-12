import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
    },
    director: {
        type: String,
        required: true,
        minlength: 2,
    },
    year: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    }
});

schema.plugin(uniqueValidator);

export default mongoose.model("Film", schema);