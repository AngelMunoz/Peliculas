import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, AuthResponse, AppState } from 'src/app/models';
import { AppStateKey } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private $http: HttpClient) { }


  login(payload: LoginPayload) {
    return this.$http.post<AuthResponse>('/api/auth/login', payload).toPromise();
  }

  logout() {
    sessionStorage.removeItem(AppStateKey);
    window.location.assign('/');
  }

  setAuthState(state: AppState) {
    sessionStorage.setItem(AppStateKey, JSON.stringify(state));
  }

  isAuthenticated() {
    const apikey: AppState = JSON.parse(sessionStorage.getItem(AppStateKey));
    return !!apikey?.apikey;
  }

  getApiKey() {
    const state: AppState = JSON.parse(sessionStorage.getItem(AppStateKey));
    return state?.apikey;
  }
}
