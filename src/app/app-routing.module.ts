import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { IsAuthenticatedGuard } from './auth/is-authenticated.guard';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'peliculas', component: PeliculasComponent, canActivate: [IsAuthenticatedGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
