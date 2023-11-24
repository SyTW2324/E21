// resolvers.js
import FilmModel from '../models/film.js';
import SeriesModel from '../models/series.js';
import UserModel from '../models/user.js';
import SeasonModel from '../models/season.js';
import EpisodeModel from '../models/episode.js';

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
  }
};

export default resolvers;