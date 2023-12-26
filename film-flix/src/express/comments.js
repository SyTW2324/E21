import express from 'express';
import CommentModel from '../models/comments.js';

const router = express.Router();

// Ruta para crear un nuevo comentario
router.put("/", async (req, res) => {
  try {
    const comment = new CommentModel({ ...req.body });
    await comment.save();
    console.log("Comment saved!");
    return res.status(200).json({ message: "Comment saved successfully", comment });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comments = await CommentModel.find({});
    console.log("Comments found!");
    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
});

export default router;