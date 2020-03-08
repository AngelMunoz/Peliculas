import { SearchTypeValues } from './search-bar.model';

export interface ResultadoBusqueda {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}


export interface Rating {
  Source: string;
  Value: string;
}

export interface Pelicula {
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
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

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

export type Favorito = Pelicula | Serie;

export interface PeliculasState {
  favoritos: Favorito[];
  resultados: ResultadoBusqueda[];
}

export type SetFavoritesActionProps = {
  favoritos: Favorito[]
};

export type SetSearchResultsActionProps = {
  resultados: ResultadoBusqueda[]
};

export type AddFavoriteActionProps = {
  favorito: Favorito;
};

export type RemoveFavoriteActionProps = {
  favorito: Favorito
};
