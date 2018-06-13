## Desafio para Backend Software Engineer

Para o desafio proposto, isolei as regras solicitadas para cada tipo de produto em classes separadas que herdam de uma OrderItem, visto que uma Order é uma lista de OrderItens (justamente por isso não optei fazer o polimorfismo na classe Order). 
Todas as regras ficaram isoladas e não precisei alterar a responsabilidade da classe Payment nem da classe Order.

## Estrutura

Inicialmente, minha primeira alteração foi separar as classes que estavam todas juntas no arquivo `bootstrap.rb`, e criei um arquivo para cada classe na pasta `/process_orders`. 

Para as classes de envio de e-mail, shipping label e voucher, agrupei na pasta `/helpers`, pois acredito ser algo que possa estar desacoplado para facilitar alterações futuras.

Foram criados testes unitários utilizando rspec e outra lib adicionada foi a Rake para facilitar a execução dos mesmos.

Foi criada novas classes que herdam de um OrderItem e adicionado o método `process` para chamar os métodos de envio de e-mail, criação de shipping label e qualquer outra regra específica para cada tipo de pedido.

Foi criada a classe ProcessOrderItemTypes, que é factory que instancia as classes especializadas num hash de `order_itens`. Assim também não preciso repitir o problema da estrutura com if/else ou switch/case. Acredito que foi uma forma simples para adicionar novos tipos de produtos e as suas regras.

## O que faltou

Não foi implementado o envio de e-mail, os shipping_labels e o voucher, apenas a chamada dos métodos. Também faltaria incluir essa verificação nos testes unitários (ou simplesmente "mockar" para validar a chamada dos métodos e os seus respectivos resultados). Apenas imprimi o que cada um desses métodos não implementados deveria fazer e validei quando rodei os testes.
