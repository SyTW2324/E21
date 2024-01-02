import express from "express";
import UserModel from "../models/user.js";
import MoviesModel from "../models/film.js";
import SeriesModel from "../models/series.js";
import jwt from "jsonwebtoken";

export const JWT_SECRET = 'mysecretkey';

const router = express.Router();

// Ruta para crear un nuevo usuario (REGISTER)
router.put("/", async (req, res) => {
  try {
    const existingUsername = await UserModel.findOne({ username: req.body.username });
    const existingEmail = await UserModel.findOne({ email: req.body.email });

    // console.log(req.body)

    // Revisar si ya existe un nombre de usuario
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // Revisar si ya existe un correo electrónico
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Crear un nuevo usuario
    const user = new UserModel({ ...req.body });
    
    // Guardar el usuario en la base de datos
    await user.save();
    
    console.log("User saved!");
    
    return res.status(200).json({ message: "User saved successfully", user });
  } catch (error) {
    // console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
});

// Ruta para iniciar sesión (LOGIN)
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
    // console.error("Error:", error.message);

    // Enviar un mensaje de error como respuesta al cliente
    res.status(500).json({ error: error.message });
  }
});

// Middleware para verificar el token
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

// Ruta para obtener el perfil de un usuario
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

// Ruta para obtener todos los usuarios
router.get("/all", async (req, res) => {
  try {
    const users = await UserModel.find({});
    // console.log(users);
    console.log("Users found!");
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Ruta para añadir y eliminar contenido (verificando si es una película o una serie) a la lista de favoritesMovies o favoritesSeries de un usuario
router.put("/favorites", async (req, res) => {
  try {
    const { userId, contentId, contentType, action } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (contentType === "movies") {
      const movie = await MoviesModel.findById(contentId);
      if (action === "add") {
        user.favoriteMovies.push(movie);
      } else if (action === "remove") {
        user.favoriteMovies = user.favoriteMovies.filter(
          (content) => content.id !== movie.id
        );
      }
    } else if (contentType === "series") {
      const serie = await SeriesModel.findById(contentId);
      if (action === "add") {
        
        user.favoriteSeries.push(serie);
      } else if (action === "remove") {
        user.favoriteSeries = user.favoriteSeries.filter(
          (content) => content.id !== serie.id
        );
      }
    }

    console.log(user);
    await user.save();

    console.log("User updated!");

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
});






export default router;
