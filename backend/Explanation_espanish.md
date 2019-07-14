## Challenge Backend Software Engineer

#### Idioma
Para resolver este desafió he utilizado el lenguaje Kotlin, es el lenguaje con el que 
más conocimientos tengo de los tres, también por que me parece más comprensible.

#### Solución
Sobre el problema de reglas de envió, me he decantado por el patrón _factory_, 
ya que este se adapta perfectamente a la solución del problema. 

He definido las reglas que aplicarán a cada tipo de producto, que a su vez extienden 
de la clase sellada `OrderItemRules`, con el método abstracto `process(Order, OrderItem)`
- ProductPhysicalRule
- ProductMembershipRule
- ProductBookRule
- ProductDigitalRule

Cada regla ejecuta las acciones pertinentes asociadas a ese tipo de producto llamando a
los servicios pertinentes. En caso de querer añadir o quitar una acción solamente se 
debería modificar el método `process` de la regla en cuestión.

La clase `OrderRulesFactory` es la responsable de devolver la instancia adecuada 
dependiendo del tipo de producto dentro de cada order item. 

```kotlin
class OrderRulesFactory {
 fun getInstance(orderItem: OrderItem): OrderItemRules = when (orderItem.product.type) {
    ProductType.PHYSICAL -> OrderItemRules.ProductPhysicalRule
    ProductType.BOOK -> OrderItemRules.ProductBookRule
    ProductType.DIGITAL -> OrderItemRules.ProductDigitalRule
    ProductType.MEMBERSHIP -> OrderItemRules.ProductMembershipRule
  } 
} 
``` 
Las acciones tienen lugar en los servicios, con esto establecemos el _Single Responsibility Principle_ 
- DiscountService
- EmailService - PrinterService
- SubscriptionService 

#### Sobre el código
He refactorizado el código, creando un archivo por cada clase, separando los paquetes por
entidades, modelos, enums y servicios. Lo he hecho de esta manera por que creo que en un 
futuro sería la estructura a seguir.

Sobre el patrón factory, he decidido implementarlo con la expresión `when`, al ser la 
condición un enum, esta falla en tiempo de compilación en caso de modificar el enum 
añadiendo un nuevo item, por lo que evitaríamos errores.

Al métodos `process` del `OrderItemRules`, he creído conveniente que hay que pasar los 
parámetros `Order` y `OrderItem`. Con el primero tenemos toda la información del pedido,
con el segundo el producto en concreto sobre el que vamos a realizar la acción.
Creo que `Order` podría sustituirse por `Payment`, en caso de ser necesario, pero incluso
así, en esta primera versión, los atributos a los que tendríamos acceso serían los mismo
tanto con uno como con el otro.

Además, todas la reglas tienen el modificador `internal`, por lo que no se puede crear
una instancia del objeto si no es con la clase `OrderRulesFactory`. 

Los servicios son singleton, por lo que evito tener que crear la instancia cada vez, 
y también persisto  la cola de la impresora e emails. Lo he hecho simulando la 
inyección de dependencias de Spring.

Además, la instancia del servicio es lazy, por lo que evitamos crear una instancia del 
servicio hasta que no lo se necesite por primera vez.
