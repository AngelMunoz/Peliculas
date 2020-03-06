import { Component, OnInit, OnDestroy } from '@angular/core';
import { State } from './reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './models/app-types.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  appState: AppState;
  isMenuOpen = false;
  private _sub: Subscription

  hamburgerBtnClasses = ['navbar-burger', 'hamburger'];
  navbarMenuClasses = ['navbar-menu'];

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this._sub = this.store.subscribe(({ appState }) => this.appState = appState);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
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

}
