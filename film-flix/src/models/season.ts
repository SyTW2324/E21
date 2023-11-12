import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    num: {
        type: Number,
        required: true,
        trim: true
    },
    episodes: {
        type: Array,
        required: true,
        trim: true,
        minlength: 1
    },
});

const Season = mongoose.model("Season", seasonSchema);

export default Season;