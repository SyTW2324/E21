// resolvers.js
import FilmModel from '../models/film';
import SeriesModel from '../models/series';
import UserModel from '../models/user';
import SeasonModel from '../models/season';
import EpisodeModel from '../models/episode';

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