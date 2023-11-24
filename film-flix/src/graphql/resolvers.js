// resolvers.js
import FilmModel from '../models/film.js';
import SeriesModel from '../models/series.js';
import UserModel from '../models/user.js';
import SeasonModel from '../models/season.js';
import EpisodeModel from '../models/episode.js';

const resolvers = {
  Query: {
    allFilms: () => FilmModel.find({}),
    allSeries: () => SeriesModel.find({}),
    allUsers: () => UserModel.find({}),
    allEpisodes: () => EpisodeModel.find({}),
    allSeasons: () => SeasonModel.find({})
  }
};

export default resolvers;