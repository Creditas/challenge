# Walkthrough

## Introdução

A solução apresentada baseia-se em dois padrões de projeto: **Strategy** e **Factory**. O primeiro é usado para se encapsular em um objeto o comportamento da realização de uma `Order` (imprimir um label, enviar email, criar voucher, etc). Já o segundo é uma forma de se escolher a estratégia baseada no campo `type` de um objeto da classe `Product`.

Para se realizar as ações necessárias para cada pedido, criou-se o método `materialize_order` na classe `Order`. Esse método percorre a lista de itens da `order` em questão, obtém a `strategy` correta fazendo uso de uma `factory` e chama seu método `execute`.

## Classes

### `strategies`

Todas as `strategies` herdam de `BaseStrategy` e devem implementar o método `execute`.

Os construtores das `strategies` aceitam como argumento o `order_item` a que se refere (pois uma `order` pode incluir itens com produtos de tipos diferentes), um `mailer` e um hash `options`.

Devido à injeção de dependências realizada no construtor, torna-se mais fácil o uso de mocks e o teste de chamada de métodos (por exemplo o método `send_mail` dos mailers). Além disso, caso o requisito seja mudado e for necessário também enviar um email no caso de *shippings* de livros e outros produtos físicos, basta injetar um mailer em seu construtor e atualizar seu método `execute`.

Lista de `strategies`:

* **PhysicalStrategy** - cria a shipping label

* **BookStrategy** - herda de `PhysicalStrategy` e acrescenta à shipping label a linha referente à notificação de que o livro é isento de impostos.

* **DigitalStrategy** - envia e-mail usando um objeto da classe `DigitalMailer` e cria um `Voucher`. O valor deste voucher pode ser alterado via o argumento `options` do construtor.

* **MembershipStrategy** - ativa a `membership` associada ao `customer` e envia o e-mail usando o `MembershipMailer`

### `mailers`

Os `mailers` são as classes responsáveis por formatar os conteúdos dos emails para uma determinada estratégia de processamento do pedido. Todas herdam de `BaseMailer` e devem implementar o método `format_body`, que é diferente para cada tipo de produto.

Listagem dos `mailers`:

* ** DigitalMailer **

* ** MembershipMailer **

### `factories`

A `StrategiesFactory` é uma simples `factory` que retorna a estratégia adequada de acordo com o tipo do produto. Ela é injetada como dependência na classe `Order`, o que permite substituí-la se houver uma mudança nos requisitos de como uma determinada estratégia deve ser selecionada a partir de um `order_item`. É também útil em testes de integração por permitir a injeção de *mocks* no lugar de `strategies` reais.

### `models`

Fora os `models` originais, foram criados o `Voucher` e o `ShippingLabel` com os atributos adequados.

## Testes

### Visualização

O arquivo `bootstrap.rb` contém alguns métodos que podem ser usados para a visualização de que a escolha correta de `strategy` foi realizada e que esta executou os comandos requisitados. Essa visualização é feita por meio de `puts`s no console.

### Testes unitários

Por se tratar de um protótipo, não foram realizados extensos testes unitários, mas foi feito um esboço de como eles seriam feitos caso um framework de testes fosse utilizado.

Para as `factories` basta testar que esta retorna o tipo esperado de `strategy` de acordo com o `order_item` passado.

Para as `strategies`, basta verificar que seus métodos `execute` retornam o que deveriam e acionam os mailers quando necessário.
