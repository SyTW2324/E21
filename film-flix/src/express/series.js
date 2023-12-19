import express from 'express';
import SeriesModel from '../models/series.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const series  = await SeriesModel.find({});
        return res.status(200).json({ series });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;
