import mongoose from "mongoose";
import Season from "./season.js";

const Schema = mongoose.Schema;

const allowedPlatforms = ['DisneyPlus', 'Netflix', 'AmazonPrime', 'HBO'];

const seriesSchema = new Schema({
    image: {
        type: String,
        required: true,
        default: "https://imgs.search.brave.com/goJCoHTDmwuW6HHMpXGpKYcfrs-h-eoHVjd1gzK5sJ4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NzI1OTAyODUwMzAt/MGFlNmE0NzE1Njcx/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEo4Zkh4bGJu/d3dmSHg4Zkh3PQ"
    },
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