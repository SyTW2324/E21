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

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const serie = await SeriesModel.findById(id);
        console.log(serie);
        if (serie) {
            return res.status(200).json({ serie });
        }
        return res.status(404).send("Serie with the specified ID does not exists");
    } catch (error) {
        return res.status(400).send("Error while getting a serie");
    }
});
export default router;
