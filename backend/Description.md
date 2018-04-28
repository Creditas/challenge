__O problema__
Depois de ler o que o sistema deveria fazer a primeira coisa que veio na minha cabeça foi o Strategy, pois tinhamos que processar um pagamento de formas diferentes, mas com algumas características em comum.

__Processando pagamentos__
Para fazer tudo funcionar eu criei o ProcessPayments que utilizando sua Factory você obtem uma instancia de acordo com o tipo de pagamento que será executado.

```ruby
  instance = ProcessPayments::Factory.create(payment)
```
Quando o método execute é chamado toda a mágica funciona, o pagamento que é comum entre as partes é realizado e depois cada provider cuida do que deve ser feito.

```ruby
  instance.execute
```

__Envio de notificações__
O envio de notificação também tem comportamentos diferentes por tipo de pagamento, certo? Então criei o TemplabeBuilder também cria os templates de envio de acordo com o pagamento.

```ruby
  instance = Notifications::TemplateBuilder::Factory(payment)
```

Para realizar os envios criei o Sender que também é instanciado via Factory que hoje só tem o provider de E-mail, mas nada impede de criarmos um com envio da mensagem via push.

```ruby
  instance = Notifications::Factory(:email)
  instance.send('user@test', 'Subject', template)
```


__Helpers__
Deixei a criação do Shipping Label e Voucher nos Helpers deixando assim as funções acessíveis para executar quando e como quiser.
Fiz isso porque acho que essas duas funcionalidades podem ser executadas em outros escopos.

__Testes__
Criei alguns testes para validar a ideia e provar que tudo está funcionando.
Utilizei o rspec para cria-los e para rodar:

```ruby
  bundle update
  rspec
```
