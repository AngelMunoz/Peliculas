import { Favorito } from './models/peliculas.model';

export const ordenarFavoritosAzDesc = (favoritos: Favorito[]) => [...favoritos].sort((a, b) => a.Title.localeCompare(b.Title));
export const ordenarFavoritosAzAsc = (favoritos: Favorito[]) => [...favoritos].sort((a, b) => b.Title.localeCompare(a.Title));