import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Favorito, ResultadoBusqueda } from '../models/peliculas.model';
import { MdiIcons } from '../models/icons.enum';

@Component({
  selector: 'app-favorite-tile',
  templateUrl: './favorite-tile.component.html',
  styleUrls: ['./favorite-tile.component.scss']
})
export class FavoriteTileComponent {
  @Input('source') source: string = '';
  @Input('title') title: string = '';
  @Input('fromSearch') fromSearch = false;
  @Input('favoriteIcon') favoriteIcon = '';
  @Input('iconColor') iconColor = 'red';

  @Output() addToFavorites = new EventEmitter<void>();
  @Output() removeFromFavorites = new EventEmitter<void>();

  showDetails = false;
  closeIcon = MdiIcons.Close

  tapFavorite() {
    if (this.fromSearch) {
      this.addToFavorites.emit();
    } else {
      this.removeFromFavorites.emit();
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

}
