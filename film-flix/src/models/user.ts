import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    passwordHash: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    favoriteMovies: {
        type: Array,
        required: true,
        trim: true,
        minlength: 3
    },
    favoriteSeries: {
        type: Array,
        required: true,
        trim: true,
        minlength: 3
    },
});

const User = mongoose.model("User", userSchema);

export default User;