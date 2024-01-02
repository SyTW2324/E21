import {Schema, model} from 'mongoose';

const allowedPlatforms = ['Netflix', 'DisneyPlus', 'Amazon Prime Video', 'HBO Max', 'Hulu',];

const filmSchema = new Schema({
    image: {
        type: String,
        required: true,
        default: "https://imgs.search.brave.com/goJCoHTDmwuW6HHMpXGpKYcfrs-h-eoHVjd1gzK5sJ4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NzI1OTAyODUwMzAt/MGFlNmE0NzE1Njcx/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEo4Zkh4bGJu/d3dmSHg4Zkh3PQ"
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    director: {
        type: String,
        required: true,
        minlength: 3
    },
    year: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    cast: {
        type: [String],
        required: true,
    },
    genre: {
        type: [String],
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

const Film = model('Film', filmSchema);

export default Film;