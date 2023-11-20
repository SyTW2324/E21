import {Schema, model} from 'mongoose';

const allowedPlatforms = ['DisneyPlus', 'Netflix', 'AmazonPrime', 'HBO'];

const filmSchema = new Schema({
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