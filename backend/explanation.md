## Desafio para Backend Software Engineer

    Quando falamos de vários tipos de produtos cada um com sua regra de tratamento temos uma oportunidade
de aplicar o principio de substituição de Liskov para facilitar sua implementação. Esse princípio consiste
em substituir o uso de classes específicas para uma classe mais genérica que abstrai comportamentos comuns.

    Esse princípio normalmente é aplicado utilizando interfaces que definem a assinatura dos métodos comuns, 
o que me levou a criar uma classe base chamada `ShipmentRule` que implementa um método `handle`. A partir 
dessa classe base eu criei uma classe para cada tipo de regra de envio, definindo assim um padrão para
aplicação dessas regras através de um método `handle`.

    Após aplicado o conceito de Liskov eu foquei na segunda parte do problema: utilizar o tipo correto de regra
para cada produto. Eu decidi implementar uma classe de gerenciamento de envios (`ShipmentManager`) que cuida de
delegar o input para as classes corretas. Isso foi feito utilizando o pattern de estratégias (Strategy Pattern) 
por ser um pattern pensado exatamente para esse tipo de problema, além de também incentivar o conceito de 
Single Responsability.

    Por fim eu conectei o tratamento de envios com o método de pagamento de forma a automatizar o processamento
para qualquer pedido, dessa forma as chances de o tratamento de envio não ser chamado por erro de lógica e/ou
esquecimento são reduzidas.
