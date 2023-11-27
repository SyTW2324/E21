// resolvers.js
import FilmModel from '../models/film.js';
import SeriesModel from '../models/series.js';
import UserModel from '../models/user.js';
import SeasonModel from '../models/season.js';
import EpisodeModel from '../models/episode.js';
import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';
export const JWT_SECRET = 'mysecretkey';


const resolvers = {
  Query: {
    allFilms: async () => {
      const films = await FilmModel.find({});
      return films;
    },
    allSeries: async () => {
      const series = await SeriesModel.find({});
      return series;
    },
    allUsers: async () => {
      const users = await UserModel.find({});
      return users;
    },
    allSeasons: async () => {
      const seasons = await SeasonModel.find({});
      return seasons;
    },
    allEpisodes: async () => {
      const episodes = await EpisodeModel.find({});
      return episodes;
    },
    findFilm: async (root, args) => {
      const film = await FilmModel.findOne({title: args.title});
      return film;
    },
    findSeries: async (root, args) => {
      const series = await SeriesModel.findOne({title: args.title});
      return series;
    },
    findSeason: async (root, args) => {
      const season = await SeasonModel.findOne({num: args.num});
      return season;
    },
    findEpisode: async (root, args) => {
      const episode = await EpisodeModel.findOne({title: args.title});
      return episode;
    },
    findUser: async (root, args) => {
      const user = await UserModel.findOne({username: args.username});
      return user; 
    },
    current: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      const existingUser = await UserModel.findOne({ username: args.username });
      if (existingUser) {
        throw new UserInputError("Username already exists", {
          invalidArgs: args.username
        });
      }
      const user = new UserModel({...args});
      await user.save().then((user) => {
        console.log("User saved!");
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return user;
    },

    login: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username });

      if (!user || args.password !== user.passwordHash) {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        email: user.email,
        id: user._id
      };

      const token = jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: '2h'
      });

      return { value: token };
    },

    addFilm: async (root, args) => {
      const existingFilm = await FilmModel.findOne({ title: args.title });
      if (existingFilm) {
        throw new UserInputError("Film already exists", {
          invalidArgs: args.title
        });
      }
      const film = new FilmModel({...args});
      await film.save().then((film) => {
        console.log("Film saved!");
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
      return film;
    },
    addSeries: async (root, args) => {
      const existingSeries = await SeriesModel.findOne({ title: args.title });
      if (existingSeries) {
        throw new UserInputError("Series already exists", {
          invalidArgs: args.title
        });
      }
      const series = new SeriesModel({...args});
      await series.save().then((film) => {
        console.log("Series saved!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      })
      return series;
    },
    addSeason: async (root, args) => {
      const existingSeason = await SeasonModel.findOne({ num: args.num });
      if (existingSeason) {
        throw new UserInputError("Season already exists", {
          invalidArgs: args.num
        });
      }
      const season = new SeasonModel({...args});
      await season.save().then((film) => {
        console.log("Season saved!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      })
      return season;
    },
    addEpisode: async (root, args) => {
      const existingEpisode = await EpisodeModel.findOne({ title: args.title });
      if (existingEpisode) {
        throw new UserInputError("Episode already exists", {
          invalidArgs: args.title
        });
      }
      const episode = new EpisodeModel({...args});
      await episode.save().then((film) => {
        console.log("Episode saved!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      })
      return episode;
    },
    deleteFilm: async (root, args) => {
      const find = await FilmModel.findOne({title: args.title});

      if (!find) {
        throw new UserInputError("Film not found", {
          invalidArgs: args.title
        });
      }

      const film = await FilmModel.findOneAndDelete(
        {title: args.title}
      ).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return film;
    },
    deleteSeries: async (root, args) => {
      const find = await SeriesModel.findOne({title: args.title});

      if (!find) {
        throw new UserInputError("Series not found", {
          invalidArgs: args.title
        });
      }

      const series = await SeriesModel.findOneAndDelete(
        {title: args.title}
      ).then(() => {
        console.log("Series deleted!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return series;
    },
    deleteSeason: async (root, args) => {
      const find = await SeasonModel.findOne({num: args.num});

      if (!find) {
        throw new UserInputError("Season not found", {
          invalidArgs: args.num
        });
      }

      const season = await SeasonModel.findOneAndDelete(
        {title: args.num}
      ).then(() => {
        console.log("Season deleted!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return season;
    },
    deleteEpisode: async (root, args) => {
      const find = await EpisodeModel.findOne({title: args.title});

      if (!find) {
        throw new UserInputError("Episode not found", {
          invalidArgs: args.title
        });
      }

      const episode = await EpisodeModel.findOneAndDelete(
        {title: args.title}
      ).then(() => {
        console.log("Episode deleted!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return episode;
    },
    deleteUser: async (root, args) => {
      const find = await UserModel.findOne({username: args.username});

      if (!find) {
        throw new UserInputError("User not found", {
          invalidArgs: args.username
        });
      }

      const user = await UserModel.findOneAndDelete(
        {username: args.username}
      ).then(() => {
        console.log("User deleted!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return user;
    },
    updateFilm: async (root, args) => {
      const find = await FilmModel.findOne({title: args.title});

      if (!find) {
        throw new UserInputError("Film not found", {
          invalidArgs: args.title
        });
      }

      const film = await FilmModel.findOneAndUpdate(
        {title: args.title}, 
        {...args}, 
        {new: true}
      ).then(() => {
        console.log("Film updated!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return film;
    },
    updateUser: async (root, args) => {
      const find = await UserModel.findOne({username: args.username});

      if (!find) {
        throw new UserInputError("User not found", {
          invalidArgs: args.username
        });
      }

      const user = await UserModel.findOneAndUpdate(
        {username: args.username}, 
        {...args}, 
        {new: true}
      ).then(() => {
        console.log("User updated!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return user;
    },
    updateSeries: async (root, args) => {
      const find = await SeriesModel.findOne({title: args.title});

      if (!find) {
        throw new UserInputError("Series not found", {
          invalidArgs: args.title
        });
      }

      const series = await SeriesModel.findOneAndUpdate(
        {title: args.title}, 
        {...args}, 
        {new: true}
      ).then(() => {
        console.log("Series updated!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return series;
    },
    updateSeason: async (root, args) => {
      const find = await SeasonModel.findOne({num: args.num});

      if (!find) {
        throw new UserInputError("Season not found", {
          invalidArgs: args.num
        });
      }

      const season = await SeasonModel.findOneAndUpdate(
        {num: args.num}, 
        {...args}, 
        {new: true}
      ).then(() => {
        console.log("Season updated!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
      return season;
    },
    updateEpisode: async (root, args) => {
      const find = await EpisodeModel.findOne({title: args.title});

      if (!find) {
        throw new UserInputError("Episode not found", {
          invalidArgs: args.title
        });
      }

      const episode = await EpisodeModel.findOneAndUpdate(
        {title: args.title}, 
        {...args}, 
        {new: true}
      ).then(() => {
        console.log("Episode updated!")
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return episode;
    },
    addFavoriteMovie: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username })

      if (!user) {
        throw new UserInputError("User not found", {
          invalidArgs: args.username
        });
      }

      // Verificar si 'favoriteMovies' está definido y si la película ya está en el array
      const movieExists = user.favoriteMovies && user.favoriteMovies.some(movie => movie.title === args.film.title);

      if (movieExists) {
        throw new UserInputError("Film already exists in favorites", {
          invalidArgs: args.film.title
        });
      } else {
        user.favoriteMovies = [];

        // Agregar la película al array si no existe
        user.favoriteMovies.push(args.film);

        // Guardar los cambios en la base de datos
        await user.save()
          .then(() => {
            console.log("Film added!");
          })
          .catch((error) => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            });
          });
      }

      return user;
    },
    addFavoriteSeries: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username })

      if (!user) {
        throw new UserInputError("User not found", {
          invalidArgs: args.username
        });
      }

      // Verificar si 'favoriteMovies' está definido y si la película ya está en el array
      const seriesExists = user.favoriteSeries && user.favoriteSeries.some(series => series.title === args.series.title);

      if (seriesExists) {
        throw new UserInputError("Series already exists in favorites", {
          invalidArgs: args.series.title
        });
      } else {
        user.favoriteSeries = [];

        // Agregar la película al array si no existe
        user.favoriteSeries.push(args.series);

        // Guardar los cambios en la base de datos
        await user.save()
          .then(() => {
            console.log("Series added!");
          })
          .catch((error) => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            });
          });
      }

      return user;
    }
  }
};

export default resolvers;