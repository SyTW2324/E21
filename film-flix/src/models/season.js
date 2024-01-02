import mongoose from "mongoose";
import episodeSchema from "./episode.js";

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    episodes: {
        type: [episodeSchema.schema],
        required: true
    }
});

const Season = mongoose.model("Season", seasonSchema);

export default Season;