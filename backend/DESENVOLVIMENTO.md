## Desenvolvimento da Solução

__Dependências__

Para o desenvolvimento foi utilizado apenas o *RSpec*, instalado da seguinte forma:
`gem install rspec`

__Testes__

O desenvolvimento da solução foi orientada pelos testes, a fim de certificar a conformidade da implementação com os requisitos solicitados.

__Separação de Comportamentos - Strategy__

A fim de isolar particularidades da regra para cada tipo de produto e facilitar futuras implemnetações de novos tipos, a solução proposta foi utilizar o pattern *Strategy*. Dessa forma, independente do tipo de produto contido no pedido, a chamada _SHIPPING_STRATEGIES[:type].shipping(order)_ executaria o comportamento específico de cada Strategy.


__Módulos__

Como alguns Strategies possuíam similaridades, como o disparo de e-mails e shipping label, e, entendendo que isso poderia se repetir em novos Strategies, foram criados *Módulos* - no caso _Mailer_ e _Labler_ - para fornecer métodos que possam ser compartilhados, tanto pelos ShippingStrategies como por outra classe.

__Associações__

Também foram implementadas associações, no caso de _Voucher_ e _Membership_, onde as mesmas foram associadas a Costumer, trazendo coesão ao modelo de dados apresentado.

__Alteração em Order__

Por se tratar do momento final do ciclo da aplicação, a execução de _shipping(self)_ foi adicionada ao método _Order.close()_.

__Execução do Teste__

Para a execução do teste, no terminal, deve se estar na pasta _backend_  e executar o seguinte comando:
`rspec spec`

__Outras considerações__

Como na regra não está especificado que um mesmo pedido possa conter diferentes tipos de produto e, presumindo que se trate de uma integração de clientes, cujo segmento seja específico, os pedidos estão sendo tratados conforme o tipo do primeiro item dos mesmos.

Porém, caso não seja essa a regra, um método que itera pelos items do pedido excuta o comportamento desejado (vide código comentado em _bootstrao.rb_).
