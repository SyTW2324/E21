import mongoose from "mongoose";
import Film from "./film.js";
import Series from "./series.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        minlength: 3
    },
    gender: {
        type: String,
        required: true,
        minlength: 3
    },
    favoriteMovies: {
        type: [Film.schema],
        minlength: 3
    },
    favoriteSeries: {
        type: [Series.schema],
        minlength: 3
    }
});

const User = mongoose.model("User", userSchema);

export default User;