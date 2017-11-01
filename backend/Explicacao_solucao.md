- bootstrap.rb
Neste arquivo ficaram os testes realizado na aplicação, junto ao require File.expand_path para separar a arquitetura, assim pude chamar apenas um arquivo o "compra_online.rb" para incluir as demais classes no projeto.

- compra_online.rb
Classe responsável por apenas chamar todas as classes existente na aplicação. Desta forma posso adicionar todas as classes e chamar apenas uma classe no momento da execução do software.

- customer.rb
Dentro da classe customer fiz uma modificação para não precisar utilizar a classe de assinatura neste momento (membership) pois como só seria ativação (true ou false) não faz muito sentindo vincular uma classe a isso, muito embora em um momento futuro em alguma implementação maior na assinatura seria necessário uma classe.
Outra modificação realizada foi a inserção do address para o customer, imaginei como um app do mercado livre onde o usuário possui o endereço de entrega. Mas poderia existir uma outra implementação para inserir o address na entrega do pedido criando duas possibilidades para o usuário. Como esta aplicação é simples, para não precisar preencher diversas vezes o endereço escolhi inserir no customer.
Escolhi deixar o attr_accessor para assinatura pois será um atributo que terá um set em tempo de execução de acordo com a condição.

- email.rb
Optei por criar uma classe de email que fique responsável pelo envio de email, possuindo os respectivos atributos: email, assunto, texto e arquivo que será enviado, entretanto, existe uma outra forma caso fosse um sistema de envio mais elaborado, podendo criar uma classe de emailservice que ficaria responsável apenas pelas formas de envio, podendo o email ser apenas para adicionar os atributos.

- order.rb
Na classe order retirei o endereço e adicionei o metodo de product que retorna o produção presente dentro do map e outro metodo que retorna o produto de acordo com o seu tipo.

- payment.rb
A classe de pagamento possui diversos metodos entretanto, fiz o máximo para que ficasse separado as responsabilidades de cada pagamento.
Como o sistema possui algumas regras para o pagamento decidi criar mais 4 classes de pagamento que possuem suas respectivas regras e responsabilidades.
A classe de pagamento será a responsável apenas por decidir a forma que o produto será pago, direcionando o pagamento de acordo com o tipo do produto.

- payment_book.rb
Dentro da classe de pagamento de livro ficou o pagamento chamando um shipping label com as informações da compra.

- payment_digital.rb
O pagamento digital possui algumas regras são elas: enviar um email com as informações do produto pelo assunto e após isso criar para o usuário um voucher de desconto de 10 reais.

- payment_physical.rb
O pagamento físico possui a geração de um shipping label ao realizar o pagamento.

- payment_signature.rb
O pagamento de assinatura possui as regras de ativar a assinatura no momento do pagamento e enviar um email para o usuário assinante.

- shipping_label.rb
A classe de shipping label possui apenas uma regra de exibir a mensagem que o item da compra é isento de impostos caso o atributo tribute seja igual a true.

- voucher.rb
A classe de voucher terá apenas o desconto como atributo podendo ser settado de acordo com a regra.
Escolhi o atributo como attr_acessor pois será setado em tempo de execução.

 