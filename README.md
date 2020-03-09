# Peliculas

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.


# Prerrequisitos

- Nodejs LTS o superior
- angular cli

# Iniciar de forma local

- npm run start
o
- ng serve

visitar http://localhost:4200 en el navegador
para ver este demo funcionando en la web puede visitar [Este sitio](https://peliculas-1716a.web.app/)
el cual utiliza firebase para el *Hosting*


## Resumen
El sitio web consta de dos secciones sencillas
- Contenido del sitio
- Barra de busqueda

La barra de busqueda se comunica con el [componente principal](./src/app/app.component.ts) de la aplicación (por medio de eventos) el cual se encarga de llamar al servicio que solicita los datos al API. Una vez realizada la busqueda los resultados son comunicados con el [contenido](./src/app/peliculas/peliculas.component.ts) por medio de un por medio de un [global store](./src/app/reducers/index.ts) usando la librería [@ngrx/store](https://ngrx.io/)

Al darle click al icono de favoritos en algún resultado de la busqueda este es agregado al store global donde se almacena cuales son las películas/series favoritas del usuario. Los resultados que ya se encuentran en favoritos son filtrados de los resultados de la busqueda.

Los resultados de la busqueda/favoritos se muestran al usuario usando un componente llamado [`favorite-tile`](./src/app/favorite-tile/favorite-tile.component.ts), este componente expone un "slot" donde si bien se le da una forma general a el marco del contenido, se puede colocar contenido arbitrario dentro de dicho componente, Se puede observar dicho comportamiento al darle click a la imagen que esta dentro del `favorite-tile` y comparar el contenido de un resultado de busqueda y un favorito; El favorito despliega la información completa de la película o serie, mientras que el resultado de la busqueda solo muestra el imbd id.


# Extras
En el código/archivos y directorios se pueden encontrar comentarios o archivos README que explican ciertos detalles de implementación o incluso puntos de mejora observados despues de un análisis bastante sencillo.



