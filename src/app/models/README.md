# Models
Con este directorio se trata de colocar tipos de dato que puedan ser reutilizados en diferentes partes del codigo sin necesidad de estar escribiendo literales en cada ocasion.

# Interfaces
Para las interfaces se usa el acercamiento de una interfaz por archivo (aun que no es obligatorio), mientras que para los tipos se utiliza el archivo [types](./types.ts)


# Decisiones Tecnicas
`Interfaces` Vs `Types`

La el criterio usado para decidir cuando usar una interfaz vs el uso de un tipo esta basado en el uso que se le da a dicha pieza.

Ejemplo
```ts
export interface Pelicula {
  Title: string;
  Year: string;
  Rated: string;
  /* ... mas propiedades omitidas ...*/
}
```
En este caso la interfaz Pelicula podria ser utilizada para modelar otros tipos de dato basado en ella (como la serie) o incluso generar una abstraccion a partir de la misma mientras que el tipo de dato presentado a continuacion
```ts
export type SetFavoritesActionProps = {
  favoritos: Favorito[]
};
```
se utiliza en en conjunto con la libreria `ngrx/store` como la definicion de los argumentos que espera recibir alguna de sus [acciones](../reducers/index.ts) y es poco probable que se utilice alguna especie de polimorfismo en ello.

Otro punto usado como criterio es la posibilidad de usar tipos de dato `Union` para ayudar a determinar los flujos de el codigo o acciones:
```ts
export type Favorito = Pelicula | Serie;
```
como ejemplo tenemos el tipo `Favorito` el cual es una union entre `Series` y `Pelicula` ya que en su mayoria comparten una gran cantidad de propiedades, esto podria ayudarnos a unificar comportamiento e incrementar la facilidad a la hora de reusar codigo. Como un simple ejemplo (quiza no el mejor):

```ts
interface Paginable<T> {
  total: number;
  lista: T[]
}
interface Endpoint<T> {
  obtener(criterio: T): Promise<Paginable<T>>
  guardar (objeto: T): Promise<T>
}
abstract class ServicioAbstracto<T extends Favorito> implements Endpoint<T> {
    abstract obtener(criterio: T): Promise<Paginable<T>>
    abstract guardar(objeto: T): Promise<T>

    obtenerTitulos(objetos: T[]): string[] {
        return objetos.map(o => o.Title);
    }
    /* ... otros tipos de metodos que puedan ser usados en comun en estos tipos de dato ... */
}
class PeliculaService extends ServicioAbstracto<Pelicula> {
    obtener(criterio: Pelicula): Promise<Paginable<Pelicula>> {
        throw new Error("Method not implemented.");
    }
    guardar(objeto: Pelicula): Promise<Pelicula> {
        throw new Error("Method not implemented.");
    }
}
class SerieService extends ServicioAbstracto<Serie> {
    obtener(criterio: Serie): Promise<Paginable<Serie>> {
        throw new Error("Method not implemented.");
    }
    guardar(objeto: Serie): Promise<Serie> {
        throw new Error("Method not implemented.");
    }
}
```

Debido a que el demo es relativamente sencillo, seria algo innecesario implementar este tipo de comportamientos, pero se deja el analisis de por que se usan tipos e interfaces

### Por que no se usan clases
No se intenta usar clases para la definicion de los datos por los siguiente motivos:
Dado que las clases requieren instancias es facil cometer el error de declarar clases como la base de nuestros modelos o la definicion de nuestra informacion, pero si no tenemos cuidado quiza queramos llamar metodos en objetos que no estan propiamente instanciados como clases

```ts
class Pelicula {
  public Titulo: string;
  /* ... otras definiciones ... */
  obtenerTituloYFecha() {
    return `${this.Titulo} - ${this.Fecha}`
  }
}
class PeliculaService extends ServicioAbstracto<Pelicula> { /* ... */ }
const ps = new PeliculaService();
ps.obtener({ titulo: 'The Flash' })
  .then(({data}) => {
    /**
     * Si bien este codigo compilaria, en el runtime si no tuvimos cuidado
     * con la implementacion de el servicio podriamos tener el problema de que 
     * el objeto no tiene el metodo obtenerTituloYFecha
     **/
    return data.map(pelicula => pelicula.obtenerTituloYFecha());
  });
```



