import {
  ActionReducerMap,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  AppState,
  TitleActionProps,
  UsernameActionProps,
  AuthenticationActionProps
} from '../models/app-types.model';
import { setTitle, setUsername, setAuthentication } from '../actions/app.actions';

export interface State {
  appState: AppState,
}
const AppStateKey = 'AppState';

const getInitialAppState: () => AppState = () => {
  const initialState = { title: 'Peliculas', user: null, apikey: null, authenticated: false };
  try {
    const appstate = localStorage.getItem(AppStateKey)
    return JSON.parse(appstate) || initialState;
  } catch (error) {
    console.warn(`Unable to parse previous state: ${error.message}`);
  }
  return initialState;
};

const appStateReducer = createReducer(
  getInitialAppState(),
  on(setTitle, (state, { title }: TitleActionProps) => ({ ...state, title: title })),
  on(setUsername, (state, { username }: UsernameActionProps) => ({ ...state, username })),
  on(setAuthentication, (state, authprops: AuthenticationActionProps) => ({ ...state, ...authprops }))
);


export const reducers: ActionReducerMap<State> = {
  appState: appStateReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
