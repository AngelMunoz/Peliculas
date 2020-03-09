import { Favorito } from 'src/app/models';

export const ordenarFavoritosAzDesc = (favoritos: Favorito[]) => [...favoritos].sort((a, b) => a.Title.localeCompare(b.Title));
export const ordenarFavoritosAzAsc = (favoritos: Favorito[]) => [...favoritos].sort((a, b) => b.Title.localeCompare(a.Title));
export const AppStateKey = 'AppState';
export const PeliculasStateKey = 'PeliculasState';