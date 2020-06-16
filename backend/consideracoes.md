Primeiro passo foi separar o `bootstrap.rb`, cada classe em seu arquivo. 

Segundo foi criado um arquivo de inicialização para evitar a repetição de require em várias páginas.

inicialização para evitar a repetição de require em várias páginas. 

**Com esta nova organização comecei a implementação da Entrega de Produtos.**

Após um pedido ser pago ele é fechado. Foi adicionado no `Order#close` a chamada para a classe `ShippingOrderWorker`, a ideia é a partir deste ponto fosse um processo em background.

A Classe `ShippingOrderWorker` é uma classe especialista em percorrer todos os itens do pedido e despacha-los, nenhuma responsabilidade além desta.
Esta classe efetua a chamada do metodo dispatch da classe `Shipping::ShippingItem`. 

`Shipping::ShippingItem` decide de acordo com o produto que lhe foi dado, qual a melhor maneira de despacha-lo e assim efetuar a chamada da classe especialista em efetuar a entrega daquele tipo de produto.

`ShippingBook`, `ShippingDigital`, `ShippingItem`, `ShippingMembership`, `ShippingPhysical` são as classes especialistas em efetuar entrega para cada tipo de produto.

`ShippingBase` serve apenas para firmar um acordo com as classes filhas da implementação do metodo dispatch_now.

* Para despachar um pedido inteiro, basta efetuar.
 `Workers::ShippingOrderWorker.perform(@order) `

* Para despachar um item especifico, basta efetuar.
  `Shipping::ShippingItem.new(@item).dispatch`

Caso um novo produto/metodo de entrega seja adicionado basta criar uma nova classe herdando de `ShippingBase`, efeutar a implementação do metodo `dispatch_now`, e após adicionar o tipo do produto e a classe especialista no `ShippingItem#shipping_method_for`

---

`Printer` e `Notifier` foram criados apenas simular a chamada de tais metodos e conseguir realizar o spec destas chamadas.

---
## TODO

* Adicionar sistema de verificação para não despachar mais de uma vez o mesmo item.
   * Ex: Um pedido de 1000 itens, ao despachar o item 998 há alguma problema de conexão com o BD, ao reprocessar o despacho do pedido, os itens anteriores irão gerar duplicidade no envio

* Refatorar `ShippingItem` permitindo aplicação do _open/closed principle_ para evitar a criação de possiveis bugs ao adicionar um novo tipo de produto.

* `Workers::ShippingOrderWorker` validar se o pedido está realmente pago e pronto para envio.

---

### Testes

```
Shipping::ShippingBook
  generate correct shipping label book item

Shipping::ShippingDigital
  send new product available to the customer
  send voucher to the customer

Shipping::ShippingItem
  dispatch correct physical item
  dispatch correct book item
  dispatch correct digital item
  dispatch correct membership item

Shipping::ShippingMembership
  active the membership
  send welcome mailer to the customer

Shipping::ShippingPhysical
  generate correct shipping label book item

Workers::ShippingOrderWorker
  dispatch the items
```






