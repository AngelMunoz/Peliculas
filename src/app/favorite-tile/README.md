# Favorite Tile Component
En este componente se utiliza un "marco" de forma general, es decir con los atributos y propiedades que conocemos de la informacion externa presentamos contenido (encabezado, e imagen del componente), mientras que reservamos el area de detalles para que el consumidor defina cual es el contenido, esto lo hacemos a traves de un `ng-content`
ejemplo de uso
```html
<!-- favorite-tile -->
<div class="card favorite-tile">
  <header class="card-header">
    <p class="card-header-title">{{ title }}</p>
    <div class="card-header-icon">
      <app-mdi-icon [data]="favoriteIcon" [color]="iconColor" (click)="tapFavorite()">
      </app-mdi-icon>
    </div>
  </header>
  <div *ngIf="source && !showDetails" class="card-image" (click)="toggleDetails()">
    <figure class="image is-2by3">
      <img [src]="source" [alt]="title">
    </figure>
  </div>
  <section *ngIf="showDetails" class="card-content">
    <div class="content-header">
      <app-mdi-icon class="close-icon" [data]="closeIcon" color="#3273dc" (click)="toggleDetails()"></app-mdi-icon>
    </div>
    <div class="external-content">
      <ng-content></ng-content>
    </div>
  </section>
</div>
```
```html
<!-- fragmentos de peliculas.component.html -->
<app-favorite-tile 
  *ngFor="let resultado of resultados" 
  [source]="resultado.Poster"
  [title]="resultado.Title + ' - ' + resultado.Year"
  [favoriteIcon]="icons.HeartOutline" 
  [fromSearch]="true"
  (addToFavorites)="agregarFavorito(resultado)">
  <!-- Seccion implementada de diferente forma -->
  <div>
    <label class="has-text-grey is-size-5">IMDB ID</label>
    <br />
    <p class="is-size-7">{{ resultado.imdbID }}</p>
  </div>
</app-favorite-tile>
<!--  mas abajo en el mismo archivo -->
<app-favorite-tile 
  *ngFor="let favorito of favoritos"
  [source]="favorito.Poster"
  [title]="favorito.Title + ' - ' + favorito.Year"
  [favoriteIcon]="icons.Heart"
  [fromSearch]="false"
  (removeFromFavorites)="removerFavorito(favorito)">
  <div>
    <label class="has-text-grey is-size-5">IMDB Rating <span class="is-size-7"># Votantes</span></label>
    <br />
    <p class="is-size-4">{{ favorito.imdbRating }} <span class="is-size-7">{{favorito.imdbVotes}}</span></p>
  </div>
  <!-- ... contenido omitido... -->
</app-favorite-tile>
```

Si bien ambos son el mismo componente la disposicion de los detalles o el contenido de ellos se deja a el implementador/consumidor de dicho componente.


# Puntos de mejora
En este componente se puede hacer aun mas flexible si incrementa el numero de secciones `ng-content` por ejemplo para el encabezado, la imagen o similares