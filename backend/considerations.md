## Desafio para Backend Software Engineer

**Desenvolvido por:** Bruno Meira Melhado

__Considerações:__

- Optei por utilizar o Pattern Stratagy de maneira slimples, criando na classe Product um metodo abstrato **shipping**.
- Criei então as subclasses de Product necessarias, onde implementei o metodo **shipping**, que executa o tratamento desse tipo de produto.
- Então criei a classe **ShipmentManagement** que fica responsável por executar o metodo de **shipping** para cada item da **order**.
- Dessa maneira quando um novo tipo de produto for adicionado no sistema só vai ser necessario criar uma classe para ele que herde de Product e implement o metodo **shipping** com suas próprias regras.
