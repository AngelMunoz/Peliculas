import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mdi-icon',
  template: `
  <svg version="1.1" viewBox="0 0 24 24" style="display:inline-block;width:1.5rem">
        <path [attr.fill]="color" [attr.d]="data" />
  </svg>
  `
})
export class MdiIconComponent {
  @Input('path') data: string = '';
  @Input('color') color: string = 'black';
}
