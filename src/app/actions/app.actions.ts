import { createAction, props } from '@ngrx/store';
import {
  TitleActionProps,
  UsernameActionProps,
  AuthenticationActionProps
} from '../models/app-types.model';

export const setTitle = createAction(
  '[App] setTitle',
  props<TitleActionProps>()
);

export const setUsername = createAction(
  '[App] setUsername',
  props<UsernameActionProps>()
);

export const setAuthentication = createAction(
  '[App] setAuthentication',
  props<AuthenticationActionProps>()
);


