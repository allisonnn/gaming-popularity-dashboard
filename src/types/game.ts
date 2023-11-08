import { Manufacturer, Platform } from "./platform";

export enum Genre {
  Action = "Action",
  Adventure = "Adventure",
  Fighting = "Fighting",
  Misc = "Misc",
  Platform = "Platform",
  Puzzle = "Puzzle",
  Racing = "Racing",
  RolePlaying = "Role-Playing",
  Shooter = "Shooter",
  Simulation = "Simulation",
  Sports = "Sports",
  Strategy = "Strategy",
}

export interface UnprocessedGame {
  name: string;
  platform: Platform;
  yearOfRelease: number;
  genre: Genre;
  publisher: string;
  naSales: number;
  euSales: number;
  jpSales: number;
  otherSales: number;
  globalSales: number;
  criticScore: number;
  criticCount: number;
  userScore: number;
  userCount: number;
  developer: string;
  rating: string;
}

export interface Game extends UnprocessedGame {
  manufacturer: Manufacturer;
}
