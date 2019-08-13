##Resolução

Foi criado o modulo `backend-challenge` naquele contém toda a implementação do desafio.

Dentro do módulo é possivel executar o comando `./gradlew test` para que todos os testes sejam executados.

Primeiramente desacoplei as classes do arquivo `bootstrap.kt` sendo assim as classes ficaram separadas por features,
e aumentando a coesão de cada classe.

**Product**

A classe `Product` contém o método shipmentStrategy no qual cada classe que herdar de product implementa sua estrategia de
entrega. 

Assim conseguimos eliminar condições para cada tipo de shipment.


**Shipment**

Como temos várias regras para determinados tipos de entrega dos produtos acabei decidindo por implementar o pattern `Strategy`,
assim caso fosse necessário implementar um novo tipo de entrega teriamos apenas um ponto de alteração.




    