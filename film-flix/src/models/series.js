import mongoose from "mongoose";
import Season from "./season.js";

const Schema = mongoose.Schema;

const allowedPlatforms = ['DisneyPlus', 'Netflix', 'AmazonPrime', 'HBO'];

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    director: {
        type: String,
        required: true,
        minlength: 3
    },
    yearStart: {
        type: Number,
        required: true
    },
    yearEnd: {
        type: Number,
        required: true
    },
    numEpisodes: {
        type: Number,
        required: true
    },
    seasons: {
        type: [Season.schema],
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        required: true,
        minlength: 1
    },
    durationAVG: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    platform: {
        type: [String],
        required: true,
        enum: allowedPlatforms
    }
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;