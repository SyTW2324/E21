import express from 'express';
import MoviesModel from '../models/film.js';

const router = express.Router();

// Ruta para obtener todas las películas
router.get("/", async (req, res) => {
    try {
        const movies  = await MoviesModel.find({});
        return res.status(200).json({ movies });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener una película por su id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MoviesModel.findById(id);
        if (movie) {
            return res.status(200).json({ movie });
        }
        return res.status(404).send("Movie with the specified ID does not exists");
    } catch (error) {
        return res.status(400).send("Error while getting a movie");
    }
});

export default router;
