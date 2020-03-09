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
