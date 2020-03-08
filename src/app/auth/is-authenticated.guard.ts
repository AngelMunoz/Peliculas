import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthModule } from './auth.module';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: AuthModule
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.auth.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/']);
    }
    return isAuthenticated;
  }

}
