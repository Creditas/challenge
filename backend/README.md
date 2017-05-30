## Desafio para Backend Software Engineer

Foram adicionadas as seguintes classes:
  - Shipment
  - Label
  - Email
  - GiftCard
  - TestClass (com propósito de refatorar as saídas teste somente)
  
Foram editadas as seguintes classes:
  - Order (método no_tax? adicionado)
  - Customer
  - Membership
  
A ideia foi isolar as classes Label, Membership e Giftcard para que as mesmas fossem criadas somente pela classe Shipmente. E, da mesma forma, a classe Email, para que fosse criada somente quando fosse necessário mandar um e-mail.

Quatro testes foram criados, um para cada situação descrita no problema.

A classe Shipment finaliza a ordem de compra, verificando qual o tipo de produto e dando o devido tratamento para o mesmo. Essa classe poderia ser otimizada, delegando a finalização da order para a classe Order. 
