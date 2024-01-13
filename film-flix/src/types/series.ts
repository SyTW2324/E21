import { Seasons } from "./seasons";

export type Series = {
  _id: string;
  image: string;
  title: string;
  description: string;
  director: string;
  yearStart: number;
  yearEnd: number;
  numEpisodes: number;
  seasons: Seasons[];
  cast: string[];
  genre: string[];
  durationAVG: number;
  rating: number;
  platform: string[];
};