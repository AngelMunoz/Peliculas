export interface AppState {
  title: string | null;
  username: string | null;
  apikey: string | null;
  authenticated: boolean
}

export type TitleActionProps = { title: string };
export type AuthenticationActionProps = { authenticated: boolean; apikey: string | null, username: string | null };
export const AppStateKey = 'AppState';
export const PeliculasStateKey = 'PeliculasState';