import { Episode } from "./episodes";

export type Seasons = {
  _id: string;
  season: number;
  episodes: Episode[];
};