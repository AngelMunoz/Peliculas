import { SearchTypeValues } from './types';

export interface OnSearchEventArgs {
  search: string;
  type: SearchTypeValues;
}
