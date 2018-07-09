##Explicando minha solução

1. Primeiro, separei todas as classes que estavam misturadas dentro do arquivo _bootstrap.rb_, e os coloquei na pasta _lib/models_, pois são códigos que não tem relação direta com um possível domínio (levando em conta um projeto real em rails).
2. Sempre tento seguir ao máximo os _style-guides_ de uma linguagem, não é diferente com Ruby. Então, nomeclatura, nomes de arquivos e separação de classes estão de acordo.
3. Criei inicialmente a uma classe de testes _desafio_backend_test_, que é um teste de unidade simples que testa todas as funcionalidades principais e por ser criado inicialmente (TDD), ele da uma noção legal do que deve ser feito.
4. Criei a classe voucher, que será responsável por armazenar os vouchers relacionados ao usuário
5. Tanto _voucher_ quanto _membership_ possuem um atributo que referencia ao email do usuário e um relacionado ao seu funcionamento.
6. Modifiquei a classe _customer_, para ter os dados de name e email, que são essenciais para um cliente, e a identificação da sua assinatura e vouchers.
7. Criei uma pasta de _lib/shipping_, que contem todo o código para "entregar" os produtos
8. A classe _SeparateService_ faz a separação dos tipos de produtos e as formas que serão entregues.
9. A classe _deliver_ é apenas herdada por outras, mas contém os atributos essenciais para todos os tipos de produtos, tanto os que estão presentes agora no sistema, como os futuros.
10. Existem dois módulos: _shippable_ e _notificable_ que podem ser incluídos em qualquer uma das classes filhas de _deliver_, dando muito mais flexibilidade a aplicação.
11. As classes: _book_product_deliver_, _physical_product_deliver_, _membership_product_deliver_ e _digital_product_deliver_ são responsáveis por entregar cada um dos diferentes produtos, e implementam os módulos que satisfazem seu comportamento.
