import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { AuthModule } from './auth/auth.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { httpInterceptorProviders } from './http-interceptors';
import { MdiIconComponent } from './mdi-icon/mdi-icon.component';
import { FavoriteTileComponent } from './favorite-tile/favorite-tile.component';

@NgModule({
  declarations: [AppComponent, SearchBarComponent, PeliculasComponent, MdiIconComponent, FavoriteTileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    AuthModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
