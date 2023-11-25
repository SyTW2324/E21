// resolvers.js
import FilmModel from '../models/film.js';
import SeriesModel from '../models/series.js';
import UserModel from '../models/user.js';
import SeasonModel from '../models/season.js';
import EpisodeModel from '../models/episode.js';
import { UserInputError } from 'apollo-server';

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
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      const user = new UserModel({...args});
      await user.save().then((user) => {
        console.log("User saved!");
        return user;
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    addFilm: async (root, args) => {
      const film = new FilmModel({...args});
      await film.save().then((film) => {
        console.log("Film saved!");
        return film;
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    addSeries: async (root, args) => {
      const series = new SeriesModel({...args});
      await series.save().then((film) => {
        console.log("Series saved!")
        return series;
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      })
    },
    addSeason: async (root, args) => {
      const season = new SeasonModel({...args});
      await season.save().then((film) => {
        console.log("Series saved!")
        return season;
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      })
    },
    addEpisode: async (root, args) => {
      const episode = new EpisodeModel({...args});
      await episode.save().then((film) => {
        console.log("Series saved!")
        return episode;
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      })
    },
    deleteFilm: async (root, args) => {
      const film = await FilmModel.findOneAndDelete(
        {title: args.title}
      );
      return film;
    },
    deleteSeries: async (root, args) => {
      const series = await SeriesModel.findOneAndDelete(
        {title: args.title}
      );
      return series;
    },
    deleteSeason: async (root, args) => {
      const season = await SeasonModel.findOneAndDelete(
        {title: args.num}
      );
      return season;
    },
    deleteEpisode: async (root, args) => {
      const episode = await EpisodeModel.findOneAndDelete(
        {title: args.title}
      );
      return episode;
    },
    deleteUser: async (root, args) => {
      const user = await UserModel.findOneAndDelete(
        {username: args.username}
      );
      return user;
    },
    updateFilm: async (root, args) => {
      const film = await FilmModel.findOneAndUpdate(
        {title: args.title}, 
        {...args}, 
        {new: true}
      );
      return film;
    },
    updateUser: async (root, args) => {
      const user = await UserModel.findOneAndUpdate(
        {username: args.username}, 
        {...args}, 
        {new: true}
      );
      return user;
    },
    updateSeries: async (root, args) => {
      const series = await SeriesModel.findOneAndUpdate(
        {title: args.title}, 
        {...args}, 
        {new: true}
      );
      return series;
    },
    updateSeason: async (root, args) => {
      const season = await SeasonModel.findOneAndUpdate(
        {num: args.num}, 
        {...args}, 
        {new: true}
      );
      return season;
    },
    updateEpisode: async (root, args) => {
      const episode = await EpisodeModel.findOneAndUpdate(
        {title: args.title}, 
        {...args}, 
        {new: true}
      );
      return episode;
    },
    addFavoriteMovie: async (root, args) => {
      const user = await UserModel.findOneAndUpdate(
        {username: args.username}, 
        {$push: {favoriteMovies: args.film}}, 
        {new: true}
      );
      return user;
    },
    addFavoriteSeries: async (root, args) => {
      const user = await UserModel.findOneAndUpdate(
        {username: args.username}, 
        {$push: {favoriteSeries: args.series}}, 
        {new: true});
      return user;
    }
  }
};

export default resolvers;