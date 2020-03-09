# Routing
En el modulo de [routing](./app-routing.module.ts) se declaran los componentes como tales *AuthPageComponent*, *PeliculasComponent*, como punto de mejora, Películas podría convertirse en un modulo y en lugar de cargar el componente en el routing, se podría aplicar `lazy loading` para las rutas internas de películas en caso de que la aplicación fuera algo mas grande y tuviera contenidos que no se visitan todo el tiempo

# Interceptors
Se agrego un interceptor general para manejar el "inicio de sesión" y los requests al API, en este caso no tenemos un backend para solicitar autorización y acreditación de usuarios, por lo tanto en el interceptor captamos si el request tiene el texto `api/auth` y de esa forma regresamos una respuesta "exitosa".
En caso de que sea una solicitud al API de películas, usamos el interceptor para agregarle el API Key, esta misma técnica podría ser usada para el manejo de JWT tokens cuando requerimos hablar a nuestro backend
