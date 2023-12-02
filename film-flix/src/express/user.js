import express from "express";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

export const JWT_SECRET = 'mysecretkey';

const router = express.Router();

router.put("/", async (req, res) => {
  const existingUsername = await UserModel.findOne({
    username: req.body.username,
  });
  const existingEmail = await UserModel.findOne({ email: req.body.email });

  if (existingUsername) {
    throw new Error("Username already exists");
  }

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const user = new UserModel({ ...req.body });
  await user
    .save()
    .then((user) => {
      console.log("User saved!");
    })
    .catch((error) => {
      throw new Error(error);
    });
  return user;
});

router.post("/", async (req, res) => {
  const { email, passwordHash } = req.body;

  try {
    const user = await UserModel.findOne({ email, passwordHash });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    console.log("User found!");
  
    const userForToken = {
      username: user.username,
      email: user.email,
      id: user._id,
    };
  
    const token = jwt.sign(userForToken, JWT_SECRET, {
      expiresIn: "2h",
    });
  
    console.log("Token created!");

    // Enviar el token como respuesta al cliente
    res.json({ token });
  } catch (error) {
    console.error("Error:", error.message);

    // Enviar un mensaje de error como respuesta al cliente
    res.status(500).json({ error: error.message });
  }
});

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (error, usuario) => {
    if (error) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    req.usuario = usuario;
    next();
  });
};

router.get('/', verificarToken, (req, res) => {
  const { usuario } = req;
  UserModel.findOne({ _id: usuario.id })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

export default router;
