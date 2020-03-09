import { ResultadoBusqueda } from './resultado-busqueda.interface';
import { Favorito, OrdenEstado } from './types';

export interface PeliculasState {
  favoritos: Favorito[];
  resultados: ResultadoBusqueda[];
  orden: OrdenEstado;
}
