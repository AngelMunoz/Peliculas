import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdiIcons } from 'src/app/models';

@Component({
  selector: 'app-favorite-tile',
  templateUrl: './favorite-tile.component.html',
  styleUrls: ['./favorite-tile.component.scss']
})
export class FavoriteTileComponent {
  @Input() source = '';
  @Input() title = '';
  @Input() fromSearch = false;
  @Input() favoriteIcon = '';
  @Input() iconColor = 'red';

  @Output() addToFavorites = new EventEmitter<void>();
  @Output() removeFromFavorites = new EventEmitter<void>();

  showDetails = false;
  closeIcon = MdiIcons.Close;
  /**
   * En este caso se usa la propiedad `this.fromSearch`
   * para determinar cual de las acciones se va a ejecutar
   * como punto de mejora podriamos dejar *tapFavorite* como
   * un binding y dejar que el consumidor de este componente decida
   * cual es la mejor accion.
   */
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
