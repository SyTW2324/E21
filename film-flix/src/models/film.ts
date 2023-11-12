import {Document, Schema, model} from 'mongoose';

export interface IFilm extends Document {
    title: string;
    description: string;
    director: string;
    year: number;
    duration: number;
    cast: string[];
    genre: string[];
    rating: number;
    platform: string[];
}

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

export const Film = model<IFilm>('Film', filmSchema);