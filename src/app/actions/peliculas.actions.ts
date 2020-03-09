import { createAction, props, createSelector } from '@ngrx/store';
import { SetFavoritesActionProps, AddFavoriteActionProps, RemoveFavoriteActionProps, PeliculasState, Pelicula, SetSearchResultsActionProps, SelectFavorytesByParamArgs, RemoveFromSearchActionProps, SetFavoritesSortingProps } from 'src/app/models';
import { State } from 'src/app/reducers';


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

export const removeFromSearch = createAction(
  '[Peliculas] removeFromSearch',
  props<RemoveFromSearchActionProps>()
);

export const setFavoritesSorting = createAction(
  '[Peliculas] setFavoritesSorting',
  props<SetFavoritesSortingProps>()
)

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
