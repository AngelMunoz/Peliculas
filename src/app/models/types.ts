import { Pelicula } from './pelicula.interface';
import { Serie } from './serie.interface';
import { ResultadoBusqueda } from './resultado-busqueda.interface';

export type Favorito = Pelicula | Serie;
export type OrdenEstado = 'asc' | 'desc' | 'ninguno';
export type SearchTypeValues = 'movie' | 'series';
// tslint:disable-next-line:interface-over-type-literal
export type RespuestaResultadoBusqueda = { Response: 'True' | 'False'; Search: ResultadoBusqueda[]; totalResults: string };



// tslint:disable-next-line:interface-over-type-literal
export type TitleActionProps = { title: string };
// tslint:disable-next-line:interface-over-type-literal
export type AuthenticationActionProps = { authenticated: boolean; apikey: string | null, username: string | null };

// tslint:disable-next-line:interface-over-type-literal
export type SetFavoritesActionProps = {
  favoritos: Favorito[]
};

// tslint:disable-next-line:interface-over-type-literal
export type SetSearchResultsActionProps = {
  resultados: ResultadoBusqueda[]
};

// tslint:disable-next-line:interface-over-type-literal
export type AddFavoriteActionProps = {
  favorito: Favorito;
};

// tslint:disable-next-line:interface-over-type-literal
export type RemoveFavoriteActionProps = {
  favorito: Favorito
};

// tslint:disable-next-line:interface-over-type-literal
export type SelectFavorytesByParamArgs = {
  tipo: SearchTypeValues
};

// tslint:disable-next-line:interface-over-type-literal
export type RemoveFromSearchActionProps = {
  resultado: ResultadoBusqueda
};

// tslint:disable-next-line:interface-over-type-literal
export type SetFavoritesSortingProps = {
  orden: OrdenEstado
};
