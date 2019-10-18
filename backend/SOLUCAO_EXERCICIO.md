## Solução do exercício prático

Para solucionar o problema proposto no exercício prático, busquei manter ao máximo a estrutura fornecida no arquivo "bootstrap.rb", mas realizando alterações quando necessário. Inicialmente busquei construir uma solução simples, utilizando switch / case, mas com uma cobertura de testes que me desse segurança para refatorar e implementar uma solução mais robusta.

Após construir essa solução inicial, decidi refatorar a implementação frágil para utilizar o padrão de projeto Strategy. Como foi mencionado na descrição do problema, uma implementação com switch / case, cria dificuldades para criar, remover e alterar as regras de envio. Com o uso do padrão Strategy esse problema é removido e a solução se torna mais robusta.

Dessa forma, eu criei as classes Book, Membership, PhysicalItem e DigitalItem. Cada uma delas herda da classe Product, que exige que suas subclasses implementem um método ship. Portanto, cada uma dessas classes possui um método ship, que implementa a ação necessária para o envio do item. Nesse formato, para incluir um novo produto, basta criar uma classe que herde de Product, e implemente o método ship. Para alterar um regra de envio de algum produto, basta ir na implementação do método ship na classe do produto, Book por exemplo, e realizar as alterações necessárias.

## Fluxo de execução da solução

O arquivo "bootstrap.rb" mostra o fluxo de execução desde a criação da Order e suas dependências, até a chamada do método ship_order, que vai realizar a ação de envio para cada item associado a um pedido. Esse fluxo foi feito para um Book e para uma Membership.

## Considerações Finais

Com o uso do padrão de projeto Strategy, fica mais fácil e escalável criar, remover e alterar as regras de envio para cada tipo de produto. Procurei utilizar commits pequenos para ficar mais fácil o entendimento da evolução da solução. Utilizei a gem Rspec para a escrita dos testes unitários. Procurei também construir a solução de forma mais simples e direta possível, para facilitar tantos os testes quanto a compreensão do código.
