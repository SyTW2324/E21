import express from 'express';
import MoviesModel from '../models/movies.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const movies = await MoviesModel.find({});
        return res.status(200).json({ movies });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ error: error.message });
    }
});
