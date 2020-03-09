# Actions
Para manejar el estado global de la aplicación se utilizo ngrx/store como librería, si bien las acciones que se usan para este demo son muy sencillas en este directorio se intenta demostrar el uso de *Actions* y *Selectors* 


# Puntos de mejora
En el caso de los selectores se crearon diferentes selectores para cada uno de los tipos de media que se obtienen del API, en este caso un punto de mejora podría ser en lugar de tener diferentes selectores que técnicamente hacen la misma función con resultados diferentes; se podrían usar selectores con parametros para revisar a partir del state cual es el resultado ideal