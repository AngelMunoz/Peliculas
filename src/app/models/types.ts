import { Pelicula } from './pelicula.interface';
import { Serie } from './serie.interface';
import { ResultadoBusqueda } from './resultado-busqueda.interface';

export type Favorito = Pelicula | Serie;
export type OrdenEstado = 'asc' | 'desc' | 'ninguno';
export type SearchTypeValues = 'movie' | 'series';

export type TitleActionProps = { title: string };
export type AuthenticationActionProps = { authenticated: boolean; apikey: string | null, username: string | null };

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

export type SelectFavorytesByParamArgs = {
  tipo: SearchTypeValues
};

export type RemoveFromSearchActionProps = {
  resultado: ResultadoBusqueda
};

export type SetFavoritesSortingProps = {
  orden: OrdenEstado
};