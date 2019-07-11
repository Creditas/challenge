## Desafio para Backend Software Engineer

### Estrategia:
- He incluido una librería de test para asegurar los cambios sobre el código.
- En un primer lugar intenté hacer las reglas de negocio según cómo hubiera construido sin ver el código pero vi que se iba a alargar y cambié de estrategia.
- Me he basado en el patron null object para afrontar la kata.
- He empezado haciendo un test para el ejemplo de compra de libro.
- He ido implementando las reglas de negocio en orden, sin refactorizar mucho, quería acabar todos los test para plantearme mejoras de diseño.
- Durante el descubrimiento he ido apuntandoIr implementando las reglas de negocio con TDD para ir descubriendo el código y realizando pequeñas mejoras. Las mejoras que podría ir haciendo para resolver una vez tuviera todas las reglas acogidas.
- He aplicado pequeñas mejoras en el código, he cambiado algunos ordenes y he quitado cosas que he visto que no se usaba.
- A nivel de semantica lo he visto bien.

### Preocupaciones:

- No me ha sido fácil de leer y entender el código.
- Tipos de objetos que hay y accesos.
- La clase Result inicializa a Membership todas las veces, habría que activarlo sólo cuando fuera necesario.
- No me siento cómoda con la estrategia en la que he puesto el descuento, le daría otra vuelta.
- El total price sólo lo muestro en los test, pero no se aplica en nungún sitio, habría que ver dónde encajarlo, la factura tendría que tener conocimiento de él.
- Utilizo banderas para saber si se las acciones se han ejecutado, no se si es la mejor manera.


### Siguientes pasos:
- Sacaría las clases por ficheros
- Refactorizar la clase Result.
  - Sacar a objeto shipping para delegar responsabilidades.
  - Sacar a objeto notification para delegar responsabilidades.
- Refactorizar la clase Payment, lo sacaría a un objeto que se responsabilizara de devolver el comportamiento que toque.
- Valorar los métodos que tienen que ser accesibles desde fuera y valorar si es correcto.

