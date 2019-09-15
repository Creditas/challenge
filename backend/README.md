# creditas-challenge

Criei um projeto Gradle/Kotlin/JVM e utilizei o IntelliJ como IDE.

Separei as classes em arquivos distintos, mantendo nos mesmos arquivos somente classes que fazem sentido (recomendação da documentação do Kotlin).

Criei uma classe Shipping para conter a lógica de entrega e as etapas de entrega estão organizadas em uma estrutura de pipeline.

Utilizei o padrão de Specifications para encapsular a lógica que decide quais etapas devem ser executadas conforme os produtos do pedido.

Criei um teste de unidade para executar o código, mas não gerei grande cobertura e assertividade.