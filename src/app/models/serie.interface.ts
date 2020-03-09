import { Rating } from './rating.interface';
import { SearchTypeValues } from './types';

export interface Serie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[],
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: SearchTypeValues;
  totalSeasons: string;
}
