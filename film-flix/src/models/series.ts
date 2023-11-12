import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seriesSchema = new Schema({
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
        minlength: 3
    },
    director: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    yearStart: {
        type: Number,
        required: true,
        trim: true
    },
    yearEnd: {
        type: Number,
        required: true,
        trim: true
    },
    numEpisodes: {
        type: Number,
        required: true,
        trim: true
    },
    seasons: {
        type: Array,
        required: true,
        trim: true,
        minlength: 1
    },
    cast: {
        type: Array,
        required: true,
        trim: true,
        minlength: 1
    },
    genre: {
        type: Array,
        required: true,
        trim: true,
        minlength: 1
    },
    durationAVG: {
        type: Number,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    platform: {
        type: Array,
        required: true,
        trim: true,
        minlength: 1
    },
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;