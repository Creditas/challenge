# Creditas Backend Challenge

A partir de um `Payment` a classe `OrderDispatch` processa o pedido e decide qual o melhor método,
para enviar cada um dos items da `Order` através do método `OrderDispatch#ship_it`.

O método de `#ship_it` permite que no mesmo pedido sejam processados produtos tantos físicos como digitais.

Dependendo do tipo do produto, são gerados *side-effects* diferentes, como imprimir a etiqueta de postagem, o envio de um email ou a ativação de uma assinatura.

**Tasks:**

1. Refatoração da classe `Product
  - Incluir validação de tipos `digital?`, `physhical?`, `subscription?`, `tax_free?` e `allow_voucher?`
2. Adicionar atributo nome ao `Customer`;
3. Implementação da classe `Membership`;
4. Implementação da classe `Voucher`;
5. Implmentação da classe `OrderDispatch`;
  - Gera uma etiqueta se for um produto físico;
  - Envia um email se o produto for digital;
  - Cria uma `Membership` se o produto for uma assinatura;
  - Gera um voucher ao cliente de acordo com o produto (se for mídia digital).

**Testes unitários:**

```shell
$ ruby bootstrap_test.rb
# Running tests:

Finished tests in 0.010127s, 394.9837 tests/s, 2468.6482 assertions/s.
4 tests, 25 assertions, 0 failures, 0 errors, 0 skips
>>>>>>> Implementa caso de uso das instruções

ruby -v: ruby 2.1.2p95 (2014-05-08 revision 45877) [x86_64-darwin13.0]
```
