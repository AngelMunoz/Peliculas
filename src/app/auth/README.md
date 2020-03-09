# Auth Module
Se agrega un modulo de *authentication* que exporta un componente [Auth Page Component](./auth-page/auth-page.component.ts).

En este modulo se intenta demostrar que se puede encapsular funcionalidad especifica (como el formulario de login/signup u otros flujos de inicio de sesión) y solo exponer lo que es necesario para el resto de la aplicacion (la pagina de login n este caso).

# Guards
Se utiliza un guard para prevenir el acceso a ciertas partes del sitio cuando aun no hay una una autorizacion de por medio (generalmente representado como un token JWT) en una situacion real, generalmente se consultarian los claims que vienen en el JWT o incluso una solicitud al servidor para estar seguros de que dicho usuario tiene acceso a cierta seccion del sitio.

# Services
Se se usa [AuthService](./auth-service.service.ts) para hacer las interacciones necesarias relacionadas con la acreditacion de roles o inicio de sesion.



# Decisiones Tecnicas
En este caso (y otros que puedan estar en el servicio de [Peliculas](../peliculas.service.ts))
se usa el cliente de http para solicitar al servidor y al termino se convierte en una promesa
```ts
return this.$http.post<AuthResponse>('/api/auth/login', payload).toPromise();
```

La motivacion detras de ello es la conveniencia de uso y el tipo de observer que se entrega en este caso.
Generalmente los observables provistos por otras librerias (o de uso propio) no es necesario convertirlos en promesas, en este caso este observable solamente arroja un resultado la conveniencia de convertirlo en promesa es que lo podemos usar en el mismo sitio donde lo invocamos y evitamos estarnos suscribiendo cada vez que se mande a llamar el metodo. Ejemplo:
```ts
class AuthPage {
  /* ... codigo omitido en esta seccion ... */


  async tryLogin(payload: LoginPayload) {
    try {
      const response = await this.auth.login(payload);
      /* ... codigo omitido en esta seccion ... */
      return this.router.navigate(['/peliculas']);
    } catch (err) {
      console.warn(err.message);
    }
  }
}
```
Habiendo dicho esto, siempre que uno sea conciente de que pueda haber mas resultados en una ejecución de un observable, se debe de usar dicho observable en lugar de una promesa.