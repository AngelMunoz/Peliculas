export type SearchTypeValues = 'movie' | 'series';
export interface OnSearchEventArgs {
  search: string;
  type: SearchTypeValues;
}
