# Desafio para Backend Software Engineer

Esse código foi organizado buscando seguir as instruções passadas pelo material fornecido.

## Concepção ##

Foi utilizado uma biblioteca para auxiliar na construção dos testes unitários, focando na geração de um *Pedido* contendo os cenários que deveriam ser cobertos pela aplicação.

Nesse sentido, foram feitos as seguintes divisões de tipos de ítens em um pedido:

```ruby
{:service => "Assinatura Serviço", :book => "Livro", 
						:digital_media => "'Mídia Digital", :item => "Ítem Físico"}
```

Para os testes, utilizei os produtos:

```ruby
product1 = Product.new(name="Carcereiros", type="Livro", value=22.99)
product2 = Product.new(name="Por um fio", type="Livro", value=25.99)
product3 = Product.new(name="Gonzaguinha", type="CD", value=45.99)
product4 = Product.new(name="Seguro Celular", type="Serviço", value=300.99)
```

Na minha concepção, a escolha de algumas características de Produto/Item/Pedido se deram baseadas numa maior flexibilidade, por exemplo:

```ruby
class OrderItem
  attr_reader :order, :product, :item_type, :shipping_label, :voucher
.
.
.
end
```

**:shipping_label** e **:voucher** foram colocados na classe *OrderItem* para que seja possível atribuir um valor específico por ítem.

## Teste ##

Os testes foram realizados utilizando a biblioteca *'test-unit', '1.2.3'*, e para analisar o cenário de geração de um pedido, realize o **clone** do repositório em sua estação e faça:

```
cd backend 

$ bundler install

$ ruby -v test/order_test.rb 
```

O pedido é gerado de acordo com os ítens adicionados e há uma mensagem em "shipping" que representa um resumo do que foi feito no pedido.

Ex.:

```
# Running tests:

[2/3] OrderTest#test_paymentPrinting label: Item isento de impostos conforme Art. 150, VI, d.
Printing label: Item isento de impostos conforme Art. 150, VI, d.
Sending email: Produto adquirido: Gonzaguinha to felipe@teste.com
Sending email: Assinatura ativada. to felipe@teste.com
Serviço ativado: Seguro Celular
"Caro(a), Felipe"
"Pedido finalizado com sucesso."
"A entrega do pedido será realizada no CEP: 45678-979."
"Produtos adquiridos:"
"Item: Por um fio - R$ 25.99"
"Item: Carcereiros - R$ 22.99"
"Item: Gonzaguinha - R$ 45.99"
"Item: Seguro Celular - R$ 300.99"
"Valor Total: \t\t\t\t\t R$ 385.96000000000004"
Finished tests in 0.007641s, 392.6188 tests/s, 392.6188 assertions/s.
3 tests, 3 assertions, 0 failures, 0 errors, 0 skips
```