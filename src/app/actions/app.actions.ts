import { createAction, props } from '@ngrx/store';
import {
  TitleActionProps,
  AuthenticationActionProps
} from 'src/app/models/app.model';

export const setTitle = createAction(
  '[App] setTitle',
  props<TitleActionProps>()
);

export const setAuthentication = createAction(
  '[App] setAuthentication',
  props<AuthenticationActionProps>()
);


