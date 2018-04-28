__O problema__
Depois de ler o que o sistema deveria fazer a primeira coisa que veio na minha cabeça foi o Strategy, pois tinhamos que processar um pagamento de formas diferentes, mas com algumas características em comum.

__Processando pagamentos__
Para fazer tudo funcionar eu criei o ProcessPayments que utilizando sua Factory você obtem uma instancia de acordo com o tipo de pagamento que será executado.
Quando o método execute é chamado toda a mágica funciona, o pagamento que é comum entre as partes realizado e depois cada classe cuida do que deve ser feito.

__Envio de notificações__
O envio de notificação também tem comportamentos diferentes por tipo de pagamento, certo? Então criei o TemplabeBuilder também cria os templates de envio de acordo com o pagamento e para realizar os envios criei o Sender que também é instanciado via Factory que hoje só tem e-mail, mas dessa forma podemos crescer.

__Helpers__
Deixei a criação do Shipping Label e Voucher nos Helpers deixando assim as funções acessíveis para executar quando e como quiser.
Fiz isso porque acho que essas duas funcionalidades podem ser executadas em outros escopos.

__Testes__
Criei alguns testes para validar a ideia e provar que tudo está funcionando.
Para cria-los utilizei o rspec, ou seja, criei um Gemfile e é necessário rodar um "bundle update" antes de executar "rspec"
