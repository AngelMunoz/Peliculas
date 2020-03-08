import { Component, OnInit, OnDestroy } from '@angular/core';
import { State } from '../reducers';
import { Store, select } from '@ngrx/store';
import { Favorito, ResultadoBusqueda, PeliculasState } from '../models/peliculas.model';
import { selectAllFavorites, selectSearchResults, addFavorite, setFavorites, setPeliState } from '../actions/peliculas.actions';
import { PeliculasService } from '../peliculas.service';
import { Subscription, combineLatest, Observer } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit, OnDestroy {
  private _resultados = this.store.pipe(select(selectSearchResults)).subscribe(resultados => this.resultados = [...resultados]);
  private _peliState = this.store.select(state => state.peliculasState).subscribe(state => this.setPeliState(state));
  private _favoritos = this.store.pipe(select(selectAllFavorites)).subscribe(favoritos => this.favoritos = [...favoritos]);

  peliState: PeliculasState;
  username: string;
  favoritos: Favorito[] = [];
  resultados: ResultadoBusqueda[] = [];

  constructor(
    private readonly store: Store<State>,
    private readonly peliculas: PeliculasService) { }

  ngOnInit(): void {
    this.store
      .select(state => state.appState.username)
      .pipe(first())
      .subscribe({
        next: username => {
          if (!this.username) {
            this.username = username;
            const pelistate = this.peliculas.getFromLocalStorage(username);
            this.store.dispatch(setPeliState(pelistate));
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._resultados?.unsubscribe();
    this._peliState?.unsubscribe();
    this._favoritos?.unsubscribe();
  }

  async agregarFavorito(resultado: ResultadoBusqueda) {
    try {
      if (this.favoritos.findIndex(favorito => favorito.imdbID === resultado.imdbID) !== -1) { return; }
      const favorito = await this.peliculas.getMediaFromId(resultado.imdbID);
      this.store.dispatch(addFavorite({ favorito }));
    } catch (error) {
      console.warn(error.message);
    }
  }

  setPeliState(state: PeliculasState) {
    this.peliState = { ...state }
    if (this.username) {
      this.peliculas.saveToStorage(this.peliState, this.username);
    }
  }

}
