import { Component, Input } from '@angular/core';

/**
 * La libreria [MDI Icons](https://materialdesignicons.com/) provee mas de 5,000 iconos
 * si bien podriamos usar la fuente web para usar los iconos, esto podria representar
 * un deterioro en el desempeño y carga del sitio.
 * En el proyecto simplemente usamos a lo mucho 6 o 7 iconos por lo tanto creamos un componente
 * para que se pueda renderizar un svg el cual nos provee de otras ventajas (como el escalamiento de tamaño)
 * que simplemente incluir la fuente web
 */
@Component({
  selector: 'app-mdi-icon',
  template: `
  <svg version="1.1" viewBox="0 0 24 24" style="display:inline-block;width:1.5rem">
        <path [attr.fill]="color" [attr.d]="data" />
  </svg>
  `
})
export class MdiIconComponent {
  @Input() data = '';
  @Input() color = 'black';
}
