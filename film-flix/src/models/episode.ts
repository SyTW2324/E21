import mongoose from "mongoose";

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    duration: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
});

const Episode = mongoose.model("Season", episodeSchema);

export default Episode;