import mongoose from "mongoose";
import Episode from "./episode";

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    num: {
        type: Number,
        required: true
    },
    episodes: {
        type: [Episode],
        required: true
    },
});

const Season = mongoose.model("Season", seasonSchema);

export default Season;