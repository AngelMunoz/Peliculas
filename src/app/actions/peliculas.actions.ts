import { createAction, props, createSelector } from '@ngrx/store';
import { SetFavoritesActionProps, AddFavoriteActionProps, RemoveFavoriteActionProps, PeliculasState, Pelicula, SetSearchResultsActionProps } from 'src/app/models/peliculas.model';
import { State } from '../reducers';


export const setPeliState = createAction(
  '[Peliculas] setPeliState',
  props<PeliculasState>()
);

export const setFavorites = createAction(
  '[Peliculas] setFavorites',
  props<SetFavoritesActionProps>()
);

export const setSearchResults = createAction(
  '[Peliculas] setSearchResults',
  props<SetSearchResultsActionProps>()
);

export const addFavorite = createAction(
  '[Peliculas] addFavorite',
  props<AddFavoriteActionProps>()
);

export const removeFavorite = createAction(
  '[Peliculas] removeFavorite',
  props<RemoveFavoriteActionProps>()
);

export const selectSeries = createSelector(
  (state: State) => state.peliculasState,
  (state: PeliculasState) => state.favoritos.filter(favorito => favorito.Type === 'series')
);

export const selectMovies = createSelector(
  (state: State) => state.peliculasState,
  (state: PeliculasState) => state.favoritos.filter(favorito => favorito.Type === 'movie')
);

export const selectAllFavorites = createSelector(
  (state: State) => state.peliculasState,
  (state: PeliculasState) => state.favoritos
);

export const selectSearchResults = createSelector(
  (state: State) => state.peliculasState,
  (state: PeliculasState) => state.resultados
);