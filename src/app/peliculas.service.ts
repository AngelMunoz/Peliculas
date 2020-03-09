import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PeliculasStateKey } from 'src/app/utils';
import {
  SearchTypeValues,
  Favorito,
  PeliculasState,
  RespuestaResultadoBusqueda
} from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private readonly http: HttpClient) { }

  search(search: string, type: SearchTypeValues = 'movie') {
    return this.http.get<RespuestaResultadoBusqueda>(`${environment.baseUrl}/?s=${encodeURIComponent(search)}&type=${type}`).toPromise();
  }

  getMediaFromId(id: string) {
    return this.http.get<Favorito>(`${environment.baseUrl}/?i=${encodeURIComponent(id)}`).toPromise();
  }

  saveToStorage(state: PeliculasState, username: string) {
    localStorage.setItem(`${PeliculasStateKey}:${username}`, JSON.stringify(state));
  }

  getFromLocalStorage(username: string): PeliculasState {
    const state: PeliculasState = JSON.parse(localStorage.getItem(`${PeliculasStateKey}:${username}`));
    if (state) { return state; }
    return { favoritos: [], resultados: [], orden: 'ninguno' };
  }

}
