import { Component, OnInit, OnDestroy } from '@angular/core';
import { ordenarFavoritosAzAsc, ordenarFavoritosAzDesc } from '../utils';
import { State } from '../reducers';
import { Store, select } from '@ngrx/store';
import { PeliculasService } from '../peliculas.service';
import { first } from 'rxjs/operators';
import {
  SearchTypeValues,
  MdiIcons,
  OrdenEstado,
  PeliculasState,
  Favorito,
  ResultadoBusqueda
} from 'src/app/models';
import {
  selectAllFavorites,
  selectSearchResults,
  addFavorite,
  setPeliState,
  selectMovies,
  selectSeries,
  removeFavorite,
  removeFromSearch,
  setFavoritesSorting
} from '../actions/peliculas.actions';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit, OnDestroy {
  private _resultados = this.store.pipe(select(selectSearchResults)).subscribe({ next: resultados => this.setResultados(resultados) });
  private _peliState = this.store.select(state => state.peliculasState).subscribe({ next: state => this.setPeliState(state) });
  private _favoritos = this.store.pipe(select(selectAllFavorites)).subscribe({ next: favoritos => this.setFavoritos(favoritos) });

  private _selectedTab: SearchTypeValues | 'all' = 'movie';
  readonly icons = {
    Heart: MdiIcons.Heart,
    HeartOutline: MdiIcons.HeartOutline
  };


  iconoOrden = MdiIcons.OrdenAZNoOrden;
  estadoOrden: OrdenEstado = 'ninguno';
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
            pelistate.resultados = [];
            this.store.dispatch(setPeliState(pelistate));
          }
        }
      });
  }

  get selectedTab() {
    return this._selectedTab;
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
      this.store.dispatch(removeFromSearch({ resultado }));
    } catch (error) {
      console.warn(error.message);
    }
  }

  removerFavorito(favorito: Favorito) {
    this.store.dispatch(removeFavorite({ favorito }));
  }

  setPeliState(state: PeliculasState) {
    this.peliState = { ...state }
    this.estadoOrden = this.peliState.orden;
    if (this.peliState.orden === 'ninguno') {
      this.iconoOrden = MdiIcons.OrdenAZNoOrden;
    } else if (this.peliState.orden === 'asc') {
      this.iconoOrden = MdiIcons.OrdenAZAsc;
    } else if (this.peliState.orden === 'desc') {
      this.iconoOrden = MdiIcons.OrdenAZDesc;
    }
    let res = state.favoritos;
    if (this.peliState.orden === 'asc') {
      res = ordenarFavoritosAzAsc(res);
    } else if (this.peliState.orden === 'desc') {
      res = ordenarFavoritosAzDesc(res);
    }
    this.setFavoritos(res);
    if (this.username) {
      this.peliculas.saveToStorage(this.peliState, this.username);
    }
  }

  setFavoritos(favoritos: Favorito[]) {
    let res = favoritos;
    if (this.peliState.orden === 'asc') {
      res = ordenarFavoritosAzAsc(res);
    } else if (this.peliState.orden === 'desc') {
      res = ordenarFavoritosAzDesc(res);
    }
    const nourl = (title) => `https://via.placeholder.com/300x411.webp?text=${title}`
    this.favoritos = res.map(favorito => ({
      ...favorito,
      Poster: favorito.Poster === 'N/A' ? nourl(favorito.Title) : favorito.Poster
    }));
  }

  setResultados(resultados: ResultadoBusqueda[]) {
    const nourl = (title) => `https://via.placeholder.com/300x411.webp?text=${title}`
    this.resultados = resultados.map(resultado => ({
      ...resultado,
      Poster: resultado.Poster === 'N/A' ? nourl(resultado.Title) : resultado.Poster
    }));
  }

  setSorting(actual: OrdenEstado) {
    switch (actual) {
      case 'asc':
      case 'ninguno':
        this.store.dispatch(setFavoritesSorting({ orden: 'desc' }));
        return;
      case 'desc':
        this.store.dispatch(setFavoritesSorting({ orden: 'asc' }));
    }
  }

  selectTab(tab: SearchTypeValues | 'all') {
    this._selectedTab = tab;
    this._favoritos?.unsubscribe();
    switch (tab) {
      case 'all':
        this._favoritos = this.store.pipe(select(selectAllFavorites)).subscribe(favoritos => this.setFavoritos([...favoritos]));
        return;
      case 'movie':
        this._favoritos = this.store.pipe(select(selectMovies)).subscribe(favoritos => this.setFavoritos([...favoritos]));
        return;
      case 'series':
        this._favoritos = this.store.pipe(select(selectSeries)).subscribe(favoritos => this.setFavoritos([...favoritos]));
        return;
    }
  }

}
