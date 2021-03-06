import { Component, OnDestroy } from '@angular/core';
import { State } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, OnSearchEventArgs } from 'src/app/models';
import { AuthService } from './auth/auth-service.service';
import { PeliculasService } from './peliculas.service';
import { setSearchResults } from './actions/peliculas.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  appState: AppState;
  isMenuOpen = false;
  private sub: Subscription = this.store.select(state => state.appState).subscribe({ next: state => this.setAppState(state) });

  hamburgerBtnClasses = ['navbar-burger', 'hamburger'];
  navbarMenuClasses = ['navbar-menu'];

  constructor(
    private readonly store: Store<State>,
    private readonly auth: AuthService,
    private readonly peliculas: PeliculasService) { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  setAppState(state: AppState) {
    this.appState = state;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.hamburgerBtnClasses = [...this.hamburgerBtnClasses, 'is-active'];
      this.navbarMenuClasses = [...this.navbarMenuClasses, 'is-active'];
    } else {
      this.hamburgerBtnClasses = this.hamburgerBtnClasses.filter(cls => cls !== 'is-active');
      this.navbarMenuClasses = this.navbarMenuClasses.filter(cls => cls !== 'is-active');
    }
  }

  async onSearch({ search, type }: OnSearchEventArgs) {
    if (search.length === 0) {
      this.store.dispatch(setSearchResults({ resultados: [] }));
      return;
    }

    try {
      const { Response, Search } = await this.peliculas.search(search, type);
      if (Response === 'True') {
        this.store.dispatch(setSearchResults({ resultados: Search }));
      } else {
        this.store.dispatch(setSearchResults({ resultados: [] }));
      }
    } catch (error) {
      console.warn(error);
    }
  }

  cerrarSesion() {
    this.auth.logout();
  }

}
