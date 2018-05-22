Solução implementada para o Desafio para Backend Software Engineer da empresa Creditas

Inicialmente foi efetuado uma restruturação do arquivo bootstrap, todas as classes com seus respectivos metodos foras colocados em arquivos separados.

Para a solução solicitada sobre os metodos de pagamento:

Foram criadas classes para os tipos de produtos (physical, membership, book e digital).
Foram criadas classes para os tipos de pagamentos.
Foi utilizado o conceito de herança onde todas as subclasses de pagamento (PaymentBook, PaymentDigital, PaymentMembership e PaymentPhysical) herdam os métodos da superclasse Payment
Alguns métodos da superclasses foram sobrescrevidos pelas subclasses


