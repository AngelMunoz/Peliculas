import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service.service';
import { LoginPayload, AppState } from 'src/app/models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { setAuthentication } from 'src/app/actions/app.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  private appState: AppState;
  private _sub: Subscription;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly store: Store<State>) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/peliculas']);
      return;
    }
    this._sub = this.store.select(state => state.appState).subscribe({ next: state => this.appState = state });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  async tryLogin(payload: LoginPayload) {
    try {
      const response = await this.auth.login(payload);
      this.store.dispatch(setAuthentication({ apikey: response.accessToken, username: response.email, authenticated: true }));
      this.auth.setAuthState(this.appState);
      return this.router.navigate(['/peliculas']);
    } catch (err) {
      console.warn(err.message);
    }
  }

}
