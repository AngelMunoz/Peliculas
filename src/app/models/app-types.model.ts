export interface AppState {
  title: string;
  user: string | null;
  apikey: string | null;
  authenticated: boolean
}

export type TitleActionProps = { title: string };
export type UsernameActionProps = { username: string | null };
export type AuthenticationActionProps = { authenticated: boolean; apikey: string | null };