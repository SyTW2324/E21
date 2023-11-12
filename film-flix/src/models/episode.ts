import mongoose from "mongoose";

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    duration: {
        type: Number,
        required: true
    },
});

const Episode = mongoose.model("Season", episodeSchema);

export default Episode;