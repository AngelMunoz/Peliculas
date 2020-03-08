import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpParams, HttpResponse } from '@angular/common/http';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth/auth-service.service';
import { of } from 'rxjs';
import { AuthResponse } from './models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable()
class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private readonly auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('api/auth')) {
      return of(
        new HttpResponse<AuthResponse>({
          body: { accessToken: environment.apikey, email: req.body?.email },
          status: 200
        })
      );
    }
    const apikey = this.auth.getApiKey();
    const params = new HttpParams({ fromString: req.params.toString(), fromObject: { apikey } });
    const newreq = req.clone({ params });
    return next.handle(newreq);
  }
}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
]
