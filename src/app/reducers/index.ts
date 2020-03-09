import { environment } from 'src/environments/environment';
import { setTitle, setAuthentication } from 'src/app/actions/app.actions';
import {
  ActionReducerMap,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import {
  AppState,
  TitleActionProps,
  AuthenticationActionProps,
  AppStateKey
} from 'src/app/models/app.model';
import {
  PeliculasState,
  SetFavoritesActionProps,
  AddFavoriteActionProps,
  RemoveFavoriteActionProps,
  SetSearchResultsActionProps,
  RemoveFromSearchActionProps,
  Favorito,
  SetFavoritesSortingProps,
} from 'src/app/models/peliculas.model';
import {
  setFavorites,
  addFavorite,
  removeFavorite,
  setSearchResults,
  setPeliState,
  removeFromSearch,
  setFavoritesSorting
} from '../actions/peliculas.actions';

export interface State {
  appState: AppState,
  peliculasState: PeliculasState
}

const getInitialAppState: () => AppState = () => {
  const initialState: AppState = { title: 'Peliculas', username: null, apikey: null, authenticated: false };
  try {
    const appstate = sessionStorage.getItem(AppStateKey)
    return JSON.parse(appstate) || initialState;
  } catch (error) {
    console.warn(`Unable to parse previous state: ${error.message}`);
  }
  return initialState;
};

const appStateReducer = createReducer(
  getInitialAppState(),
  on(
    setTitle,
    (state, titleProps: TitleActionProps) => ({ ...state, ...titleProps })
  ),
  on(
    setAuthentication,
    (state, authprops: AuthenticationActionProps) => ({ ...state, ...authprops })
  )
);

const initPeliState: PeliculasState = { favoritos: [], resultados: [], orden: 'ninguno' };
const peliculasStateReducer = createReducer(
  initPeliState,
  on(
    setPeliState,
    (state, peliState: PeliculasState) =>
      ({ ...state, ...peliState })
  ),
  on(
    setFavorites,
    (state, { favoritos }: SetFavoritesActionProps) =>
      ({ ...state, favoritos: [...favoritos] })
  ),
  on(
    setSearchResults,
    (state, { resultados }: SetSearchResultsActionProps) =>
      ({ ...state, resultados: resultados.filter(resultado => !state.favoritos.some((favorito: Favorito) => favorito.imdbID === resultado.imdbID)) })
  ),
  on(
    removeFromSearch,
    (state, { resultado }: RemoveFromSearchActionProps) =>
      ({ ...state, resultados: state.resultados.filter(r => r.imdbID !== resultado.imdbID) })
  ),
  on(
    setFavoritesSorting,
    (state, { orden }: SetFavoritesSortingProps) => ({ ...state, orden })
  ),
  on(
    addFavorite,
    (state, { favorito }: AddFavoriteActionProps) =>
      ({ ...state, favoritos: [...state.favoritos, favorito] })
  ),
  on(
    removeFavorite,
    (state, { favorito }: RemoveFavoriteActionProps) =>
      ({ ...state, favoritos: state.favoritos.filter(f => f.imdbID !== favorito.imdbID) })
  )
)

export const reducers: ActionReducerMap<State> = {
  appState: appStateReducer,
  peliculasState: peliculasStateReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
