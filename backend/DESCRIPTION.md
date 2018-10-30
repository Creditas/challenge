# Desafio Creditas - Backend

## Instalação

1. Instalar dependências:

```sh
bundle install
```

2. Executar os testes:

```sh
ruby run_tests.rb
```

3. Executar arquivo de exemplo:

```sh
ruby bootstrap.rb
```

## Considerações

Iniciei o processo do desafio extraindo cada uma das classes do arquivo `bootstrap.rb` para dentro do diretório `src/`. Isso foi feito tanto por questões de organização visual quanto por necessidade de se manter cada arquivo/classe com sua responsabilidade única e bem-definida.

Feito isso criei o diretório `tests/` para abrigar os testes unitários. Decidi iniciar o trabalho cobrindo as classes já existentes com testes a fim de garantir segurança em qualquer alteração posterior.

Quanto à solução de desafio - que visava implementar uma maneira de relacionar tipos de produtos com tipos de envio diferentes - optei por utilizar o padrão `Factory`. A Classe `ShippingFactory` é responsável por fazer o bind entre tipos de produtos e classes de Shipping/Envio. Dessa maneira, caso alguma regra precise ser adicionada, basta adicionar mais um relacionamento no hash `shipping_method_mapping`. Assim diminuímos a complexidade ciclomática da solução, eliminando if/elses e switch cases e evitamos ter que alterar lógica na situação de um novo método de envio, bastando apenas mais um apontamento no hash. Também conseguimos manter a responsabilidade sobre o envio nas próprias classes de Shipping e não acoplá-las ao Produto, que não precisa saber a respeito desses detalhes de implementação.

Como o envio de bens físicos é bastante similar, utilizei a herança para compartilhar métodos em comum. Portanto `BookShipping` deriva de `PhysicalShipping`. Para o envio de bens digitais, a funcionalidade de enviar e-mail que é compartilhada entre as classes `DigitalShipping` e `MembershipShipping` foi extraída para um módulo/trait `Mailable`. E é na classe `Mailable` que deixo indicado aonde ocorreria o envio do e-mail (linha 4).

```ruby
module Mailable
  def send_email_notification
    mail = mail_message
    MailTransport.send(mail) # <~ Sends an e-mail
  end
end
```